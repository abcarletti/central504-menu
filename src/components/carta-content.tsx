"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Category, MenuItem } from "@/lib/api.service";
import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function MenuItemCard({ item }: { item: MenuItem }) {
  const [imgError, setImgError] = useState(false);
  const showImage = item.fileUrl && !imgError;

  return (
    <article
      className="flex gap-4 bg-card rounded-lg border border-primary/20 shadow-sm hover:shadow-md transition-shadow"
      itemScope
      itemType="https://schema.org/MenuItem"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-l-lg overflow-hidden bg-muted">
        {showImage ? (
          <Image
            src={item.fileUrl as string}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
            onError={() => setImgError(true)}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 justify-between min-w-0 p-2">
        <div>
          <h3 className="font-semibold text-foreground" itemProp="name">
            {item.name}
          </h3>
          {item.description && (
            <p
              className="text-sm text-muted-foreground line-clamp-2 mt-1"
              itemProp="description"
            >
              {item.description}
            </p>
          )}
        </div>
        <p className="text-lg font-bold text-primary mt-2">
          <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span itemProp="price" content={item.price.toString()}>
              {item.price.toFixed(2)}
            </span>
            <span itemProp="priceCurrency" content="EUR">
              {" "}
              €
            </span>
          </span>
        </p>
      </div>
    </article>
  );
}

interface CartaContentProps {
  categories: Category[];
  items: MenuItem[];
}

export default function CartaContent({ categories, items }: CartaContentProps) {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const initialPositions = useRef<{ [key: string]: number }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Guardar las posiciones iniciales de cada categoría
    const saveInitialPositions = () => {
      Object.keys(categoryRefs.current).forEach((key) => {
        const element = categoryRefs.current[key];
        if (element) {
          const rect = element.getBoundingClientRect();
          initialPositions.current[key] = rect.top + window.pageYOffset - 55;
        }
      });
    };

    // Esperar un momento para que el DOM esté completamente cargado
    const timeoutId = setTimeout(saveInitialPositions, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleValueChange = (value: string) => {
    // Limpiar el timeout anterior si existe
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (value && initialPositions.current[value] !== undefined) {
      scrollTimeoutRef.current = setTimeout(() => {
        window.scrollTo({
          top: initialPositions.current[value],
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col gap-2"
      onValueChange={handleValueChange}
    >
      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) => item.category?.id === category.id
        );
        if (categoryItems.length === 0) return null;
        return (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border rounded-lg px-4 bg-card shadow-sm *:data-[slot=accordion-header]:top-13"
            ref={(el) => {
              categoryRefs.current[category.id] = el;
            }}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">
                  {category.name}
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({categoryItems.length}{" "}
                  {categoryItems.length === 1 ? "plato" : "platos"})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-2"
                itemScope
                itemType="https://schema.org/MenuSection"
              >
                <meta itemProp="name" content={category.name} />
                {categoryItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
