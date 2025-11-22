"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

// Hook utilisé pour animer les chiffres
function useCounter(n: number, duration = 1200) {
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
   SECTIONS CHIFFRES
   ========================================================= */

export function SectionChiffres({ data }: { data: { label: string; valeur: number }[] }) {
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

export function SectionChiffresFusion({
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
