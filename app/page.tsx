"use client"; // c?t? client que c'est execueter les trucs

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIAS_2024, MEDIAS_2024_2 } from "./medias2024"; // adapte le chemin si ta page n'est pas dans le m?me dossier

import { MEDIAS_2025, MEDIAS_2025_2 } from "./medias2025"; // adapte le chemin si ta page n'est pas dans le m?me dossier
import {
  MEMBRES_FELR,
  MOSAIQUE_TEMOIGNAGES,
  TemoignageMembreFelr,
  TemoignageMosaiqueItem,
} from "./temoignages-data";

import { SectionWhiteSilver } from "@/src/components/SectionWhiteSilver"; // a enlever

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
const MEDIAS_2023_SET = MEDIAS_2024_ALL.filter((m) =>
  m.tags?.some((t) => t.endsWith("2023"))
);
const MEDIAS_2024_SET = MEDIAS_2024_ALL.filter((m) =>
  m.tags?.some((t) => t.endsWith("2024"))
);
const [MEDIAS_2023_PRIMARY, MEDIAS_2023_SECONDARY] = splitMedias(MEDIAS_2023_SET);
const [MEDIAS_2024_PRIMARY, MEDIAS_2024_SECONDARY] = splitMedias(MEDIAS_2024_SET);

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
  chiffres?: { label: string; valeur: number }[];
  chiffresFusionnes?: { annee: string; chiffres: { label: string; valeur: number }[] }[];
  momentsForts: Media[];           // carrousel 1
  momentsFortsSecondaire: Media[]; // carrousel 2 (nouveau)

};




/* =========================================================
   DONN?ES
   ========================================================= */

type YearKey = "2025" | "2024-2023";

const WORD_CLOUD = [
  {
    titre: "Elan interieur et posture",
    mots: ["Depassement de soi", "Prise de parole", "Audace", "Changement", "Responsabilite"],
  },
  {
    titre: "Ouverture et relation a l'autre",
    mots: ["S'ouvrir", "Ouverture aux autres", "Connexion", "Entraide", "Partage", "Partenariat", "Reseau"],
  },
  {
    titre: "Croissance et evolution",
    mots: ["Apprentissage", "Evolution", "Developpement personnel", "Developpement professionnel"],
  },
  {
    titre: "Energie et plaisir",
    mots: ["Fun"],
  },
];

const CLOUD_POSITIONS = [
  { top: "18%", left: "26%" },
  { top: "30%", left: "42%" },
  { top: "44%", left: "24%" },
  { top: "50%", left: "60%" },
  { top: "64%", left: "32%" },
  { top: "70%", left: "48%" },
  { top: "78%", left: "28%" },
  { top: "36%", left: "64%" },
  { top: "56%", left: "40%" },
];

const spreadWords = (words: string[]) =>
  words.map((text, i) => {
    const pos = CLOUD_POSITIONS[i % CLOUD_POSITIONS.length];
    return { text, ...pos };
  });

const HEADER_MARQUEE_TEXT = "Bienvenue chez FELR - Femmes Entrepreneures et Leaders de La Reunion";
   /* 2025 & 2024 & 2023 sont des YearData et on les initialises ci-dessous */
