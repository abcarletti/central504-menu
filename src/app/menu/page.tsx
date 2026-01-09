import DailyMenuContent from "@/components/daily-menu-content";
import { fetchDailyMenu } from "@/lib/api.service";
import type { Metadata } from "next";

// Forzar renderizado dinámico (sin pre-render en build)
export const dynamic = "force-dynamic";
// Revalidar cada 15 minutos (900 segundos)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Menú del Día - Oferta Especial",
  description:
    "Descubre nuestro menú del día en Central 504. Primeros y segundos platos con ingredientes frescos de temporada a un precio especial.",
  keywords: [
    "menú del día",
    "menú diario Central 504",
    "comida del día Pontejos",
    "menú económico",
    "primeros platos",
    "segundos platos",
    "oferta diaria restaurante",
  ],
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menú del Día - Central 504 | Comida Casera Española",
    description:
      "Disfruta de nuestro menú del día con primeros y segundos platos de cocina tradicional española a precio especial.",
    url: "/menu",
    type: "website",
    images: [
      {
        url: "/portada.webp",
        width: 1284,
        height: 480,
        alt: "Menú del Día - Central 504",
      },
    ],
  },
};

export default async function DailyMenuPage() {
  const menu = await fetchDailyMenu();

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
        name: "Menú del Día",
        item: "https://central504.es/menu",
      },
    ],
  };

  if (!menu) {
    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center py-12 px-4">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Menú del día no disponible
            </h1>
            <p className="text-muted-foreground text-lg">
              Lo sentimos, actualmente no hay menú del día disponible. El menú
              está disponible únicamente de lunes a viernes laboral. Si es
              laborable y todavía no aparece vuelva a intentarlo en unos
              minutos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article itemScope itemType="https://schema.org/Menu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <DailyMenuContent menu={menu} />
    </article>
  );
}
