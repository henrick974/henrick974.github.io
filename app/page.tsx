"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MEDIAS_2024, MEDIAS_2024_2 } from "./medias2024";

import { MEDIAS_2025, MEDIAS_2025_2 } from "./medias2025";

import { HeroFondatrice } from "@/src/components/HeroFondatrice";
import { MediaPreview, type Media } from "@/src/components/evenement/media";
import {
  SectionChiffres,
  SectionChiffresFusion,
} from "@/src/components/evenement/SectionChiffres";



// Media[] c'est un tableau de Media
// et sa renvoi 2 tableau dcp
const splitMedias = (medias: Media[]): [Media[], Media[]] => {
  if (medias.length <= 1) return [medias, []]; // si la taille et de 1 y a lui meme et un tableau vide
  const middle = Math.ceil(medias.length / 2); // on cherche le milieu .ceil sa arrondi arrondi au dessus
  return [medias.slice(0, middle), medias.slice(middle)]; // on met du debut au milieu dans un array et le reste ds l'autre array slice(start, end) || start(start)
};

/* ========================================================
 * SPLITAGE DES TABLEAU (MEDIA) EN 2!
 * ========================================================
 */

const MEDIAS_2024_ALL = [...MEDIAS_2024, ...MEDIAS_2024_2];
const MEDIAS_2024_SET = MEDIAS_2024_ALL.filter((m) =>
  m.tags?.some((t) => t.endsWith("2024"))
);
const [MEDIAS_2024_PRIMARY, MEDIAS_2024_SECONDARY] = splitMedias(MEDIAS_2024_SET);

/* =========================================================
   TYPES
   ========================================================= */

type YearData = {
  hero: { titre: string; accroche: string };
  chiffres?: { label: string; valeur: number }[];
  chiffresFusionnes?: { annee: string; chiffres: { label: string; valeur: number }[] }[];
  momentsForts: Media[];           // carrousel 1
  momentsFortsSecondaire: Media[]; // carrousel 2 (nouveau)

};

type YearKey = "2025" | "2024-2023";

  // Se Sont les types
  type AutoStep =
    | { kind: "year-chiffres"; year: YearKey; durationMs: number }
    | { kind: "year-images"; year: YearKey }
    | { kind: "anchor"; id: string; durationMs: number }; // c'est l'action par default

/* =========================================================
   DONNéES
   ========================================================= */

   /* 2025 & 2024 & 2023 sont des YearData et on les initialises ci-dessous */
const DATA: Record<YearKey, YearData> = { // const NOM: TYPE = VALEUR;
                                                          // Record<Cl?, Valeur> en gros c'est pour dire avant c'est soit 2024 2025 ou 2023
                                                          // et sa valeur sera toujours un YearsData
  "2025": {
    hero: {
      titre: "Notre Histoire en 2025",
      accroche:
        "Atelier, Cérémonies, conférences, rencontres publiques, soirées de prestige : Une association rythmée par des événements marquants.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 179 },
      { label: "Membres", valeur: 106 },
      { label: "Soutiens et Partenaires", valeur: 21 },
    ],
    // Carrousel 1 : tes médias classiques
    momentsForts: MEDIAS_2025,

    // Carrousel 2 : AUTRE fichier de médias (gala, etc.)
    momentsFortsSecondaire: MEDIAS_2025_2,

  },

  "2024-2023": {
    hero: {
      titre: "Notre histoire en 2023/2024",
      accroche:
        "Les premieres pierres puis l'acceleration : deux annees pour installer les fondations et elargir notre impact.",
    },
    chiffresFusionnes: [
      {
        annee: "2023",
        chiffres: [
          { label: "Ateliers", valeur: 15 },
          { label: "Membres", valeur: 17 },
          { label: "Soutiens et partenaires", valeur: 5 },
        ],
      },
      {
        annee: "2024",
        chiffres: [
          { label: "Ateliers", valeur: 192 },
          { label: "Membres", valeur: 95 },
          { label: "Soutiens et partenaires", valeur: 28 },
        ],
      },
    ],
    momentsForts: MEDIAS_2024_PRIMARY, // premiere partie defini plus haut par ton split
    momentsFortsSecondaire: MEDIAS_2024_SECONDARY, // je met le tableau de la deuxieme partie que ta defini plus tot

  },

  };

/* =========================================================
   PAGE
   ========================================================= */