const DATA: Record<YearKey, YearData> = { // const NOM: TYPE = VALEUR;
                                                          // Record<Cl?, Valeur> en gros c'est pour dire avant c'est soit 2024 2025 ou 2023 
                                                          // et sa valeur sera toujours un YearsData
  "2025": {
    hero: {
      titre: "Notre Histoire en 2025",
      accroche:
        "Atelier, C?r?monies, conf?rences, rencontres publiques, soir?es de prestige : Une association rythm?e par des ?v?nements marquants.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 179 },
      { label: "Membres", valeur: 106 },
      { label: "Soutiens et Partenaires", valeur: 21 },
    ],
    // Carrousel 1 : tes m?dias ?classiques?
    momentsForts: MEDIAS_2025,

    // Carrousel 2 : AUTRE fichier de m?dias (gala, etc.)
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
   OUTILS
   ========================================================= */
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

function useCounter(n: number, duration = 1200) { // pour faire l'animation d'affichage des nombres
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
  const [year, setYear] = useState<YearKey>("2025"); // creation de la function setYear qui n'accepte que 2025 ou 2024-2023 et qui as mis 2025 par defaut
  const data = DATA[year]; // recupere le contenue qu'on as initialiser dans chaque ann?e juste en haut

  // ?? �tat pour activer / activer le scroll auto
  const [autoScroll, setAutoScroll] = useState(false); // créé la fonction setAutoScroll et le met a false

  // ?? quelle image est "en gros plan" pendant le d?filement auto
  const [currentAutoMediaId, setCurrentAutoMediaId] = useState<string | null>(null); // cr?? la fonction setCurrentAutoMediaId sa prend une str mais c'est null par defaut
  const currentAutoMedia = useMemo(() => {
    const pool = [...data.momentsForts, ...data.momentsFortsSecondaire];
    return pool.find((m) => m.id === currentAutoMediaId) ?? null;
  }, [data, currentAutoMediaId]);

  // Lecture auto des vid�os uniquement pendant l'autoscroll
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
// ?? effet qui fait d?filer, ?tape par ?tape
useEffect(() => {
  if (!autoScroll) {
    setCurrentAutoMediaId(null);
    return;
  }

  type AutoStep =
    | { kind: "hero"; durationMs: number }
    | { kind: "nuage"; durationMs: number }
    | { kind: "year-chiffres"; year: YearKey; durationMs: number }
    | { kind: "year-images"; year: YearKey }
    | { kind: "anchor"; id: string; durationMs: number }
    | { kind: "temoignages"; perItemMs: number }
    | { kind: "partners"; perItemMs: number };

  // ?? Plan complet du d?filement
  const steps: AutoStep[] = [
    { kind: "hero", durationMs: 10_000 }, // 10s sur le HERO
    { kind: "nuage", durationMs: 5_000 }, // 5s nuage
    { kind: "year-chiffres", year: "2024-2023", durationMs: 5_000 },
    { kind: "year-images", year: "2024-2023" },
    { kind: "partners", perItemMs: 2200 },
    { kind: "anchor", id: "osez-felr", durationMs: 12_000 },

    // Scroll lent sur la section Temoignages FELR
    { kind: "anchor", id: "section-temoignage-felr", durationMs: 4_000 },
    { kind: "temoignages", perItemMs: 2_000 },

    // Puis on passe aux contenus 2025
    { kind: "year-chiffres", year: "2025", durationMs: 5_000 },
    { kind: "year-images", year: "2025" },
    // White & Silver + partenaires, puis Osez + temoignages avant de boucler
    { kind: "partners", perItemMs: 2200 },
    { kind: "anchor", id: "osez-felr", durationMs: 12_000 },
    { kind: "anchor", id: "section-temoignage-felr", durationMs: 4_000 },
    { kind: "temoignages", perItemMs: 2_000 },
  ];

  let cancelled = false;
  let timeoutId: number | null = null;

  const runStep = (stepIndex: number) => {
    if (cancelled || !autoScroll) return;

    const step = steps[stepIndex];
    if (!step) {
      // si jamais on d?passe, on repart du d?but
      runStep(0);
      return;
    }

    // on reset le "highlight" d'image ? chaque nouvelle ?tape
    setCurrentAutoMediaId(null);

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    const nextStepIndex = (stepIndex + 1) % steps.length;

    // ===== ?tapes simples : HERO / NUAGE / SECTIONS TEXTE =====
    if (step.kind === "hero") {
      // tu avais mis "2023-2024" dans ta version, je garde ?a
      setYear("2024-2023");

      const el = document.getElementById("section-hero");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }

      timeoutId = window.setTimeout(() => {
        runStep(nextStepIndex);
      }, step.durationMs);
      return;
    }

    if (step.kind === "nuage") {
      const el = document.getElementById("section-nuage-mots");
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
    }

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
    }

    // ===== ?tape sp?ciale : T?MOIGNAGES (1 par 1) =====
    if (step.kind === "temoignages") {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-temoignage-id]")
      );

      if (!cards.length) {
        // si jamais aucune carte trouv?e, on saute l??tape
        runStep(nextStepIndex);
        return;
      }

      let idx = 0;

      const goToNextTemoignage = () => {
        if (cancelled || !autoScroll) return;

        const el = cards[idx];
        if (!el) {
          timeoutId = window.setTimeout(() => {
            runStep(nextStepIndex);
          }, step.perItemMs);
          return;
        }

        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });

        idx += 1;

        if (idx >= cards.length) {
          // dernier t?moignage ? on passe ? l??tape suivante
          timeoutId = window.setTimeout(() => {
            runStep(nextStepIndex);
          }, step.perItemMs);
        } else {
          // sinon on continue
          timeoutId = window.setTimeout(goToNextTemoignage, step.perItemMs);
        }
      };

      // on commence ? d?filer les cartes apr?s un premier d?lai
      timeoutId = window.setTimeout(goToNextTemoignage, step.perItemMs);
      return;
    }

    // ===== etape speciale : PARTENAIRES (section White & Silver) =====
    if (step.kind === "partners") {
      setYear("2025");
      const anchorEl = document.getElementById("section-white-silver");
      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }

      const cards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-partner-card]")
      );

      if (!cards.length) {
        runStep(nextStepIndex);
        return;
      }

      let idx = 0;
      const goToNextPartner = () => {
        if (cancelled || !autoScroll) return;
        const el = cards[idx];
        if (!el) {
          timeoutId = window.setTimeout(() => runStep(nextStepIndex), step.perItemMs);
          return;
        }
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        idx += 1;
        if (idx >= cards.length) {
          timeoutId = window.setTimeout(() => runStep(nextStepIndex), step.perItemMs);
        } else {
          timeoutId = window.setTimeout(goToNextPartner, step.perItemMs);
        }
      };

      timeoutId = window.setTimeout(goToNextPartner, 600);
      return;
    }

    // ===== ?tapes par ann?e : CHIFFRES / IMAGES =====
    // Ici, on sait que step = "year-chiffres" ou "year-images"
    setYear(step.year);

    // petit d?lai pour laisser React changer d'ann?e
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
          const delay = mediaType === "video" ? 9000 : 2200; // laisse le temps � la vid�o de jouer
          setCurrentAutoMediaId(id); // celle-l? est en "gros plan"

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
            timeoutId = window.setTimeout(goToNextImage, delay); // vitesse actuelle des photos / vid�os
          }
        };

        // petit d?lai avant la 1?? image
        timeoutId = window.setTimeout(goToNextImage, 400);
      }
    }, 300);
  };

  // on d?marre au d?but du plan
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
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* Bouton toggle d?filement auto */}
      <button
        type="button"
        onClick={() => setAutoScroll((prev) => !prev)} /*on passe une fonction qui renvoie son inverse */
        className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white px-4 py-2 text-sm shadow-lg hover:bg-gray-900 active:scale-95 transition"
      >
        {autoScroll ? "Désactiver le défilement auto" : "Activer le défilement auto"}
      </button>
      {/* HERO */}
      <section
      id="section-hero"
      className="mx-auto max-w-7xl px-6 pt-16 md:pt-20 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429]">
            Au coeur de FELR : la voix de sa fondatrice
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-md"
          >
            <Image
              src="/PATRICIA.jpg"
              alt="FELR"
              fill
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-4 text-gray-800"
          >

            <p className="text-lg leading-relaxed">
              En 2023, j'ai créé FELR pour répondre à un besoin réel :
