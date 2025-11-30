"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import {
  MEMBRES_FELR,
  TemoignageMembreFelr,
} from "@/../../app/temoignages-data";

import Image from "next/image";


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

export function SectionCollectifFelr() {
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
