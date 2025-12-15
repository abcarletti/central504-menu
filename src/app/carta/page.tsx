import CartaContent from "@/components/carta-content";
import { fetchMenuData } from "@/lib/api.service";
import type { Metadata } from "next";

// Forzar renderizado dinámico (sin pre-render en build)
export const dynamic = "force-dynamic";
// Revalidar cada 15 minutos (900 segundos)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Carta - Menú Completo",
  description:
    "Descubre la carta completa de Central 504. Bocadillos, ensaladas, hamburguesas, raciones, sartenes, tortillas y vinos. Cocina española tradicional con ingredientes de calidad.",
  keywords: [
    "carta restaurante",
    "menú Central 504",
    "bocadillos Pontejos",
    "hamburguesas artesanales",
    "raciones tapas",
    "ensaladas frescas",
    "tortilla española",
    "vinos españoles",
    "precios restaurante",
  ],
  alternates: {
    canonical: "/carta",
  },
  openGraph: {
    title: "Carta - Central 504 | Menú de Cocina Española",
    description:
      "Explora nuestra carta con bocadillos, ensaladas, hamburguesas, raciones y más. Platos tradicionales españoles a precios accesibles.",
    url: "/carta",
    type: "website",
    images: [
      {
        url: "/portada.webp",
        width: 1284,
        height: 480,
        alt: "Carta - Central 504",
      },
    ],
  },
};

export default async function CartaPage() {
  const { items, categories } = await fetchMenuData();

  // Breadcrumb JSON-LD para SEO
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://central504.es",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Carta",
        item: "https://central504.es/carta",
      },
    ],
  };

  return (
    <article itemScope itemType="https://schema.org/Menu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Nuestra Carta
        </h1>
        <p className="text-muted-foreground">
          Descubre todos nuestros deliciosos platos de cocina española
          tradicional
        </p>
      </header>

      <CartaContent categories={categories} items={items} />
    </article>
  );
}