offrir aux femmes entrepreneures un espace où parler vrai, apprendre, s’élever et oser prendre leur place.
Un lieu où l’on grandit, où l’on se soutient, où l’on s’ouvre au monde et à soi-même.


            </p>
            <p className="text-lg leading-relaxed font-semibold">
              Mais laisse-moi être transparente :
              FELR n'est pas fait pour tout le monde.
            </p>
            <div className="space-y-2">
              <p className="text-lg leading-relaxed">   FELR s'adresse aux femmes qui ont envie de :</p>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>Évoluer, même si cela demande de sortir de leur zone de confort,</li>
                <li>Travailler sur leur posture, leur prise de parole, leur présence,</li>
                <li>Apprendre, tester, expérimenter, se challenger,</li>
                <li>S'engager dans une communauté vivante, bienveillante et exigeante,</li>
                <li>Tisser des liens réels, durables et puissants,</li>
                <li>Devenir, pas à pas, une leader affirmée.</li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed">
              Si tu cherches un simple réseau où l'on vient "consommer" un événement et repartir, alors FELR n'est pas l'endroit pour toi.
              Ici, on avance. On se transforme. On participe. On contribue. On joue collectif.
            </p>
            <p className="text-lg leading-relaxed">
              En deux ans, FELR est devenu un mouvement reconnu dans l'écosystème entrepreneurial féminin de La Réunion.
              Un espace où les femmes entrepreneures s'ouvrent, évoluent, osent et incarnent peu à peu leur leadership.
            </p>
            <p className="text-lg leading-relaxed">
              Si tu te sens appelée par cette énergie, si tu es prête à te développer personnellement et professionnellement,
              si tu veux faire partie d'un collectif qui élève autant qu'il soutient... Alors bienvenue chez FELR. Bienvenue chez toi.
            </p>
            <p className="text-base font-semibold">Par Patricia BOUCARD - Présidente & Fondatrice</p>

          </motion.div>
        </div>
      </section>

      <SectionNuageMots />
      <div className="mx-auto max-w-7xl px-6 pb-2 flex justify-center">
        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429]">Nos chiffres clés</h2>
      </div>
      {/* Switch Ann?e au-dessus des chiffres */}
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

      <SectionCollectifFelr />

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

