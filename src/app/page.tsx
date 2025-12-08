import Hero from "@/components/hero";
import Information from "@/components/information";
import Location from "@/components/location";
import Services from "@/components/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Central 504 - Tu restaurante de cocina española tradicional en Madrid. Disfruta de desayunos, brunchs, almuerzos y cenas con platos caseros de calidad. Bocadillos, hamburguesas, raciones, ensaladas y más.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <section className="space-y-20 py-4">
      <Hero />
      <Services />
      <Information />
      <Location />
    </section>
  );
}
