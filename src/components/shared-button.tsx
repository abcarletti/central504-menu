"use client";

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

type ShareButtonProps = {
  title: string;
  text?: string;
  url?: string;
};

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback: copia de enlace, modal propio, etc.
      alert("La opción de compartir no está soportada en este navegador.");
      return;
    }

    try {
      await navigator.share({
        title,
        text,
        url: url ?? window.location.href,
      });
    } catch (err) {
      // El usuario puede cancelar el share, no es un error grave
      console.debug("El usuario ha cancelado la acción de compartir.", err);
    }
  };

  return (
    <Button
      variant={"outline"}
      size={"sm"}
      title="Compartir"
      onClick={handleShare}
    >
      <Share2 className="size-4" /> Compartir
    </Button>
  );
}
