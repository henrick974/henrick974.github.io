"use client";



import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIAS_2024 } from "./medias2024"; // adapte le chemin si ta page n'est pas dans le même dossier

import { MEDIAS_2025 } from "./medias2025"; // adapte le chemin si ta page n'est pas dans le même dossier

import { MEDIAS_2025_2 } from "./medias2025_2"; 

const splitMedias = (medias: Media[]): [Media[], Media[]] => {
  if (medias.length <= 1) return [medias, []];
  const middle = Math.ceil(medias.length / 2);
  return [medias.slice(0, middle), medias.slice(middle)];
};

const [MEDIAS_2024_PRIMARY, MEDIAS_2024_SECONDARY] = splitMedias(MEDIAS_2024);

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
  chiffres: { label: string; valeur: number }[];
  momentsForts: Media[];           // carrousel 1
  momentsFortsSecondaire: Media[]; // carrousel 2 (nouveau)
  galerie: Media[];
};




/* =========================================================
   DONNÉES
   ========================================================= */

   /* 2025 & 2024 & 2023 sont des YearData et on les initialises ci-dessous */
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
    // Carrousel 1 : tes médias “classiques”
    momentsForts: MEDIAS_2025,

    // Carrousel 2 : AUTRE fichier de médias (gala, etc.)
    momentsFortsSecondaire: MEDIAS_2025_2,

    // La galerie peut garder ce que tu veux
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
    momentsForts: MEDIAS_2024,
    // Si tu as un deuxième fichier pour 2024, tu le mets ici
    momentsFortsSecondaire: MEDIAS_2024, // ou MEDIAS_2024_GALA si tu le crées
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
    momentsForts: MEDIAS_2024,
    momentsFortsSecondaire: [], // rien pour l’instant
    galerie: MEDIAS_2024,
  },
};

DATA["2024"].momentsForts = MEDIAS_2024_PRIMARY;
DATA["2024"].momentsFortsSecondaire = MEDIAS_2024_SECONDARY;

