import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const siteConfig = {
  name: "Central 504",
  description:
    "Restaurante de cocina española tradicional en Pontejos. Desayunos, brunchs, almuerzos y cenas con los mejores platos: bocadillos, hamburguesas, raciones, ensaladas y más. WiFi gratuito.",
  url: "https://central504.es",
  ogImage: "/portada.webp",
  keywords: [
    "restaurante español",
    "cocina española",
    "restaurante Pontejos",
    "tapas",
    "raciones",
    "bocadillos",
    "hamburguesas",
    "ensaladas",
    "desayunos",
    "brunch",
    "almuerzo",
    "cena",
    "Central 504",
    "restaurante tradicional",
    "comida casera",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Restaurante de Cocina Española`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    title: `${siteConfig.name} | Restaurante de Cocina Española en Pontejos`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1284,
        height: 480,
        alt: `${siteConfig.name} - Restaurante de Cocina Española`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Restaurante de Cocina Española`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@central504",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Next.js detecta automáticamente icon.png en src/app/
  // También puedes añadir iconos adicionales en /public
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Añade tus códigos de verificación cuando los tengas
    // google: "tu-codigo-de-verificacion",
    // yandex: "tu-codigo-yandex",
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Schema.org JSON-LD para SEO estructurado
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Central 504",
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: "+34 942 503 254", // Actualiza con el teléfono real
  email: "contacto@central504.es", // Actualiza con el email real
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio Río, 165A", // Actualiza con la dirección real
    addressLocality: "Pontejos",
    addressRegion: "Cantabria",
    postalCode: "39618", // Actualiza con el código postal real
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4168, // Actualiza con las coordenadas reales
    longitude: -3.7038,
  },
  image: `${siteConfig.url}/portada.webp`,
  priceRange: "€€",
  servesCuisine: ["Española", "Mediterránea", "Tradicional"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:30",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "00:00",
    },
  ],
  menu: `${siteConfig.url}/carta`,
  acceptsReservations: "True",
  hasMenu: {
    "@type": "Menu",
    name: "Carta",
    url: `${siteConfig.url}/carta`,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Bocadillos",
      },
      {
        "@type": "MenuSection",
        name: "Ensaladas",
      },
      {
        "@type": "MenuSection",
        name: "Hamburguesas",
      },
      {
        "@type": "MenuSection",
        name: "Raciones",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} min-h-svh flex flex-col antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
          <Header />
          <main className="flex flex-col flex-1 max-w-4xl m-auto w-full p-4 md:px-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
