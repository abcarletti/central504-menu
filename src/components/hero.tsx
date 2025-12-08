import Image from "next/image";

export default function Hero() {
  return (
    <figure className="w-full rounded-ss-4xl rounded-br-4xl object-cover overflow-hidden drop-shadow-xl drop-shadow-primary dark:drop-shadow-accent dark:drop-shadow-lg">
      <Image
        src="/portada.webp"
        alt="Central 504 - Restaurante de cocina española tradicional en Pontejos. Fachada del establecimiento con ambiente acogedor."
        width={1284}
        height={480}
        style={{ objectFit: "contain" }}
        className="contrast-150"
        priority
        fetchPriority="high"
      />
    </figure>
  );
}
