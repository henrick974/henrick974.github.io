"use client"; // cÃ´tÃ© client que c'est execueter les trucs

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MEDIAS_2024 } from "./medias2024"; // adapte le chemin si ta page n'est pas dans le mÃªme dossier

import { MEDIAS_2025 } from "./medias2025"; // adapte le chemin si ta page n'est pas dans le mÃªme dossier

import { MEDIAS_2025_2 } from "./medias2025_2";
import {
  MEMBRES_FELR,
  MEMBRES_SOUTIEN,
  MOSAIQUE_TEMOIGNAGES,
  TemoignageMembreFelr,
  TemoignageMembreSoutien,
  TemoignageMosaiqueItem,
} from "./temoignages-data";

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

const [MEDIAS_2024_PRIMARY, MEDIAS_2024_SECONDARY] = splitMedias(MEDIAS_2024); // assignation de la premiere partie de 2024 et la deuxieme partie de 2024

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
   DONNÃ‰ES
   ========================================================= */

type YearKey = "2025" | "2023-2024";

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
   /* 2025 & 2024 & 2023 sont des YearData et on les initialises ci-dessous */
const DATA: Record<YearKey, YearData> = { // const NOM: TYPE = VALEUR;
                                                          // Record<ClÃ©, Valeur> en gros c'est pour dire avant c'est soit 2024 2025 ou 2023 
                                                          // et sa valeur sera toujours un YearsData
  "2025": {
    hero: {
      titre: "Notre Histoire en 2025",
      accroche:
        "Atelier, CÃ©rÃ©monies, confÃ©rences, rencontres publiques, soirÃ©es de prestige : Une association rythmÃ©e par des Ã©vÃ¨nements marquants.",
    },
    chiffres: [
      { label: "Ateliers", valeur: 179 },
      { label: "Membres", valeur: 106 },
      { label: "Soutien et Partenaires", valeur: 21 },
    ],
    // Carrousel 1 : tes mÃ©dias â€œclassiquesâ€
    momentsForts: MEDIAS_2025,

    // Carrousel 2 : AUTRE fichier de mÃ©dias (gala, etc.)
    momentsFortsSecondaire: MEDIAS_2025_2,

  },

  "2023-2024": {
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
          { label: "Soutien et partenaire", valeur: 5 },
        ],
      },
      {
        annee: "2024",
        chiffres: [
          { label: "Ateliers", valeur: 192 },
          { label: "Membres", valeur: 95 },
          { label: "Soutien et partenaire", valeur: 28 },
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
  const [year, setYear] = useState<YearKey>("2025"); // creation de la function setYear qui n'accepte que 2025 ou 2023-2024 et qui as mis 2025 par defaut
  const data = DATA[year]; // recupere le contenue qu'on as initialiser dans chaque annÃ©e juste en haut

  // ðŸ‘‰ Ã©tat pour activer / activer le scroll auto
  const [autoScroll, setAutoScroll] = useState(true); // crÃ©Ã© la fonction setAutoScroll et le met a false

  // ðŸ‘‰ quelle image est "en gros plan" pendant le dÃ©filement auto
  const [currentAutoMediaId, setCurrentAutoMediaId] = useState<string | null>(null); // crÃ©Ã© la fonction setCurrentAutoMediaId sa prend une str mais c'est null par defaut
  const currentAutoMedia = useMemo(() => {
    const pool = [...data.momentsForts, ...data.momentsFortsSecondaire];
    return pool.find((m) => m.id === currentAutoMediaId) ?? null;
  }, [data, currentAutoMediaId]);
// 👉 effet qui fait défiler, étape par étape
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
    | { kind: "temoignages"; perItemMs: number };

  // 🧭 Plan complet du défilement
  const steps: AutoStep[] = [
    { kind: "hero", durationMs: 90_000 }, // 1min30 sur le HERO
    { kind: "nuage", durationMs: 5_000 }, // 5s nuage
    { kind: "year-chiffres", year: "2023-2024", durationMs: 5_000 },
    { kind: "year-images", year: "2023-2024" },
    { kind: "year-chiffres", year: "2025", durationMs: 5_000 },
    { kind: "year-images", year: "2025" },

    // 1 min sur le paragraphe "Temoignage FELR"
    { kind: "anchor", id: "section-temoignage-felr", durationMs: 60_000 },

    // puis chaque témoignage FELR 10s
    { kind: "temoignages", perItemMs: 10_000 },

    { kind: "anchor", id: "section-membres-soutien", durationMs: 20_000 },
    { kind: "anchor", id: "osez-felr", durationMs: 10_000 },
  ];

  let cancelled = false;
  let timeoutId: number | null = null;

  const runStep = (stepIndex: number) => {
    if (cancelled || !autoScroll) return;

    const step = steps[stepIndex];
    if (!step) {
      // si jamais on dépasse, on repart du début
      runStep(0);
      return;
    }

    // on reset le "highlight" d'image à chaque nouvelle étape
    setCurrentAutoMediaId(null);

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    const nextStepIndex = (stepIndex + 1) % steps.length;

    // ===== Étapes simples : HERO / NUAGE / SECTIONS TEXTE =====
    if (step.kind === "hero") {
      // tu avais mis "2023-2024" dans ta version, je garde ça
      setYear("2023-2024");

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

    // ===== Étape spéciale : TÉMOIGNAGES (1 par 1) =====
    if (step.kind === "temoignages") {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-temoignage-id]")
      );

      if (!cards.length) {
        // si jamais aucune carte trouvée, on saute l’étape
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
          // dernier témoignage → on passe à l’étape suivante
          timeoutId = window.setTimeout(() => {
            runStep(nextStepIndex);
          }, step.perItemMs);
        } else {
          // sinon on continue
          timeoutId = window.setTimeout(goToNextTemoignage, step.perItemMs);
        }
      };

      // on commence à défiler les cartes après un premier délai
      timeoutId = window.setTimeout(goToNextTemoignage, step.perItemMs);
      return;
    }

    // ===== Étapes par année : CHIFFRES / IMAGES =====
    // Ici, on sait que step = "year-chiffres" ou "year-images"
    setYear(step.year);

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
        // === phase images de l'année courante ===
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
            }, 2000);
          } else {
            timeoutId = window.setTimeout(goToNextImage, 2200); // vitesse actuelle des photos
          }
        };

        // petit délai avant la 1ʳᵉ image
        timeoutId = window.setTimeout(goToNextImage, 400);
      }
    }, 300);
  };

  // on démarre au début du plan
  runStep(0);

  // stop si l'utilisateur touche à la page
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
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* Bouton toggle défilement auto */}
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
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">Bienvenue chez FELR</h1>
            <p className="text-lg leading-relaxed">
              En 2023, j'ai cree FELR pour repondre a un besoin reel : offrir aux femmes entrepreneures un espace ou parler vrai,
              apprendre, s'elever et oser prendre leur place. Un lieu ou l'on grandit, ou l'on se soutient, ou l'on s'ouvre au monde et a soi-meme.
            </p>
            <p className="text-lg leading-relaxed font-semibold">
              Mais laisse-moi etre transparente : FELR n'est pas fait pour tout le monde.
            </p>
            <div className="space-y-2">
              <p className="text-lg leading-relaxed">FELR s'adresse aux femmes qui ont envie de :</p>
              <ul className="list-disc pl-5 space-y-1 text-base">
                <li>evoluer, meme si cela demande de sortir de leur zone de confort,</li>
                <li>travailler sur leur posture, leur prise de parole, leur presence,</li>
                <li>apprendre, tester, experimenter, se challenger,</li>
                <li>s'engager dans une communaute vivante, bienveillante et exigeante,</li>
                <li>tisser des liens reels, durables et puissants,</li>
                <li>devenir, pas a pas, une leader affirmee.</li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed">
              Si tu cherches un simple reseau ou l'on vient "consommer" un evenement et repartir, alors FELR n'est pas l'endroit pour toi.
              Ici, on avance. On se transforme. On participe. On contribue. On joue collectif.
            </p>
            <p className="text-lg leading-relaxed">
              En deux ans, FELR est devenu un mouvement reconnu dans l'ecosysteme entrepreneurial feminin de La Reunion.
              Un espace ou les femmes entrepreneures s'ouvrent, evoluent, osent et incarnent peu a peu leur leadership.
            </p>
            <p className="text-lg leading-relaxed">
              Si tu te sens appelee par cette energie, si tu es prete a te developper personnellement et professionnellement,
              si tu veux faire partie d'un collectif qui eleve autant qu'il soutient... Alors bienvenue chez FELR. Bienvenue chez toi.
            </p>
            <p className="text-base font-semibold">Par Patricia Boucard - Presidente & Fondatrice</p>

            {/* Switch Année */}
            <div className="mt-6 inline-flex rounded-full border bg-white overflow-hidden shadow justify-center items-center">
              {(["2025", "2023-2024"] as const).map((y) => (
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
          </motion.div>
        </div>
      </section>

      <SectionNuageMots />
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
      />

      {data.momentsFortsSecondaire.length > 0 && (
        <SectionMomentsForts
          titre=""
          items={data.momentsFortsSecondaire}
          currentAutoMediaId={currentAutoMediaId}
        />
      )}

      <SectionCollectifFelr />

      {/* =========================================================
          LA BIG SECTION POUR OSEZ FELR
          ========================================================= */}
      <section
        id="osez-felr"
        className="mt-16 rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm space-y-6"
      >
        <p className="text-sm font-medium tracking-[0.25em] uppercase text-slate-500">
          ✨ Osez FELR
        </p>

        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Rejoins notre communauté. Prends ta place. Contribue.
        </h2>

        <div className="space-y-3 text-slate-800">
          <p>
            👉{" "}
            <Link
              href="https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-JIE-2025/Quest.htm?ORIGINE_SAISIE=Iframe"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              Devenir membre
            </Link>{" "}
            — Intègre une communauté qui t’élève, te soutient et t’aide à développer
            ton leadership.
            {/* TODO: remplace href="#" par le bon lien */}
          </p>

          <p>
            👉{" "}
            <Link
              href="https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-JIE-2025/Quest.htm?ORIGINE_SAISIE=Iframe"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              Devenir partenaire
            </Link>{" "}
            — Contribue à révéler la leader intérieure de chaque femme entrepreneure.
            {/* TODO: remplace href="#" par le bon lien */}
          </p>

          <p>
            👉{" "}
            <Link
              href="https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-JIE-2025/Quest.htm?ORIGINE_SAISIE=Iframe"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              Devenir bénévole
            </Link>{" "}
            — Apporte ton énergie, ton talent et participe activement à l’évolution
            d’un mouvement qui a du sens.
            {/* TODO: remplace href="#" par le bon lien */}
          </p>
        </div>

        <p className="pt-4 text-sm text-slate-600">
          Ici, tu n’es pas un(e) simple participant(e).<br />
          Tu es un acteur/une actrice du changement.
        </p>

        <p className="pt-2 text-xs sm:text-sm text-slate-500">
          Par <span className="font-semibold">Patricia Boucard</span> — Présidente &amp; Fondatrice
        </p>
      </section>

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
  return (
    <section
    id="section-nuage-mots"
    className="bg-gradient-to-r from-amber-100/60 via-white to-rose-100/60 py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-serif text-gray-900">Nuage d&apos;intentions FELR</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {WORD_CLOUD.map((bloc) => (
            <div
              key={bloc.titre}
              className="rounded-2xl border border-amber-200/70 bg-white/80 shadow-sm p-4 flex flex-wrap gap-2 items-start"
            >
              <span className="text-base font-semibold text-gray-800 mr-2">{bloc.titre}</span>
              <div className="flex flex-wrap gap-2">
                {bloc.mots.map((mot) => (
                  <span
                    key={mot}
                    className="px-3 py-1 rounded-full text-sm bg-amber-50 border border-amber-200 text-gray-800 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
                  >
                    {mot}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionCollectifFelr() {
  return (
    <section className="mt-10 border-t border-gray-200 bg-white/50">

      <div className="mx-auto max-w-7xl px-6 pb-6">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-2xl md:text-3xl font-serif text-center mb-6"
        >
          Temoignage FELR
        </motion.h3>
        <div className="max-w-3xl mx-auto text-center space-y-3 text-gray-800 mb-8"  id="section-temoignage-felr">
          <p className="text-lg font-semibold">🤍 Merci a celles et ceux qui font vivre FELR</p>
          <p>
            FELR ne serait pas ce qu'il est aujourd'hui sans toutes les personnes qui ont choisi de marcher a nos cotes.
            Depuis 2023, nous avancons ensemble, avec une vision commune : offrir aux femmes entrepreneures un espace
            ou elles peuvent s'ouvrir, apprendre, evoluer et incarner un leadership qui leur ressemble.
          </p>
          <p className="font-medium">Je tiens a remercier de tout coeur :</p>
          <ul className="space-y-1 text-left list-disc list-inside">
            <li>Les femmes entrepreneures qui nous font confiance et qui osent se reveler, prendre la parole, evoluer et contribuer a chaque rencontre.</li>
            <li>Les benevoles, intervenants et partenaires qui offrent leur temps, leur expertise, leur creativite et leur soutien.</li>
            <li>Les soutiens de l'ombre, qui encouragent, conseillent, inspirent et croient en la vision depuis le debut.</li>
            <li>Toutes celles et ceux qui contribuent, de pres ou de loin, a faire grandir FELR avec bienveillance, engagement et ambition.</li>
          </ul>
          <p>
            FELR est nee d'un besoin… Mais FELR grandit grace a vous. Merci d'incarner, avec moi, une vision d'un leadership
            feminin plus ouvert, plus humain et plus affirme. Merci de faire de FELR un espace ou l'on s'ouvre, ou l'on experimente, ou l'on partage…
            et ou chaque femme peut devenir, pas a pas, celle qu'elle aspire a etre.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBRES_FELR.map((m, index) => (
            <div
              key={m.id}
              data-temoignage-id={`temoignage-felr-${index}`}
            >
              <CarteTemoignageFelr m={m} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-14" id="section-membres-soutien">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-2xl md:text-3xl font-serif text-center mb-6"
        >
          Membres soutien
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBRES_SOUTIEN.map((m) => (
            <CarteTemoignageSoutien key={m.id} m={m} />
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
          className="relative aspect-square overflow-hidden rounded-2xl border bg-gray-100 group"
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
      <div className="relative h-56 bg-gray-100">
        <Image
          src={m.photo}
          alt={`${m.prenom} ${m.nom ?? ""}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 leading-relaxed mt-2">{m.temoignage}</p>
      </div>
    </motion.article>
  );
}

function CarteTemoignageSoutien({ m }: { m: TemoignageMembreSoutien }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm"
    >
      <div className="relative h-56 bg-gray-100">
        <Image
          src={m.photo}
          alt={`${m.prenom} ${m.nom ?? ""}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain"
        />
      </div>
    </motion.article>
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
                  snap-start shrink-0 w-[92%] md:w-[60%] lg:w-[46%]
                  rounded-2xl overflow-hidden border bg-white shadow-sm
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
                {m.texte && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mt-1">{m.texte}</p>
                  </div>
                )}
              </article>
            );
          })}

        </div>

        {/* flÃ¨ches navigation */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Précèdent"
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
              {t === "all" ? "Tous" : t === "image" ? "Photos" : "VidÃ©os"}
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
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain bg-black"
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