export default function PageEvenement() {
  const [year, setYear] = useState<YearKey>("2025"); // creation de la function setYear qui n'accepte que 2025 ou 2024-2023 et qui as mis 2025 par defaut
  const data = DATA[year]; // recupere le contenue qu'on as initialiser dans chaque ann?e juste en haut

  // ?? �tat pour activer / activer le scroll auto
  const [autoScroll, setAutoScroll] = useState(false); // créé la fonction setAutoScroll et le met a false

  // ?? quelle image est "en gros plan" pendant le d?filement auto
  const [currentAutoMediaId, setCurrentAutoMediaId] = useState<string | null>(null); // créé la fonction setCurrentAutoMediaId sa prend une str mais c'est null par defaut

  // Lecture auto des vidéos uniquement pendant l'autoscroll
  useEffect(() => {
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[data-autoscroll-video]")
    );

    videos.forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    if (!currentAutoMediaId || !autoScroll) return;

    const currentVideo = document.querySelector<HTMLVideoElement>(
      `[data-autoscroll-id="${currentAutoMediaId}"] video`
    );

    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {
        /* ignore autoplay errors */
      });
    }
  }, [currentAutoMediaId, autoScroll]);
//  effet qui fait défiler, étape par étape
useEffect(() => {
  if (!autoScroll) {
    setCurrentAutoMediaId(null);
    return;
  }

  //  Plan complet du défilement
  const steps: AutoStep[] = [
    { kind: "anchor", id: "section-hero", durationMs: 10_000 },
    { kind: "anchor", id: "section-nuage-mots", durationMs: 5_000 },
    { kind: "year-chiffres", year: "2024-2023", durationMs: 5_000 },
    { kind: "year-images", year: "2024-2023" },
    { kind: "year-chiffres", year: "2025", durationMs: 5_000 },
    { kind: "year-images", year: "2025" },
  ];

  let cancelled = false;
  let timeoutId: number | null = null; // contient l'Id du timer de l'image actuel

  const runStep = (stepIndex: number) => {
    if (cancelled || !autoScroll) return;

    const step = steps[stepIndex];
    // si jamais on dépasse, on repart du début
    if (!step) {
      runStep(0);
      return;
    }

    // on reset le "highlight" d'image à chaque nouvelle étape parce que pas besoin de zoom quand on est sur le titre par exemple
    setCurrentAutoMediaId(null);

    // si l'ID est null c'est que y a rien qui vient apres genre il vas plus executer la fonction qui passe au suivant
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    const nextStepIndex = (stepIndex + 1) % steps.length; // pour ne pas out range l'array steps

    if (step.kind === "anchor") {
      const el = document.getElementById(step.id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }

      timeoutId = window.setTimeout(() => {
        runStep(nextStepIndex);
      }, step.durationMs);
      return;
    } else {
      setYear(step.year); // si c'est pas un anchor c'est forcement un year-image ou year-chiffre
    }

    // petit délai pour laisser React changer d'année
    timeoutId = window.setTimeout(() => {
      if (cancelled || !autoScroll) return;

      if (step.kind === "year-chiffres") {
        const chiffresEl = document.getElementById("section-chiffres");
        if (chiffresEl) {
          chiffresEl.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }

        timeoutId = window.setTimeout(() => {
          runStep(nextStepIndex);
        }, step.durationMs);
      } else {
        // === phase images de l'ann?e courante ===
        const stops = Array.from(
          document.querySelectorAll<HTMLElement>("[data-autoscroll-id]")
        );

        if (!stops.length) {
          runStep(nextStepIndex);
          return;
        }

        let imgIndex = 0;

        const goToNextImage = () => {
          if (cancelled || !autoScroll) return;

          const el = stops[imgIndex];
          if (!el) {
            timeoutId = window.setTimeout(() => {
              setCurrentAutoMediaId(null);
              runStep(nextStepIndex);
            }, 2000);
            return;
          }

          const id = el.dataset.autoscrollId ?? null;
          const mediaType = el.dataset.mediaType ?? "image";
          const delay = mediaType === "video" ? 9000 : 2200; // laisse le temps à la vidéo de jouer
          setCurrentAutoMediaId(id); // celle-là est en "gros plan"

          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });

          imgIndex += 1;

          if (imgIndex >= stops.length) {
            timeoutId = window.setTimeout(() => {
              setCurrentAutoMediaId(null);
              runStep(nextStepIndex);
            }, delay);
          } else {
            timeoutId = window.setTimeout(goToNextImage, delay); // vitesse actuelle des photos / vidéos
          }
        };

        // petit délai avant la 1'image
        timeoutId = window.setTimeout(goToNextImage, 400);
      }
    }, 300);
  };

  // on démarre au début du plan
  runStep(0);

  // stop si l'utilisateur touche ? la page
  const stopUserInteraction = () => setAutoScroll(false);
  window.addEventListener("wheel", stopUserInteraction, { passive: true });
  window.addEventListener("touchstart", stopUserInteraction, { passive: true });
  window.addEventListener("keydown", stopUserInteraction);

  return () => {
    cancelled = true;
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    window.removeEventListener("wheel", stopUserInteraction);
    window.removeEventListener("touchstart", stopUserInteraction);
    window.removeEventListener("keydown", stopUserInteraction);
  };
}, [autoScroll]);

  /* ============================================
   * VIEW
   * ============================================
   */
  return (
    <>
    <main className="min-h-screen bg-linear-to-b from-[#fff7ed] to-white">
      {/* Bouton toggle défilement auto */}
      <button
        type="button"
        onClick={() => setAutoScroll((prev) => !prev)} /*on passe une fonction qui renvoie son inverse */
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white px-4 py-2 text-sm shadow-lg hover:bg-gray-900 active:scale-95 transition"
      >
        {autoScroll ? "Désactiver le défilement auto" : "Activer le défilement auto"}
      </button>

      {/* HERO */}
      <HeroFondatrice />

      <SectionNuageMots />
      <div className="mx-auto max-w-7xl px-6 pb-2 flex justify-center">
        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429]">Nos chiffres clés</h2>
      </div>
      {/* Switch Année au-dessus des chiffres */}
      <div className="mx-auto max-w-7xl px-6 pb-4 flex justify-center">
        <div className="inline-flex rounded-full border bg-white overflow-hidden shadow">
          {(["2025", "2024-2023"] as const).map((y) => (
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
      </div>

      {/* CHIFFRES */}
      <div id="section-chiffres">
        {data.chiffresFusionnes ? (
          <SectionChiffresFusion blocs={data.chiffresFusionnes} />
        ) : data.chiffres ? (
          <SectionChiffres data={data.chiffres} />
        ) : null}
      </div>


      {/* MOMENTS FORTS */}
      <SectionMomentsForts
        titre="Au coeur de nos actions"
        items={data.momentsForts}
        currentAutoMediaId={currentAutoMediaId}
        headerAddon={
          <div className="inline-flex rounded-full border bg-white overflow-hidden shadow">
            {(["2025", "2024-2023"] as const).map((y) => (
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
        }
      />

      {data.momentsFortsSecondaire.length > 0 && (
        <SectionMomentsForts
          titre=""
          items={data.momentsFortsSecondaire}
          currentAutoMediaId={currentAutoMediaId}
        />
      )}


        <section
      id="mentions-legales"
      className="mx-auto max-w-7xl px-6 py-14 text-slate-900"
    >
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm">
        <h2 className="text-3xl md:text-4xl font-serif text-[#E2A429] mb-6">
          Mentions légales & RGPD
        </h2>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">Telecharger le document</h3>
            <p className="text-base leading-relaxed text-slate-700">
              Retrouve l’intégralité des Mentions legales & RGPD dans un fichier dédié.
            </p>
            <a
              href="/mentions-legales-rgpd.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900 transition"
            >
              Télécharger le document

            </a>
          </div>

          <Link
            href="https://www.facebook.com/groups/366121959389854"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v2h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12Z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-900">Suivre notre Actualité</p>

            </div>
          </Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 shadow-sm">
        <p className="text-sm md:text-base text-slate-800">
          Site conçu et développé par <span className="font-semibold">TigerSoft EI</span>.
        </p>
        <div className="relative h-12 w-40">
          <Image
            src="/temoignages/felr/tigersoft.PNG"
            alt="Logo TigerSoft EI"
            fill
            sizes="160px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>

  </main>

  <style jsx global>{`
    @keyframes marquee {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      .animate-marquee {
        animation: marquee 12s linear infinite;
      }
      @keyframes floatWords {
        0% { transform: translate(0, 0); }
        20% { transform: translate(10px, -12px); }
        45% { transform: translate(-12px, 10px); }
        70% { transform: translate(14px, 6px); }
        100% { transform: translate(0, 0); }
      }
      .cloud-word {
        color: #2ECC71;
        animation: floatWords 6s ease-in-out infinite alternate;
      }
      .cloud-word-gold {
        color: #2ECC71;
        animation: floatWords 7s ease-in-out infinite alternate;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
      .cloud-word-blue {
        color: #3498DB;
        animation: floatWords 7s ease-in-out infinite alternate;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
      .cloud-word-orange {
        color: #e67e22;
        animation: floatWords 7s ease-in-out infinite alternate;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
      .cloud-word-purple {
        color: #9B59B6;
        animation: floatWords 7s ease-in-out infinite alternate;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      }
    `}</style>
    </>
  );
}

/* =========================================================
   SECTIONS
   ========================================================= */

function SectionNuageMots() {
  const clouds = [
    {
      titre: "Élan intérieur et posture",
      mots: ["épassement de soi", "Prise de parole", "Audace", "Changement", "Responsabilité"],
      colorClass: "cloud-word-gold",
      bg: "from-amber-50/80 via-white to-amber-100/60 border-amber-200",
    },
    {
      titre: "Croissance & évolution",
      mots: ["Apprentissage", "Évolution", "développement personnel", "développement professionnel"],
      colorClass: "cloud-word-blue",
      bg: "from-sky-50/80 via-white to-sky-100/60 border-sky-200",
    },
    {
      titre: "Ouverture & relation à l'autre",
      mots: ["S'ouvrir", "Ouverture aux autres", "Connexion", "Entraide", "Partage", "Partenariat", "réseau"],
      colorClass: "cloud-word-purple",
      bg: "from-purple-50/80 via-white to-purple-100/60 border-purple-200",
    },
    {
      titre: "Énergie & plaisir",
      mots: ["Fun", "Engagement", "Rencontres", "Moments partagés", "Joie simple", "Convivialité", "Légèreté", "Sourires", "Présence naturelle"],
      colorClass: "cloud-word-orange",
      bg: "from-orange-50/80 via-white to-orange-100/60 border-orange-200",
    },
  ];

  const positions = [
    { top: "30%", left: "10%" },
    { top: "50%", left: "30%" },
    { top: "60%", left: "30%" },
    { top: "15%", left: "20%" },
    { top: "68%", left: "44%" },
    { top: "32%", left: "48%" },
    { top: "54%", left: "54%" },
    { top: "42%", left: "46%" },
    { top: "60%", left: "52%" },
  ];

  const spreadWordsLocal = (words: string[]) =>
    words.map((text, i) => ({ text, ...positions[i % positions.length] }));

  return (
    <section id="section-nuage-mots" className="bg-linear-to-r from-amber-100/60 via-white to-rose-100/60 py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div className="text-center">
          <p className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429]">Notre ambition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {clouds.map((c) => {
            const items = spreadWordsLocal(c.mots);
            return (
              <div key={c.titre} className="flex flex-col items-center gap-3">
                <p className="text-lg font-semibold text-gray-800 text-center">{c.titre}</p>
                <div className={`relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full bg-linear-to-br ${c.bg} border shadow-sm overflow-hidden`}>
                  {items.map((mot, idx) => (
                    <span
                      key={`${c.titre}-${mot.text}-${idx}`}
                      className={`${c.colorClass} absolute text-xs md:text-sm font-semibold text-center max-w-[70%] leading-tight wrap-break-word`}
                      style={{
                        top: mot.top,
                        left: mot.left,
                        transform: "translate(-50%, -50%)",
                        animationDuration: `${6 + idx * 0.4}s`,
                        animationDelay: `${idx * 0.25}s`,
                      }}
                    >
                      {mot.text === "Developpement personnel"
                        ? "Developpement\npersonnel"
                        : mot.text === "Developpement professionnel"
                        ? "Developpement\nprofessionnel"
                        : mot.text}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionMomentsForts({
  items,
  titre,
  currentAutoMediaId,
  headerAddon,
}: {
  items: Media[];
  titre: string;
  currentAutoMediaId: string | null;
  headerAddon?: React.ReactNode;
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
      <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429] mb-6 text-center">
        {titre}
      </h2>

      {headerAddon ? (
        <div className="mb-6 flex justify-center">{headerAddon}</div>
      ) : null}

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
                data-media-type={m.type}
                className={`
                  snap-start shrink-0 w-[92%] md:w-[60%] lg:w-[46%]
                  rounded-2xl overflow-hidden border bg-white shadow-sm relative
                  transition-transform duration-300
                  ${isActive ? "scale-[1.03] shadow-xl ring-2 ring-rose-200" : ""}
                `}
              >
                <motion.div
                  animate={
                    isActive
                      ? { scale: [1, 1.06, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    isActive
                      ? { duration: 0.7, ease: "easeInOut" }
                      : { duration: 0.3 }
                  }
                >
                  <MediaPreview m={m} ratio="aspect-[4/3]" hoverZoom />
                </motion.div>
                <div className="absolute bottom-2 right-2 rounded bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-gray-500 shadow-sm">
                  #{m.id}
                </div>
                {m.texte && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mt-1">{m.texte}</p>
                  </div>
                )}
              </article>
            );
          })}

        </div>

        {/* fléches navigation */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Pr?c?dent"
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Suivant"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}