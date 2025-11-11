"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaItem } from "@/app/evenements/donnees";

type Props = {
  annee: "2024" | "2025";
  items: MediaItem[];
};

export default function GalerieAnnee({ annee, items }: Props) {
  return (
    <div>
      {/* Titre d'année animé */}
      <motion.h2
        key={annee}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center text-3xl md:text-4xl font-serif mb-8"
      >
        {annee}
      </motion.h2>

      {/* Grille responsive */}
      <motion.div
        key={`grid-${annee}`} // re-animate on year change
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((m) => (
          <CarteMedia key={m.id} item={m} />
        ))}
      </motion.div>
    </div>
  );
}

function CarteMedia({ item }: { item: MediaItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl overflow-hidden bg-white border shadow-sm"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt ?? item.titre ?? "image"}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <video
            src={item.src}
            controls
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {(item.titre || item.texte) && (
        <div className="p-4">
          {item.titre && (
            <h3 className="font-semibold text-lg mb-1">{item.titre}</h3>
          )}
          {item.texte && (
            <p className="text-sm text-gray-600 leading-relaxed">{item.texte}</p>
          )}
        </div>
      )}
    </motion.article>
  );
}
