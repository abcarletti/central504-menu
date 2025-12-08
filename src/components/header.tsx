"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./theme-toggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full px-4 py-2 border-b sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 z-20 h-14">
      <section className="flex items-center justify-between max-w-4xl m-auto">
        <Link href="/" aria-label="Central 504 - Ir al inicio">
          <Image
            src="/logo-white.png"
            alt="Central 504 - Restaurante de cocina española"
            width={48}
            height={48}
            className="hidden dark:block"
            priority
          />
          <Image
            src="/logo-dark.png"
            alt="Central 504 - Restaurante de cocina española"
            width={48}
            height={48}
            className="block dark:hidden"
            priority
          />
        </Link>
        <nav className="flex gap-6" aria-label="Navegación principal">
          <Link
            className={`hover:opacity-80 ${
              pathname === "/"
                ? " font-bold bg-linear-to-t from-primary to-white bg-clip-text text-transparent"
                : ""
            }`}
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Inicio
          </Link>
          <Link
            className={`hover:opacity-80${
              pathname === "/carta"
                ? " font-bold bg-linear-to-t from-primary to-white bg-clip-text text-transparent"
                : ""
            }`}
            href="/carta"
            aria-current={pathname === "/carta" ? "page" : undefined}
          >
            Carta
          </Link>
          <Link
            className={`hover:opacity-80${
              pathname === "/menu"
                ? " font-bold bg-linear-to-t from-primary to-white bg-clip-text text-transparent"
                : ""
            }`}
            href="/menu"
            aria-current={pathname === "/menu" ? "page" : undefined}
          >
            Menú del día
          </Link>
        </nav>
        <ModeToggle />
      </section>
    </header>
  );
}
