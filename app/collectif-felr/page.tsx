"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

/* =========================================================
   TYPES
   ========================================================= */
type MembreFelr = {
  id: string;
  prenom: string;
  nom?: string;
  fonction: "oratrice" | "actif";
  photo: string;     // ex: /temoignages/felr/jeanne.jpg
  temoignage: string;
};

type MembreSoutien = {
  id: string;
  prenom: string;
  nom?: string;
  titrePro: string;  // ex: "Directrice Marketing"
  entreprise: string;
  photo: string;     // ex: /temoignages/soutien/dupont.jpg
  temoignage: string;
};

/* =========================================================
   DONNÉES (exemple — remplace par les tiennes)
   ========================================================= */
const MOSAIQUE: { src: string; alt: string }[] = [
  { src: "/temoignages/mosaique/1.jpg", alt: "Membre FELR" },
  { src: "/temoignages/mosaique/2.jpg", alt: "Partenaire" },
  { src: "/temoignages/mosaique/3.jpg", alt: "Invité·e" },
  { src: "/temoignages/mosaique/4.jpg", alt: "Membre soutien" },
  { src: "/temoignages/mosaique/5.jpg", alt: "Public" },
  { src: "/temoignages/mosaique/6.jpg", alt: "Équipe" },
];

const MEMBRES_FELR: MembreFelr[] = [
  {
    id: "felr-1",
    prenom: "Jeanne",
    nom: "L.",
    fonction: "oratrice",
    photo: "/temoignages/felr/jeanne.jpg",
    temoignage:
      "Prendre la parole avec FELR m’a donné l’élan pour concrétiser mes idées. On grandit ensemble.",
  },
  {
    id: "felr-2",
    prenom: "Mickaël",
    nom: "R.",
    fonction: "actif",
    photo: "/temoignages/felr/mickael.jpg",
    temoignage:
      "Ce collectif m’a apporté un cadre, de l’exigence bienveillante et des amitiés fortes.",
  },
  {
    id: "felr-3",
    prenom: "Aïcha",
    nom: "K.",
    fonction: "oratrice",
    photo: "/temoignages/felr/aicha.jpg",
    temoignage:
      "Ici, on ose, on teste et on apprend vite. L’énergie est communicative.",
  },
];

const MEMBRES_SOUTIEN: MembreSoutien[] = [
  {
    id: "soutien-1",
    prenom: "Marc",
    nom: "Dupont",
    titrePro: "Directeur",
    entreprise: "Studio Zénith",
    photo: "/temoignages/soutien/marc-dupont.jpg",
    temoignage:
      "Soutenir FELR est une évidence : impact local réel et professionnalisme.",
  },
  {
    id: "soutien-2",
    prenom: "Sarah",
    nom: "Nguyen",
    titrePro: "Responsable Communication",
    entreprise: "Océanik",
    photo: "/temoignages/soutien/sarah-nguyen.jpg",
    temoignage:
      "Des évènements inspirants qui créent des opportunités concrètes.",
  },
];

/* =========================================================
   PAGE
   ========================================================= */
export default function PageTemoignages() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7ed] to-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-4xl md:text-6xl font-serif tracking-wide"
        >
          Témoignages des membres, partenaires : leur mots, notre moteur
        </motion.h1>
      </section>

      {/* MOSAÏQUE DYNAMIQUE */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <BandeauMosaique images={MOSAIQUE} />
      </section>

      {/* MEMBRES FELR */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-3xl md:text-4xl font-serif text-center mb-8"
        >
          Membres FELR
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBRES_FELR.map((m) => (
            <CarteTemoignageFelr key={m.id} m={m} />
          ))}
        </div>
      </section>

      {/* MEMBRES SOUTIEN */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-3xl md:text-4xl font-serif text-center mb-8"
        >
          Membres soutien
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBRES_SOUTIEN.map((m) => (
            <CarteTemoignageSoutien key={m.id} m={m} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   COMPOSANTS
   ========================================================= */
function BandeauMosaique({ images }: { images: { src: string; alt: string }[] }) {
  // grille responsive + micro-animations
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
          {/* Liseré subtil au survol */}
          <div className="absolute inset-0 ring-0 ring-transparent group-hover:ring-2 group-hover:ring-black/10 rounded-2xl transition" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function EtiquetteRole({ role }: { role: MembreFelr["fonction"] }) {
  const label = role === "oratrice" ? "Oratrice" : "Actif·ve";
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs bg-white">
      {label}
    </span>
  );
}

function CarteTemoignageFelr({ m }: { m: MembreFelr }) {
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
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-lg">
            {m.prenom} {m.nom ?? ""}
          </h3>
          <EtiquetteRole role={m.fonction} />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">{m.temoignage}</p>
      </div>
    </motion.article>
  );
}

function CarteTemoignageSoutien({ m }: { m: MembreSoutien }) {
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
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {m.prenom} {m.nom ?? ""}
        </h3>
        <div className="text-sm text-gray-700">
          {m.titrePro} — <span className="font-medium">{m.entreprise}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">{m.temoignage}</p>
      </div>
    </motion.article>
  );
}
