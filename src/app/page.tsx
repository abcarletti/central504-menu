import Hero from "@/components/hero";
import Information from "@/components/information";
import Location from "@/components/location";
import Services from "@/components/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Central 504 - Tu restaurante de cocina española tradicional en Pontejos. Disfruta de desayunos, brunchs, almuerzos y cenas con platos caseros de calidad. Bocadillos, hamburguesas, raciones, ensaladas y más.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://central504.es",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <h1 className="sr-only">
        Central 504 - Restaurante de Cocina Española en Pontejos
      </h1>
      <div className="space-y-20">
        <Hero />
        <Services />
        <Information />
        <Location />
      </div>
    </>
  );
}
