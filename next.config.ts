import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  compress: true,
  reactStrictMode: true,
  trailingSlash: false,
  generateEtags: true,
  poweredByHeader: false,
  // Solo usar output standalone en producción
  ...(process.env.NODE_ENV === "production" && { output: "standalone" }),

  // Redirects para SEO y mejores URLs
  async redirects() {
    return [
      {
        source: "/menu-del-dia",
        destination: "/menu",
        permanent: true,
      },
    ];
  },

  // Headers para mejorar SEO y seguridad
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Configuración de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["localhost", "s3.volatus.dev"], // Agrega los dominios permitidos aquí
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.volatus.dev",
      },
    ],
  },
};

export default nextConfig;
