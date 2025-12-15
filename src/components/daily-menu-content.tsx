"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DailyMenu } from "@/lib/api.service";
import { CakeSlice, Calendar, CookingPot, Utensils } from "lucide-react";
import { ShareButton } from "./shared-button";

interface DailyMenuContentProps {
  menu: DailyMenu;
}

export default function DailyMenuContent({ menu }: DailyMenuContentProps) {
  const firstCourses = menu.items.filter((item) => item.section === "FIRST");
  const secondCourses = menu.items.filter((item) => item.section === "SECOND");
  const desserts = menu.items.filter((item) => item.section === "DESSERT");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className="border border-primary shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="size-5" />
            <p className="text-sm">{formatDate(menu.date)}</p>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            Menú del día
          </CardTitle>
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="text-xl md:text-2xl font-bold px-6 py-2"
            >
              {menu.price.toFixed(2)} €
            </Badge>
          </div>
          <ShareButton
            title="Central504 - Menú del día"
            text={`Mira lo bien que está el menú del día de la Central 504 para hoy por: ${menu.price.toFixed(
              2
            )} €`}
          />
        </CardHeader>
      </Card>

      {/* Menu Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Courses */}
        {firstCourses.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-shadow pt-0">
            <CardHeader className="bg-muted/50 h-12 items-center grid-rows-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CookingPot className="size-5 text-primary" />
                Primeros Platos
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ul className="space-y-4">
                {firstCourses.map((item, index) => (
                  <li key={item.id}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0 mt-0.5">
                        <CookingPot className="size-3" />
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {item.name}
                      </p>
                    </div>
                    {index < firstCourses.length - 1 && (
                      <Separator className="mt-4 bg-primary/20" />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Second Courses */}
        {secondCourses.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-shadow pt-0">
            <CardHeader className="bg-muted/50 h-12 items-center grid-rows-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Utensils className="size-5 text-primary" />
                Segundos Platos
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ul className="space-y-4">
                {secondCourses.map((item, index) => (
                  <li key={item.id}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0 mt-0.5">
                        <Utensils className="size-3" />
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {item.name}
                      </p>
                    </div>
                    {index < secondCourses.length - 1 && (
                      <Separator className="mt-4 bg-primary/20" />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Desserts */}
        {desserts.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-shadow md:col-span-2 pt-0">
            <CardHeader className="bg-muted/50 h-12 items-center grid-rows-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CakeSlice className="size-5 text-primary" />
                Postres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {desserts.map((item, index) => (
                  <li key={item.id}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0 mt-0.5">
                        <CakeSlice className="size-3" />
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {item.name}
                      </p>
                    </div>
                    {index < desserts.length - 1 && (
                      <Separator className="mt-4 bg-primary/20" />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Note */}
      <Card className="border-dashed">
        <CardContent className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            <span className="font-bold">BEBIDAS:</span> ½ Vino tinto de la casa
            | Agua | Gaseosa
          </p>
          <p>Incluye pan, postre y café</p>
          <p>
            El menú se servirá hasta fin de existencias y en horario de 13:00 a
            16:00
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
