import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
  CookingPot,
  HouseWifi,
  LocateFixed,
  type LucideIcon,
  PartyPopper,
  SmartphoneCharging,
  SquareParking,
  Sun,
  ThermometerSnowflake,
  Umbrella,
} from "lucide-react";
import SectionTitle from "./section-title";

const SERVICES = [
  {
    id: "aire-acondicionado",
    title: "Aire acondicionado",
    icon: ThermometerSnowflake,
  },
  {
    id: "terraza-cubierta",
    title: "Terraza cubierta",
    icon: Umbrella,
  },
  {
    id: "terraza-descubierta",
    title: "Terraza descubierta",
    icon: Sun,
  },
  {
    id: "parking-privado",
    title: "Parking privado",
    icon: SquareParking,
  },
  {
    id: "eventos-privados",
    title: "Eventos privados",
    icon: PartyPopper,
  },
  {
    id: "comida-llevar",
    title: "Comida para llevar",
    icon: CookingPot,
  },
  {
    id: "wifi-gratuito",
    title: "Wifi gratuito",
    icon: HouseWifi,
  },
  {
    id: "dianas",
    title: "Dianas",
    icon: LocateFixed,
  },
  {
    id: "cargador-moviles",
    title: "Cargador de móviles",
    icon: SmartphoneCharging,
  },
];

const ServiceComponent = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 border-2 border-primary rounded-lg gap-2 min-w-52 aspect-auto">
      <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
      <p className="text-lg font-medium text-center">{title}</p>
    </div>
  );
};

export default function Services() {
  return (
    <section className="space-y-4" aria-labelledby="services-title">
      <SectionTitle title="Servicios" id="services-title" />
      <p className="text-center text-gray-600 dark:text-gray-400 text-balance">
        En Central 504, nos esforzamos por ofrecerte una experiencia
        excepcional. Descubre nuestros servicios diseñados para tu comodidad y
        disfrute.
      </p>
      <div className="flex space-x-4 mt-6">
        <InfiniteSlider gap={24} speed={70}>
          {SERVICES.map((service) => (
            <ServiceComponent
              key={service.id}
              title={service.title}
              icon={service.icon}
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
