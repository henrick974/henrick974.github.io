"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroFondatrice() {
  return (
    /* HERO */
    <section
      id="section-hero"
      className="mx-auto max-w-7xl px-6 pt-16 md:pt-20 pb-10"
    >
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
          className="relative w-full aspect-4/5 overflow-hidden rounded-3xl bg-white shadow-md"
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
            En 2023, j&apos;ai créé FELR pour répondre à un besoin réel :
            offrir aux femmes entrepreneures un espace où parler vrai, apprendre,
            s’élever et oser prendre leur place. Un lieu où l’on grandit, où l’on
            se soutient, où l’on s’ouvre au monde et à soi-même.
          </p>

          <p className="text-lg leading-relaxed font-semibold">
            Mais laisse-moi être transparente :
            FELR n&apos;est pas fait pour tout le monde.
          </p>

          <div className="space-y-2">
            <p className="text-lg leading-relaxed">
              FELR s&apos;adresse aux femmes qui ont envie de :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-base">
              <li>
                Évoluer, même si cela demande de sortir de leur zone de confort,
              </li>
              <li>
                Travailler sur leur posture, leur prise de parole, leur présence,
              </li>
              <li>
                Apprendre, tester, expérimenter, se challenger,
              </li>
              <li>
                S&apos;engager dans une communauté vivante, bienveillante et exigeante,
              </li>
              <li>
                Tisser des liens réels, durables et puissants,
              </li>
              <li>
                Devenir, pas à pas, une leader affirmée.
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed">
            Si tu cherches un simple réseau où l&apos;on vient &quot;consommer&quot; un événement
            et repartir, alors FELR n&apos;est pas l&apos;endroit pour toi.
            Ici, on avance. On se transforme. On participe. On contribue. On joue collectif.
          </p>

          <p className="text-lg leading-relaxed">
            En deux ans, FELR est devenu un mouvement reconnu dans l&apos;écosystème
            entrepreneurial féminin de La Réunion. Un espace où les femmes
            entrepreneures s&apos;ouvrent, évoluent, osent et incarnent peu à peu leur leadership.
          </p>

          <p className="text-lg leading-relaxed">
            Si tu te sens appelée par cette énergie, si tu es prête à te développer
            personnellement et professionnellement, si tu veux faire partie d&apos;un
            collectif qui élève autant qu&apos;il soutient... Alors bienvenue chez FELR.
            Bienvenue chez toi.
          </p>

          <p className="text-base font-semibold">
            Par Patricia BOUCARD - Présidente &amp; Fondatrice
          </p>
        </motion.div>
      </div>
    </section>
  );
}
