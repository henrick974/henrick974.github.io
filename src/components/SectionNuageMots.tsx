export function SectionNuageMots() {
  const clouds = [
    {
      titre: "Élan intérieur et posture",
      mots: ["épassement de soi", "Prise de parole", "Audace", "Changement", "Responsabilité"],
      colorClass: "cloud-word-gold",
      bg: "from-amber-50/80 via-white to-amber-100/60 border-amber-200",
    },
    {
      titre: "Croissance & évolution",
      mots: ["Apprentissage", "Évolution", "développement personnel", "développement professionnel"],
      colorClass: "cloud-word-blue",
      bg: "from-sky-50/80 via-white to-sky-100/60 border-sky-200",
    },
    {
      titre: "Ouverture & relation à l'autre",
      mots: ["S'ouvrir", "Ouverture aux autres", "Connexion", "Entraide", "Partage", "Partenariat", "réseau"],
      colorClass: "cloud-word-purple",
      bg: "from-purple-50/80 via-white to-purple-100/60 border-purple-200",
    },
    {
      titre: "Énergie & plaisir",
      mots: ["Fun", "Engagement", "Rencontres", "Moments partagés", "Joie simple", "Convivialité", "Légèreté", "Sourires", "Présence naturelle"],
      colorClass: "cloud-word-orange",
      bg: "from-orange-50/80 via-white to-orange-100/60 border-orange-200",
    },
  ];

  const positions = [
    { top: "30%", left: "10%" },
    { top: "50%", left: "30%" },
    { top: "60%", left: "30%" },
    { top: "15%", left: "20%" },
    { top: "68%", left: "44%" },
    { top: "32%", left: "48%" },
    { top: "54%", left: "54%" },
    { top: "42%", left: "46%" },
    { top: "60%", left: "52%" },
  ];

  const spreadWordsLocal = (words: string[]) =>
    words.map((text, i) => ({ text, ...positions[i % positions.length] }));

  return (
    <section id="section-nuage-mots" className="bg-linear-to-r from-amber-100/60 via-white to-rose-100/60 py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div className="text-center">
          <p className="text-4xl md:text-5xl font-serif leading-tight text-[#E2A429]">Notre ambition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {clouds.map((c) => {
            const items = spreadWordsLocal(c.mots);
            return (
              <div key={c.titre} className="flex flex-col items-center gap-3">
                <p className="text-lg font-semibold text-gray-800 text-center">{c.titre}</p>
                <div className={`relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full bg-linear-to-br ${c.bg} border shadow-sm overflow-hidden`}>
                  {items.map((mot, idx) => (
                    <span
                      key={`${c.titre}-${mot.text}-${idx}`}
                      className={`${c.colorClass} absolute text-xs md:text-sm font-semibold text-center max-w-[70%] leading-tight wrap-break-word`}
                      style={{
                        top: mot.top,
                        left: mot.left,
                        transform: "translate(-50%, -50%)",
                        animationDuration: `${6 + idx * 0.4}s`,
                        animationDelay: `${idx * 0.25}s`,
                      }}
                    >
                      {mot.text === "Developpement personnel"
                        ? "Developpement\npersonnel"
                        : mot.text === "Developpement professionnel"
                        ? "Developpement\nprofessionnel"
                        : mot.text}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
