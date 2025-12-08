"use client";

import { MapPinned } from "lucide-react";
import dynamic from "next/dynamic";
import SectionTitle from "./section-title";
import { Button } from "./ui/button";

const LocationMap = dynamic(() => import("./location-map"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "400px", width: "100%", borderRadius: "1rem" }}
      className="bg-muted animate-pulse flex items-center justify-center"
      role="img"
      aria-label="Cargando mapa de ubicación"
    >
      <span className="text-muted-foreground">Cargando mapa...</span>
    </div>
  ),
});

export default function Location() {
  return (
    <section
      className="space-y-4"
      aria-labelledby="location-title"
      itemScope
      itemType="https://schema.org/Place"
    >
      <SectionTitle title="Localización" id="location-title" />
      <p className="text-center text-gray-600 dark:text-gray-400 text-balance">
        Encuéntranos fácilmente en nuestra ubicación céntrica. Utiliza el mapa
        interactivo a continuación para obtener indicaciones precisas y
        planificar tu visita.
      </p>
      <div
        itemProp="address"
        itemScope
        itemType="https://schema.org/PostalAddress"
      >
        <meta itemProp="addressLocality" content="Madrid" />
        <meta itemProp="addressCountry" content="ES" />
      </div>
      <LocationMap />
      <div className="text-center">
        <Button
          asChild
          size="lg"
          className="rounded-full px-8 py-6 uppercase tracking-wider"
        >
          <a
            href="https://maps.google.com/?q=Central+504"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Google Maps para ver cómo llegar a Central 504"
          >
            <MapPinned className="size-4" aria-hidden="true" />
            Cómo llegar
          </a>
        </Button>
      </div>
    </section>
  );
}
