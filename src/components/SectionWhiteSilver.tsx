"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MEMBRES_SOUTIEN,
  TemoignageMembreSoutien,
} from "@/../../app/temoignages-data";

export function SectionWhiteSilver() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-14" id="section-white-silver">
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#E2A429]">2025 : Événement White & Silver</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10 mb-8 text-gray-800 text-left items-start">
        <div className="space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src="/temoignages/felr/celebrationwhite.jpg"
              alt="Celebration White & Silver"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain bg-white"
              priority
            />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-lg">Une journée White & Silver pour célébrer l'audace féminine</p>
          <p>Le 25 novembre 2025, FELR consacre une journée White & Silver, un moment lumineux où l'on célèbre l'entrepreneuriat, l'audace et la résilience des femmes entrepreneures de La Réunion.</p>
          <div className="space-y-2">
            <p className="font-semibold">Au programme :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Un space vibrant dédié aux initiatives féminines locales,</li>
              <li>Des parcours inspirants mis en lumière,</li>
              <li>Un regard affirmé sur la puissance de l'entrepreneuriat au féminin,</li>
              <li>Et une soirée de célébration pour clore l'année dans l'élégance et la cohésion.</li>
            </ul>
          </div>
          <p>Cette journée incarne l'essence même de FELR : révéler, valoriser et faire rayonner les femmes qui transforment notre territoire.</p>
          <p>Un rendez-vous signature, fort, lumineux et profondément humain à aux couleurs White & Silver.</p>
        </div>
      </div>

      <div className="relative" id="section-membres-soutien">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3">
          {MEMBRES_SOUTIEN.map((m, idx) => (
            <div key={m.id} data-partner-card={`partner-${idx}`}>
              <CarteTemoignageSoutien m={m} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarteTemoignageSoutien({ m }: { m: TemoignageMembreSoutien }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden border bg-white shadow-sm snap-start shrink-0 w-[420px]"
    >
      <div className="relative h-80 bg-white">
        <Image
          src={m.photo}
          alt={`${m.prenom} ${m.nom ?? ""}`}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-contain"
                  priority
                />
      </div>
    </motion.article>
  );
}