function SectionChiffresFusion({
  blocs,
}: {
  blocs: { annee: string; chiffres: { label: string; valeur: number }[] }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-6 space-y-6">
      {blocs.map((bloc) => (
        <div key={bloc.annee} className="space-y-3">
          <div className="text-center text-lg font-semibold text-gray-700">
            {bloc.annee}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bloc.chiffres.map((c) => (
              <motion.div
                key={`${bloc.annee}-${c.label}`}
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
        </div>
      ))}
    </section>
  );
}

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
    <section id="section-nuage-mots" className="bg-gradient-to-r from-amber-100/60 via-white to-rose-100/60 py-10">
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
                <div className={`relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full bg-gradient-to-br ${c.bg} border shadow-sm overflow-hidden`}>
                  {items.map((mot, idx) => (
                    <span
                      key={`${c.titre}-${mot.text}-${idx}`}
                      className={`${c.colorClass} absolute text-xs md:text-sm font-semibold text-center max-w-[70%] leading-tight break-words`}
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

function SectionCollectifFelr() {
  return (
    <section className="mt-10 border-t border-gray-200 bg-white/50">
      <div className="mx-auto max-w-7xl px-6 pb-14">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-4xl md:text-5xl font-serif text-[#E2A429] text-center mb-10"
        >
          Témoignages FELR
        </motion.h3>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBRES_FELR.map((m, index) => (
            <div key={m.id} data-temoignage-id={`temoignage-felr-${index}`}>
              <CarteTemoignageFelr m={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BandeauMosaiqueCollectif({ images }: { images: TemoignageMosaiqueItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
    >
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="relative aspect-square overflow-hidden rounded-2xl border bg-white group"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width:1024px) 33vw, 16vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 ring-0 ring-transparent group-hover:ring-2 group-hover:ring-black/10 rounded-2xl transition" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CarteTemoignageFelr({ m }: { m: TemoignageMembreFelr }) {
  const [showFull, setShowFull] = useState(false);

  const MAX_CHARS = 260; // ajuste cette valeur pour avoir ~4 lignes
  const isLong = m.temoignage.length > MAX_CHARS;
  const renderWithBreaks = (text: string) =>
    text
      .split(/\n|<br\s*\/?>/i)
      .flatMap((part, idx, arr) =>
        idx < arr.length - 1 ? [part, <br key={`br-${idx}`} />] : [part]
      );

  const texteAffiche =
    showFull || !isLong
      ? m.temoignage
      : m.temoignage.slice(0, MAX_CHARS).trimEnd() + "...";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm"
    >
      <div className="px-4 pt-4 text-center font-semibold text-base text-gray-800">
        {m.prenom}
      </div>

      <div className="relative h-56 bg-white">
        <Image
          src={m.photo}
          alt={`${m.prenom} ${m.nom ?? ""}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain"
                  priority
                />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 leading-relaxed mt-2 text-justify">
          {renderWithBreaks(texteAffiche)}
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => setShowFull((v) => !v)}
            className="mt-2 text-xs font-semibold text-rose-600 hover:underline"
          >
            {showFull ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    </motion.article>
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
              {t === "all" ? "Tous" : t === "image" ? "Photos" : "Vid?os"}
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
        className="columns-1 sm:columns-1 lg:columns-2 gap-8 space-y-8"
      >
      {filtered.map((m) => {
        const isActive = currentAutoMediaId === m.id;

        return (
          <motion.article
            key={m.id}
            data-autoscroll-id={m.id}
            data-media-type={m.type}
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
              <motion.div
                className="relative"
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
                <MediaPreview m={m} ratio="aspect-[4/3]" />
              </motion.div>

              {m.titre || m.texte ? (
                <div className="p-4">
                  {m.titre && <h3 className="font-semibold">{m.titre}</h3>}
                  {m.texte && (
                    <p className="text-sm text-gray-600 mt-1">{m.texte}</p>
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
          className={`object-contain ${
            hoverZoom ? "transition-transform duration-300 group-hover:scale-[1.02]" : ""
          }`}
        />
      ) : (
        <video
          src={m.src}
          data-autoscroll-video="true"
          autoPlay
          muted
          playsInline
          preload="metadata"
          controls
          className="absolute inset-0 w-full h-full object-contain bg-black"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
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