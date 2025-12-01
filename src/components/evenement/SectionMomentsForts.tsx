import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

import { MediaPreview, type Media } from "./media";

type SectionMomentsFortsProps = {
  items: Media[];
  titre: string;
  currentAutoMediaId: string | null;
  headerAddon?: ReactNode;
};

export function SectionMomentsForts({
  items,
  titre,
  currentAutoMediaId,
  headerAddon,
}: SectionMomentsFortsProps) {
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

        <div className="hidden md:block">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white border shadow px-3 py-2"
            aria-label="Précédent"
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
