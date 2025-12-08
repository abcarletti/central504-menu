import DailyMenuContent from "@/components/daily-menu-content";
import { fetchDailyMenu } from "@/lib/api.service";
import type { Metadata } from "next";

// Revalidar cada 15 minutos (900 segundos)
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Menú del Día - Oferta Especial",
  description:
    "Descubre nuestro menú del día en Central 504. Primeros y segundos platos con ingredientes frescos de temporada a un precio especial.",
  keywords: [
    "menú del día",
    "menú diario Central 504",
    "comida del día Madrid",
    "menú económico",
    "primeros platos",
    "segundos platos",
    "oferta diaria restaurante",
  ],
  alternates: {
    canonical: "/daily-menu",
  },
  openGraph: {
    title: "Menú del Día - Central 504 | Comida Casera Española",
    description:
      "Disfruta de nuestro menú del día con primeros y segundos platos de cocina tradicional española a precio especial.",
    url: "/daily-menu",
    type: "website",
  },
};

export default async function DailyMenuPage() {
  const menu = await fetchDailyMenu();

  return (
    <div className="mt-6" itemScope itemType="https://schema.org/Menu">
      <DailyMenuContent menu={menu} />
    </div>
  );
}
