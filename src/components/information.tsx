"use client";

import { Clock, Mail, Phone } from "lucide-react";
import SectionTitle from "./section-title";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const schedule = [
  { day: "Lunes", hours: "6:00 - 00:00" },
  { day: "Martes", hours: "6:00 - 00:00" },
  { day: "Miércoles", hours: "6:00 - 00:00" },
  { day: "Jueves", hours: "6:00 - 00:00" },
  { day: "Viernes", hours: "6:00 - 00:00" },
  { day: "Sábado", hours: "7:30 - 00:00" },
  { day: "Domingo", hours: "8:00 - 00:00" },
];

function getCurrentDay() {
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return days[new Date().getDay()];
}

function getIsOpen() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 (Domingo) a 6 (Sábado)
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Ajustar índice: schedule empieza en Lunes (0), pero getDay() devuelve Domingo como 0
  const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const [openTime] = schedule[scheduleIndex].hours.split(" - ");
  const [openHour, openMin] = openTime.split(":").map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = 24 * 60; // Siempre cierra a las 00:00

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export default function Information() {
  const currentDay = getCurrentDay();
  const isOpen = getIsOpen();

  return (
    <div className="space-y-4 w-full flex flex-col items-center max-w-4xl">
      <SectionTitle title="Información" />
      <p className="text-center text-gray-600 dark:text-gray-400 text-balance">
        En Central 504, nos comprometemos a brindarte la mejor experiencia
        posible. Aquí encontrarás toda la información que necesitas para
        disfrutar de nuestros servicios al máximo.
      </p>
      <section className="w-full mt-2">
        <div className="space-y-6">
          {/* Content Grid */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {/* Teléfono */}
            <Card className="group transition-all duration-300 border-primary/30 hover:border-primary hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Teléfono
                </h3>
                <a
                  href="tel:+34942503254"
                  className="text-2xl font-light text-foreground transition-colors hover:text-primary"
                >
                  942 50 32 54
                </a>
                <p className="text-sm text-muted-foreground">
                  Reservas y consultas
                </p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="group transition-all duration-300 border-primary/30 hover:border-primary hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Correo Electrónico
                </h3>
                <a
                  href="mailto:contacto@central504.es"
                  className="text-xl font-light text-foreground transition-colors hover:text-primary md:text-2xl"
                >
                  contacto@central504.es
                </a>
                <p className="text-sm text-muted-foreground">
                  Te respondemos en menos de 24h
                </p>
              </CardContent>
            </Card>

            {/* Horario */}
            <Card className="group transition-all duration-300 border-primary/30 hover:border-primary hover:shadow-lg col-span-1 md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <Badge
                    variant={isOpen ? "default" : "destructive"}
                    className="gap-2 bg-primary-foreground/10 border-primary text-primary"
                  >
                    <span
                      className={`size-2 rounded-full ${
                        isOpen ? "bg-green-300" : "bg-red-300"
                      }`}
                    />
                    {isOpen ? "Abierto" : "Cerrado"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Horario
                </h3>
                <ul className="space-y-2">
                  {schedule.map((item) => (
                    <li
                      key={item.day}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                        currentDay === item.day
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.day}</span>
                      <span className="text-sm">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 uppercase tracking-wider"
            >
              <a href="tel:+34942503254">
                <Phone className="size-4" />
                Reservar Mesa
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