const [MEDIAS_2023_PRIMARY, MEDIAS_2023_SECONDARY] = splitMedias(
  DATA["2023"].momentsForts
);
DATA["2023"].momentsForts = MEDIAS_2023_PRIMARY;
DATA["2023"].momentsFortsSecondaire = MEDIAS_2023_SECONDARY;


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
  const [year, setYear] = useState<"2025" | "2024" | "2023">("2025"); // utilise 2025 par defaut
  const data = DATA[year]; // recupere le contenue qu'on as initialiser dans chaque année juste en haut

  // 👉 état pour activer / désactiver le scroll auto
  const [autoScroll, setAutoScroll] = useState(false); // scroll off a la base

  // 👉 quelle image est "en gros plan" pendant le défilement auto
  const [currentAutoMediaId, setCurrentAutoMediaId] = useState<string | null>(null);

  // 👉 effet qui fait défiler image par image
  useEffect(() => {
    if (!autoScroll) {
      setCurrentAutoMediaId(null);
      return;
    }

    // On récupère toutes les cartes qui portent data-autoscroll-id,
    // dans l’ordre de la page
    const stops = Array.from(
      document.querySelectorAll<HTMLElement>("[data-autoscroll-id]")
    );

    if (!stops.length) {
      setAutoScroll(false);
      return;
    }

    let index = 0;
    let cancelled = false;
    let timeoutId: number;

    const goToNext = () => {
      if (cancelled || !autoScroll) return;

      const el = stops[index];
      if (!el) {
        setAutoScroll(false);
        setCurrentAutoMediaId(null);
        return;
      }

      const id = el.dataset.autoscrollId ?? null;
      setCurrentAutoMediaId(id); // on dit "celle-là est en gros plan"

      // on centre l’élément dans l’écran (et en horizontal pour les carrousels)
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      index += 1;

      if (index >= stops.length) {
        // dernière image → petite pause puis on coupe
        timeoutId = window.setTimeout(() => {
          setAutoScroll(false);
          setCurrentAutoMediaId(null);
        }, 2000);
      } else {
        // temps d’affichage par image (à ajuster si tu veux)
        timeoutId = window.setTimeout(goToNext, 2200);
      }
    };

    // petit délai avant de commencer
    timeoutId = window.setTimeout(goToNext, 400);

    // si la personne touche à la souris / tactile / clavier → on arrête l’auto-scroll
    const stopUserInteraction = () => setAutoScroll(false);
    window.addEventListener("wheel", stopUserInteraction, { passive: true });
    window.addEventListener("touchstart", stopUserInteraction, { passive: true });
    window.addEventListener("keydown", stopUserInteraction);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("wheel", stopUserInteraction);
      window.removeEventListener("touchstart", stopUserInteraction);
      window.removeEventListener("keydown", stopUserInteraction);
    };
  }, [autoScroll, setAutoScroll]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* Bouton toggle défilement auto */}
      <button
        type="button"
        onClick={() => setAutoScroll((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white px-4 py-2 text-sm shadow-lg hover:bg-gray-900 active:scale-95 transition"
      >
        {autoScroll ? "Désactiver le défilement auto" : "Activer le défilement auto"}
      </button>

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
      {/* MOMENTS FORTS – carrousel 1 */}
  <SectionMomentsForts
    titre="Au coeur de nos actions"
    items={data.momentsForts}
    currentAutoMediaId={currentAutoMediaId}
  />

  {data.momentsFortsSecondaire.length > 0 && (
    <SectionMomentsForts
      titre=""
      items={data.momentsFortsSecondaire}
      currentAutoMediaId={currentAutoMediaId}
    />
  )}
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

function SectionMomentsForts({
  items,
  titre,
  currentAutoMediaId,
}: {
  items: Media[];
  titre: string;
  currentAutoMediaId: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: dir * (el.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">
        {titre}
      </h2>

      <div className="relative">
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        >
          {items.map((m) => {
            const isActive = currentAutoMediaId === m.id;

            return (
              <article
                key={m.id}
                data-autoscroll-id={m.id}
                className={`
                  snap-start shrink-0 w-[85%] md:w-[48%] lg:w-[32%]
                  rounded-2xl overflow-hidden border bg-white shadow-sm
                  transition-transform duration-300
                  ${isActive ? "scale-[1.03] shadow-xl ring-2 ring-rose-200" : ""}
                `}
              >
                <MediaPreview m={m} ratio="aspect-[16/9]" hoverZoom />
                <div className="p-4">
                  {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                  {m.texte && (
                    <p className="text-sm text-gray-600 mt-1">{m.texte}</p>
                  )}
                  {m.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs rounded-full bg-gray-100 px-2 py-1"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}

        </div>

        {/* flèches navigation */}
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


function SectionGalerie({
  items,
  currentAutoMediaId,
  }: {
    items: Media[];
    currentAutoMediaId: string | null;
  }) {
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
      {filtered.map((m) => {
        const isActive = currentAutoMediaId === m.id;

        return (
          <motion.article
            key={m.id}
            data-autoscroll-id={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className={`
              break-inside-avoid rounded-2xl overflow-hidden border bg-white shadow-sm group
              transition-transform duration-300
              ${isActive ? "scale-[1.03] shadow-xl ring-2 ring-rose-200" : ""}
            `}
          >
            <button
              onClick={() => setLightbox(m)}
              className="block w-full text-left"
            >
              <div className="relative">
                <MediaPreview m={m} ratio="aspect-[4/3]" />
              </div>

              {m.titre || m.texte || m.tags ? (
                <div className="p-4">
                  {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                  {m.texte && (
                    <p className="text-sm text-gray-600 mt-1">{m.texte}</p>
                  )}
                  {m.tags && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs rounded-full bg-gray-100 px-2 py-1"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </button>
          </motion.article>
        );
      })}

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
