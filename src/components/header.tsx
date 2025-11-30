"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Notre Histoire" },
  { href: "/collectif-felr", label: "Collectif FELR" },
  { href: "/osez-felr", label: "Osez FELR" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="relative z-50 w-full flex items-center justify-between py-4 px-4 md:px-8 bg-white/90 backdrop-blur"
    >
      {/* Logo à gauche */}
      <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
        <Image
          src="/felr_logo.png" // car il est dans /public
          alt="Logo FELR"
          width={60}
          height={60}
          className="h-40 w-auto"
          priority
        />
      </Link>

      {/* Liens à droite - DESKTOP */}
      <nav className="hidden md:flex justify-end items-center gap-x-8">
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

      {/* Bouton menu HAMBURGER - MOBILE */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm px-3 py-3"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
      >
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span
            className={`h-[2px] w-5 rounded bg-slate-800 transition-transform ${
              menuOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 rounded bg-slate-800 transition-opacity ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-5 rounded bg-slate-800 transition-transform ${
              menuOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* MENU MOBILE DÉROULANT */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 px-4 md:hidden z-40">
          <nav className="rounded-2xl border border-slate-200 bg-white/95 shadow-lg flex flex-col py-2">
            {LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={`px-4 py-2 text-lg --font-mono ${
                    isActive
                      ? "bg-amber-100 text-slate-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
