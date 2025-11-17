"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIAS_2024 } from "./medias2024"; // adapte le chemin si ta page n'est pas dans le même dossier

import { MEDIAS_2025 } from "./medias2025"; // adapte le chemin si ta page n'est pas dans le même dossier

/* =========================================================
   TYPES
   ========================================================= */
export type Media = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  titre?: string;
  texte?: string;
  tags?: string[];
};

type YearData = {
  hero: { titre: string; accroche: string };
  chiffres: { label: string; valeur: number }[]; // uniquement lié aux ÉVÈNEMENTS
  momentsForts: Media[]; // carrousel
  galerie: Media[]; // masonry + filtres
};

/* =========================================================
   DONNÉES
   ========================================================= */
const DATA: Record<"2025" | "2024" | "2023", YearData> = {
  "2025": {
    hero: {
      titre: "Notre Histoire en 2025",
      accroche:
        "Atelier, Cérémonies, conférences, rencontres publiques, soirées de prestige : Une association rythmée par des évènements marquants.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 179 },
      { label: "Membres", valeur: 106 },
      { label: "Soutien et Partenaires", valeur: 21 },
    ],

        // Même médias pour "Au coeur de nos actions" et "Galerie"
    momentsForts: MEDIAS_2025,
    galerie: MEDIAS_2025,
  },

  "2024": {
    hero: {
      titre: "Notre histoire en 2024",
      accroche:
        "Premières éditions et premières scènes : les fondations d’un rendez-vous qui compte.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 192 },
      { label: "Membres", valeur: 95 },
      { label: "Soutien et partenaire", valeur: 28 },
    ],

    // Même médias pour "Au coeur de nos actions" et "Galerie"
    momentsForts: MEDIAS_2024,
    galerie: MEDIAS_2024,
  },

  "2023": {
    hero: {
      titre: "Notre histoire en 2023",
      accroche:
        "Les premières pierres : rencontres fondatrices et formats testés grandeur nature.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 15 },
      { label: "Membres", valeur: 17 },
      { label: "Soutien et partenaire", valeur: 5 },
    ],

    // Même médias pour "Au coeur de nos actions" et "Galerie"
    momentsForts: MEDIAS_2024,
    galerie: MEDIAS_2024,
  },
};

/* =========================================================
   OUTILS
   ========================================================= */
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

function useCounter(n: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.floor(n * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n, duration]);
  return v;
}

/* =========================================================
   PAGE
   ========================================================= */
export default function PageEvenement() {
  const [year, setYear] = useState<"2025" | "2024" | "2023">("2025");
  const data = DATA[year];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-8 text-center">
        <motion.h1
          key={`h1-${year}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-serif tracking-wide"
        >
          {data.hero.titre}
        </motion.h1>
        <p className="mt-3 text-lg text-gray-700">{data.hero.accroche}</p>

        {/* Switch Année */}
        <div className="mt-8 inline-flex rounded-full border bg-white overflow-hidden shadow">
          {(["2025", "2024", "2023"] as const).map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-6 py-2 text-base transition ${
                year === y ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-pressed={year === y}
            >
              {y}
            </button>
          ))}
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <SectionChiffres data={data.chiffres} />

      {/* MOMENTS FORTS */}
      <SectionMomentsForts items={data.momentsForts} />

      {/* GALERIE */}
      <SectionGalerie items={data.galerie} />
    </main>
  );
}

/* =========================================================
   SECTIONS
   ========================================================= */
function SectionChiffres({ data }: { data: { label: string; valeur: number }[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {data.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border bg-white p-6 text-center shadow-sm"
          >
            <div className="text-4xl md:text-5xl font-semibold">{useCounter(c.valeur)}</div>
            <div className="mt-2 text-gray-600">{c.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionMomentsForts({ items }: { items: Media[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Au coeur de nos actions</h2>
      <div className="relative">
        <div ref={ref} className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
          {items.map((m) => (
            <article
              key={m.id}
              className="snap-start shrink-0 w-[85%] md:w-[48%] lg:w-[32%] rounded-2xl overflow-hidden border bg-white shadow-sm"
            >
              <MediaPreview m={m} ratio="aspect-[16/9]" hoverZoom />
              <div className="p-4">
                {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                {m.texte && <p className="text-sm text-gray-600 mt-1">{m.texte}</p>}
                {m.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-1">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* flèches */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Suivant"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionGalerie({ items }: { items: Media[] }) {
  const [lightbox, setLightbox] = useState<Media | null>(null);
  const [type, setType] = useState<"all" | "image" | "video">("all");

  const tags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((i) => i.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const [tag, setTag] = useState<string | null>(null);

  const filtered = items.filter((i) => {
    const okType = type === "all" ? true : i.type === type;
    const okTag = tag ? i.tags?.includes(tag) : true;
    return okType && okTag;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl md:text-4xl font-serif">Galerie</h2>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "image", "video"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as any)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                type === t ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              {t === "all" ? "Tous" : t === "image" ? "Photos" : "Vidéos"}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              tag === null ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            Tous les tags
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                tag === t ? "bg-black text-white" : "bg-white hover:bg-gray-50"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {filtered.map((m) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="break-inside-avoid rounded-2xl overflow-hidden border bg-white shadow-sm group"
          >
            <button
              onClick={() => setLightbox(m)}
              className="w-full text-left"
              aria-label={m.alt ?? m.titre ?? "ouvrir le média"}
            >
              <MediaPreview m={m} hoverZoom />
              {(m.titre || m.texte) && (
                <div className="p-4">
                  {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                  {m.texte && <p className="text-sm text-gray-600 mt-1">{m.texte}</p>}
                  {m.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full bg-gray-100 px-2 py-1">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </button>
          </motion.article>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="w-full max-w-5xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-black">
                <MediaView m={lightbox} />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
                >
                  Fermer
                </button>
              </div>

              {(lightbox.titre || lightbox.texte) && (
                <div className="mt-4 rounded-xl bg-white p-5 shadow">
                  {lightbox.titre && (
                    <h3 className="text-xl font-semibold mb-1">{lightbox.titre}</h3>
                  )}
                  {lightbox.texte && (
                    <p className="text-gray-700 leading-relaxed">{lightbox.texte}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   RENDUS MEDIA
   ========================================================= */
function MediaPreview({
  m,
  ratio = "aspect-[4/3]",
  hoverZoom = false,
}: {
  m: Media;
  ratio?: string;
  hoverZoom?: boolean;
}) {
  return (
    <div className={`relative ${ratio} bg-gray-100`}>
      {m.type === "image" ? (
        <Image
          src={m.src}
          alt={m.alt ?? m.titre ?? "image"}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-cover ${
            hoverZoom ? "transition-transform duration-300 group-hover:scale-[1.02]" : ""
          }`}
        />
      ) : (
        <video
          src={m.src}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            v.pause();
            v.currentTime = 0;
          }}
        />
      )}
    </div>
  );
}

function MediaView({ m }: { m: Media }) {
  if (m.type === "image") {
    return (
      <Image
        src={m.src}
        alt={m.alt ?? m.titre ?? "image"}
        width={2000}
        height={1500}
        className="w-full h-auto object-contain bg-black"
        priority
      />
    );
  }
  return (
    <video src={m.src} controls autoPlay className="w-full h-auto object-contain bg-black" />
  );
}
