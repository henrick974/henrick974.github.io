"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import {
  MEMBRES_FELR,
  MEMBRES_SOUTIEN,
  MOSAIQUE_TEMOIGNAGES,
  TemoignageMembreFelr,
  TemoignageMembreSoutien,
  TemoignageMosaiqueItem,
} from "../temoignages-data";

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
          Temoignages des membres et partenaires
        </motion.h1>
      </section>

      {/* MOSAIQUE DYNAMIQUE */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <BandeauMosaique images={MOSAIQUE_TEMOIGNAGES} />
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

function BandeauMosaique({ images }: { images: TemoignageMosaiqueItem[] }) {
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

function EtiquetteRole({ role }: { role: TemoignageMembreFelr["fonction"] }) {
  const label = role === "oratrice" ? "Oratrice" : "Actif ou active";
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs bg-white">
      {label}
    </span>
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
        <p className="text-sm text-gray-600 leading-relaxed">{m.temoignage}</p>
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
