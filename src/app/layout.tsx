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
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
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
  "@id": `${siteConfig.url}/#restaurant`,
  name: "Central 504",
  alternateName: "Central 504 Pontejos",
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: "+34 942 503 254",
  email: "contacto@central504.es",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio Río, 165A",
    addressLocality: "Pontejos",
    addressRegion: "Cantabria",
    postalCode: "39618",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4168,
    longitude: -3.7038,
  },
  image: [
    `${siteConfig.url}/portada.webp`,
    `${siteConfig.url}/logo-dark.png`,
  ],
  logo: `${siteConfig.url}/logo-dark.png`,
  priceRange: "€€",
  servesCuisine: ["Española", "Mediterránea", "Tradicional"],
  paymentAccepted: ["Cash", "Credit Card"],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "WiFi gratuito",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Terraza",
      value: true,
    },
  ],
  hasMenu: {
    "@type": "Menu",
    name: "Carta",
    url: `${siteConfig.url}/carta`,
    inLanguage: "es",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Bocadillos",
        description: "Variedad de bocadillos artesanales",
      },
      {
        "@type": "MenuSection",
        name: "Ensaladas",
        description: "Ensaladas frescas con ingredientes de temporada",
      },
      {
        "@type": "MenuSection",
        name: "Hamburguesas",
        description: "Hamburguesas caseras de primera calidad",
      },
      {
        "@type": "MenuSection",
        name: "Raciones",
        description: "Raciones y tapas de cocina tradicional",
      },
    ],
  },
  sameAs: [
    // Añadir aquí los enlaces a redes sociales cuando estén disponibles
    // "https://www.facebook.com/central504",
    // "https://www.instagram.com/central504",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://s3.volatus.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} min-h-svh flex flex-col antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Saltar al contenido principal
          </a>
          <Header />
          <main id="main-content" className="flex flex-col flex-1 max-w-4xl m-auto w-full p-4 md:px-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
