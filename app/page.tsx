"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MEDIAS_2024, MEDIAS_2024_2 } from "./medias2024";

import { MEDIAS_2025, MEDIAS_2025_2 } from "./medias2025";

import { HeroFondatrice } from "@/src/components/HeroFondatrice";
import type { Media } from "@/src/components/evenement/media";
import {
  SectionChiffres,
  SectionChiffresFusion,
} from "@/src/components/evenement/SectionChiffres";
import { SectionMomentsForts } from "@/src/components/evenement/SectionMomentsForts";
import { MentionsLegalesSection } from "@/src/components/MentionsLegalesSection";
import { SectionEngagementCTA } from "@/src/components/SectionEngagementCTA";
import { SectionNuageMots } from "@/src/components/SectionNuageMots";



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

  //  état pour activer / activer le scroll auto
  const [autoScroll, setAutoScroll] = useState(false); // créé la fonction setAutoScroll et le met a false

  //  quelle image est "en gros plan" pendant le défilement auto
  const [currentAutoMediaId, setCurrentAutoMediaId] = useState<string | null>(null); // créé la fonction setCurrentAutoMediaId sa prend une str mais c'est null par defaut

  const stopAutoScroll = useCallback(() => {
    setAutoScroll(false);
    setCurrentAutoMediaId(null);
  }, []);

  const toggleAutoScroll = () => {
    setAutoScroll((prev) => {
      if (prev) {
        setCurrentAutoMediaId(null);
      }
      return !prev;
    });
  };

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
  window.addEventListener("wheel", stopAutoScroll, { passive: true });
  window.addEventListener("touchstart", stopAutoScroll, { passive: true });
  window.addEventListener("keydown", stopAutoScroll);

  return () => {
    cancelled = true;
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    window.removeEventListener("wheel", stopAutoScroll);
    window.removeEventListener("touchstart", stopAutoScroll);
    window.removeEventListener("keydown", stopAutoScroll);
  };
}, [autoScroll, stopAutoScroll]);

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
        onClick={toggleAutoScroll} /*on passe une fonction qui renvoie son inverse */
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

      <SectionEngagementCTA className="py-10" />

      <MentionsLegalesSection />

  </main>
    </>
  );
}
