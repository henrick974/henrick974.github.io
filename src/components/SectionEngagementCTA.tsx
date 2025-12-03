import Link from "next/link";

const CTA_LINKS = [
  {
    label: "Devenir membre",
    href: "https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-2025/FELR.htm?V9=DevenirMembre",
    description:
      "Intègre une communauté qui t'élève, te soutient et t'aide à développer ton leadership.",
  },
  {
    label: "Devenir partenaire",
    href: "https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-2025/FELR.htm?V9=DevenirPartenaire",
    description: "Contribue à révéler la leader intérieure de chaque femme entrepreneure.",
  },
  {
    label: "Devenir bénévole",
    href: "https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-2025/FELR.htm?V9=DevenirB%C3%A9n%C3%A9vole",
    description:
      "Apporte ton énergie, ton talent et participe activement à l'évolution d'un mouvement qui a du sens.",
  },
];

type SectionEngagementCTAProps = {
  className?: string;
};

export function SectionEngagementCTA({ className }: SectionEngagementCTAProps = {}) {
  const sectionClass = ["mx-auto max-w-5xl px-6 space-y-4", className].filter(Boolean).join(" ");

  return (
    <section className={sectionClass}>
      <div className="flex flex-wrap justify-center gap-4">
        {CTA_LINKS.map((cta) => (
          <Link
            key={cta.label}
            href={cta.href}
            className="group flex-1 min-w-[220px] max-w-xs flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-base font-semibold text-[#E2A429] group-hover:underline">
              {cta.label}
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{cta.description}</p>
          </Link>
        ))}
      </div>

      <p className="text-center text-base text-slate-800">
        Pour nous contacter :{" "}
        <a className="text-[#E2A429] font-semibold" href="mailto:felr.contact@gmail.com">
          felr.contact@gmail.com
        </a>
      </p>
    </section>
  );
}
