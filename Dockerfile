# Dockerfile para Next.js con standalone output
#
# Variables de entorno:
# - No hay variables NEXT_PUBLIC_* en el código, así que no se necesita ningún
#   build-arg: nada de configuración se incrusta en el bundle durante la build.
# - API_BASE_URL se lee en tiempo de ejecución (en el servidor, en /carta y
#   /menu, que son rutas dinámicas). Se configura como variable de entorno del
#   contenedor, no como build-arg.
FROM node:24.22.2-alpine3.24 AS base

# Versión fijada del gestor de paquetes (coincide con "packageManager" en package.json)
ARG PNPM_VERSION=10.34.9
RUN npm install -g pnpm@${PNPM_VERSION} && pnpm --version

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Reconstruir el código fuente solo cuando sea necesario
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivar telemetría durante la build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build de la aplicación
RUN pnpm run build

# Imagen de producción, copiar todos los archivos y ejecutar Next.js
FROM node:24.22.2-alpine3.24 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Copiar los archivos standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
