// app/evenement/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   TYPES
   ========================================================= */
type Media = {
  id: string;
  type: "image" | "video";
  src: string;        // ex: "/medias/2025/evenement1.jpg"
  alt?: string;
  titre?: string;     // ex: "Ouverture 2025"
  texte?: string;     // ex: "Soirée d’ouverture au Parc des Expos"
  tags?: string[];    // ex: ["ouverture", "ceremonie"]
};

type YearData = {
  hero: { titre: string; accroche: string };
  chiffres: { label: string; valeur: number }[]; // uniquement lié aux ÉVÈNEMENTS
  momentsForts: Media[]; // carrousel
  galerie: Media[];      // masonry + filtres
  replays: Media[];      // vidéos majeures
};

/* =========================================================
   DONNÉES EXEMPLE 2024/2025
   (remplace ou complète avec tes fichiers)
   ========================================================= */
const DATA: Record<"2025" | "2024", YearData> = {
  "2025": {
    hero: {
      titre: "Évènements 2025",
      accroche:
        "Cérémonies, conférences, rencontres publiques et soirées de prestige : une année rythmée par des temps forts mémorables.",
    },
    chiffres: [
      { label: "Évènements", valeur: 26 },
      { label: "Jours d’animation", valeur: 41 },
      { label: "Villes", valeur: 7 },
      { label: "Replays", valeur: 9 },
    ],

    /* MOMENTS FORTS — carrousel */
    momentsForts: [
      {
        id: "25-m1",
        type: "image",
        src: "/medias/2025/ouverture.jpg",
        titre: "Cérémonie d’ouverture",
        texte: "Rideau levé, annonces majeures et lancement officiel.",
        tags: ["ouverture", "ceremonie"],
      },
      {
        id: "25-m2",
        type: "video",
        src: "/medias/2025/point-presse.mp4",
        titre: "Point presse",
        texte: "Calendrier dévoilé et temps forts présentés à la presse.",
        tags: ["presse"],
      },
      {
        id: "25-m3",
        type: "image",
        src: "/medias/2025/conference.jpg",
        titre: "Conférence inaugurale",
        texte: "Une vision claire et un cap assumé pour l’année.",
        tags: ["conference"],
      },
      {
        id: "25-m4",
        type: "image",
        src: "/medias/2025/rencontre-publique.jpg",
        titre: "Rencontre publique",
        texte: "Échanges en salle et annonces complémentaires.",
        tags: ["rencontre"],
      },
      {
        id: "25-m5",
        type: "video",
        src: "/medias/2025/highlights-early.mp4",
        titre: "Highlights — 1er trimestre",
        texte: "Un condensé d’émotion et d’intensité.",
        tags: ["highlights"],
      },
      {
        id: "25-m6",
        type: "image",
        src: "/medias/2025/gala.jpg",
        titre: "Soirée de distinction",
        texte: "Clôture d’étape, mise à l’honneur et moments d’exception.",
        tags: ["gala"],
      },
    ],

    /* GALERIE — masonry + filtres */
    galerie: [
      {
        id: "25-g1",
        type: "image",
        src: "/medias/2025/scene-centrale.jpg",
        titre: "Scène centrale",
        texte: "Lumières, scénographie et ambiance soignée.",
        tags: ["scene", "ceremonie"],
      },
      {
        id: "25-g2",
        type: "image",
        src: "/medias/2025/affluence.jpg",
        titre: "Affluence",
        texte: "Un public au rendez-vous pour les annonces clés.",
        tags: ["rencontre"],
      },
      {
        id: "25-g3",
        type: "video",
        src: "/medias/2025/mini-after.mp4",
        titre: "Aftermovie express",
        texte: "Les temps forts d’une soirée en rythme.",
        tags: ["aftermovie"],
      },
      {
        id: "25-g4",
        type: "image",
        src: "/medias/2025/coulisses.jpg",
        titre: "Coulisses",
        texte: "Réglages, derniers briefings et mise au point technique.",
        tags: ["backstage", "logistique"],
      },
      {
        id: "25-g5",
        type: "image",
        src: "/medias/2025/installation.jpg",
        titre: "Installation",
        texte: "Montage précis pour une expérience fluide et agréable.",
        tags: ["logistique"],
      },
      {
        id: "25-g6",
        type: "video",
        src: "/medias/2025/highlights-2.mp4",
        titre: "Highlights — mi-saison",
        texte: "Nouveau chapitre, nouveaux décors, même intensité.",
        tags: ["highlights"],
      },
      {
        id: "25-g7",
        type: "image",
        src: "/medias/2025/ceremonie.jpg",
        titre: "Cérémonie",
        texte: "Remise de distinctions et annonces intermédiaires.",
        tags: ["ceremonie"],
      },
      {
        id: "25-g8",
        type: "image",
        src: "/medias/2025/exposition.jpg",
        titre: "Espace exposition",
        texte: "Parcours visuel pensé pour guider le regard.",
        tags: ["exposition"],
      },
      {
        id: "25-g9",
        type: "video",
        src: "/medias/2025/spot-annonce.mp4",
        titre: "Spot d’annonce",
        texte: "Prochain rendez-vous à ne pas manquer.",
        tags: ["annonce"],
      },
      {
        id: "25-g10",
        type: "image",
        src: "/medias/2025/soiree.jpg",
        titre: "Soirée signature",
        texte: "Décor épuré, tempo élégant, instants à part.",
        tags: ["soiree"],
      },
      {
        id: "25-g11",
        type: "image",
        src: "/medias/2025/village.jpg",
        titre: "Village éphémère",
        texte: "Parcours libre et découverte au fil des allées.",
        tags: ["exterieur"],
      },
      {
        id: "25-g12",
        type: "video",
        src: "/medias/2025/highlights-final.mp4",
        titre: "Highlights — final",
        texte: "Clôture sur une note forte et lumineuse.",
        tags: ["highlights", "final"],
      },
    ],

    /* REPLAYS — vidéos longues */
    replays: [
      {
        id: "25-r1",
        type: "video",
        src: "/medias/2025/replay-ouverture.mp4",
        titre: "Replay — Ouverture officielle",
        texte: "Version intégrale, introduction et annonces.",
        tags: ["replay", "ouverture"],
      },
      {
        id: "25-r2",
        type: "video",
        src: "/medias/2025/replay-presse.mp4",
        titre: "Replay — Point presse",
        texte: "Questions-réponses et précisions sur la programmation.",
        tags: ["replay", "presse"],
      },
      {
        id: "25-r3",
        type: "video",
        src: "/medias/2025/replay-conference.mp4",
        titre: "Replay — Conférence",
        texte: "Perspectives 2025 et feuille de route des évènements.",
        tags: ["replay", "conference"],
      },
      {
        id: "25-r4",
        type: "video",
        src: "/medias/2025/replay-rencontre.mp4",
        titre: "Replay — Rencontre publique",
        texte: "Captation intégrale et annonces complémentaires.",
        tags: ["replay", "rencontre"],
      },
      {
        id: "25-r5",
        type: "video",
        src: "/medias/2025/replay-gala.mp4",
        titre: "Replay — Soirée de distinction",
        texte: "Conclusion élégante et annonces finales.",
        tags: ["replay", "gala"],
      },
    ],
  },

  "2024": {
    hero: {
      titre: "Évènements 2024",
      accroche:
        "Premières éditions et premières scènes : les fondations d’un rendez-vous qui compte.",
    },
    chiffres: [
      { label: "Évènements", valeur: 18 },
      { label: "Jours d’animation", valeur: 27 },
      { label: "Villes", valeur: 5 },
      { label: "Replays", valeur: 5 },
    ],

    momentsForts: [
      {
        id: "24-m1",
        type: "image",
        src: "/medias/2024/lancement.jpg",
        titre: "Lancement 2024",
        texte: "Décor sobre, messages forts, cap défini.",
        tags: ["lancement", "ceremonie"],
      },
      {
        id: "24-m2",
        type: "video",
        src: "/medias/2024/teaser.mp4",
        titre: "Teaser d’annonce",
        texte: "Un format court pour donner envie de venir.",
        tags: ["teaser"],
      },
      {
        id: "24-m3",
        type: "image",
        src: "/medias/2024/rencontre.jpg",
        titre: "Rencontre régionale",
        texte: "Premières captations et premières scènes.",
        tags: ["rencontre"],
      },
      {
        id: "24-m4",
        type: "image",
        src: "/medias/2024/scene.jpg",
        titre: "Première scène",
        texte: "Lumières, son et entrée en matière efficace.",
        tags: ["scene"],
      },
    ],

    galerie: [
      {
        id: "24-g1",
        type: "image",
        src: "/medias/2024/affiche.jpg",
        titre: "Affiche 2024",
        texte: "Identité visuelle et ton de l’édition.",
        tags: ["affiche"],
      },
      {
        id: "24-g2",
        type: "image",
        src: "/medias/2024/installation.jpg",
        titre: "Installation",
        texte: "Mise en place rigoureuse avant ouverture des portes.",
        tags: ["logistique"],
      },
      {
        id: "24-g3",
        type: "video",
        src: "/medias/2024/highlights.mp4",
        titre: "Highlights",
        texte: "Best-of de la saison inaugurale.",
        tags: ["highlights"],
      },
      {
        id: "24-g4",
        type: "image",
        src: "/medias/2024/ambiance.jpg",
        titre: "Ambiance",
        texte: "Un rythme posé, une atmosphère accueillante.",
        tags: ["soiree"],
      },
      {
        id: "24-g5",
        type: "image",
        src: "/medias/2024/ceremonie.jpg",
        titre: "Cérémonie",
        texte: "Annonces structurées, déroulé précis.",
        tags: ["ceremonie"],
      },
      {
        id: "24-g6",
        type: "image",
        src: "/medias/2024/exterieur.jpg",
        titre: "Extérieur",
        texte: "Signalétique claire et repères visibles.",
        tags: ["exterieur"],
      },
      {
        id: "24-g7",
        type: "video",
        src: "/medias/2024/recap-final.mp4",
        titre: "Récap’ final",
        texte: "Clap de fin et rendez-vous pris pour l’année suivante.",
        tags: ["final"],
      },
      {
        id: "24-g8",
        type: "image",
        src: "/medias/2024/podium.jpg",
        titre: "Podium",
        texte: "Instants capturés sous les projecteurs.",
        tags: ["scene"],
      },
    ],

    replays: [
      {
        id: "24-r1",
        type: "video",
        src: "/medias/2024/replay-lancement.mp4",
        titre: "Replay — Lancement 2024",
        texte: "Annonce officielle et présentation du format.",
        tags: ["replay", "lancement"],
      },
      {
        id: "24-r2",
        type: "video",
        src: "/medias/2024/replay-conference.mp4",
        titre: "Replay — Conférence",
        texte: "Informations pratiques et calendrier détaillé.",
        tags: ["replay", "conference"],
      },
      {
        id: "24-r3",
        type: "video",
        src: "/medias/2024/replay-rencontre.mp4",
        titre: "Replay — Rencontre régionale",
        texte: "Captation intégrale et ambiance des premières éditions.",
        tags: ["replay", "rencontre"],
      },
    ],
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
  const [year, setYear] = useState<"2025" | "2024">("2025");
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
          {(["2025", "2024"] as const).map((y) => (
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

      {/* CHIFFRES CLÉS (purement ÉVÈNEMENTS) */}
      <SectionChiffres data={data.chiffres} />

      {/* MOMENTS FORTS */}
      <SectionMomentsForts items={data.momentsForts} />

      {/* GALERIE (filtres + masonry + lightbox) */}
      <SectionGalerie items={data.galerie} />

      {/* REPLAYS VIDÉO */}
      <SectionReplays items={data.replays} />
    </main>
  );
}

/* =========================================================
   SECTIONS
   ========================================================= */
function SectionChiffres({ data }: { data: { label: string; valeur: number }[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Moments forts</h2>
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
                  {lightbox.titre && <h3 className="text-xl font-semibold mb-1">{lightbox.titre}</h3>}
                  {lightbox.texte && <p className="text-gray-700 leading-relaxed">{lightbox.texte}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SectionReplays({ items }: { items: Media[] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Replays</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((m) => (
          <article key={m.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm">
            <MediaPreview m={m} ratio="aspect-[16/9]" />
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
  return <video src={m.src} controls autoPlay className="w-full h-auto object-contain bg-black" />;
}
