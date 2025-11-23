"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string }[] = [];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="relative w-full flex items-center justify-between py-4 overflow-hidden">
      {/* Logo à gauche */}
      {/* Bandeau dynamique au premier plan */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <div className="animate-marquee whitespace-nowrap px-4 py-1 text-3xl sm:text-4xl font-semibold text-black drop-shadow">
          Bienvenue chez FELR - Femmes Entrepreneures et Leaders de La Reunion
        </div>
      </div>

      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/felr_logo.png"   // car il est dans /public
          alt="Logo FELR"
          width={60}
          height={60}
          className="h-40 w-auto"
          priority
        />
        {/* Si tu veux un texte à côté du logo, tu peux le décommenter */}
        {/* <span className="text-2xl font-semibold">FELR</span> */}
      </Link>

      {/* Liens à droite */}
      <nav className="flex justify-end items-center gap-x-8">
        {LINKS.map(({ href, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`text-4xl pb-1 border-b-2 --font-mono ${
                isActive
                  ? "border-amber-400"
                  : "border-transparent hover:border-amber-400/70"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
