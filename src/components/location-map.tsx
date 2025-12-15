"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const POSITION: [number, number] = [43.40826621135333, -3.7994235499696787];

export default function LocationMap() {
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Importar Leaflet solo en el cliente
    import("leaflet").then((L) => {
      const icon = L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60],
        popupAnchor: [0, -60],
      });
      setCustomIcon(icon);
    });
  }, []);

  if (!customIcon) {
    return (
      <div
        style={{ height: "400px", width: "100%", borderRadius: "1rem" }}
        className="bg-muted animate-pulse flex items-center justify-center"
      >
        <span className="text-muted-foreground">Cargando mapa...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={POSITION}
      zoom={18}
      scrollWheelZoom={false}
      boxZoom={false}
      touchZoom={false}
      keyboard={false}
      attributionControl={false}
      doubleClickZoom={false}
      closePopupOnClick={true}
      zoomControl={false}
      style={{ height: "400px", width: "100%", borderRadius: "1rem" }}
      dragging={false}
      aria-label="Mapa de ubicación de Central 504 en Pontejos, Cantabria"
      role="img"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <Marker
        position={POSITION}
        icon={customIcon}
        aria-label="Ubicación de Central 504"
      >
        <Popup>
          <strong>Central 504</strong>
          <br />
          Ven a visitarnos para pasar un rato agradable bebiendo, comiendo o
          disfrutando de los mejores eventos deportivos.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
