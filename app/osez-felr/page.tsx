// app/ta-route/page.tsx (là où est déjà ton fichier)
import Image from "next/image";
import { MentionsLegalesSection } from "@/src/components/MentionsLegalesSection";
import { SectionEngagementCTA } from "@/src/components/SectionEngagementCTA";
// LINK vers le formulaire de base

//const SPHINX_URL =
//  "https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-JIE-2025/Quest.htm?ORIGINE_SAISIE=Iframe";

export default function Osez() {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full rounded-none bg-white/80 p-8 md:p-12 shadow-lg backdrop-blur-sm space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[#E2A429] text-center">
          Osez FELR
        </h2>

        <p className="text-lg md:text-xl font-semibold text-slate-900 text-center">
          Rejoins notre communauté. Prends ta place. Contribue.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-4">
            {[
              { src: "/temoignages/felr/temoignage01.jpg", alt: "Temoignage FELR 1" },
              { src: "/temoignages/felr/temoignage02.jpg", alt: "Temoignage FELR 2" },
            ].map(({ src, alt }) => (
              <div key={src} className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-slate-900">
            <h3 className="text-2xl font-semibold text-[#E2A429]">
              Merci à celles et ceux qui font vivre FELR
            </h3>
            <p>
              FELR ne serait pas ce qu'il est aujourd'hui sans toutes les personnes qui ont choisi de marcher à nos côtés.
              Depuis 2023, nous avançons ensemble, avec une vision commune : offrir aux femmes entrepreneures un espace où
              elles peuvent s'ouvrir, apprendre, évoluer et incarner un leadership qui leur ressemble.
            </p>
            <p className="font-semibold">Je tiens à remercier de tout cœur :</p>
            <div className="space-y-2">
              <p>
                - Les femmes entrepreneures qui nous font confiance et qui osent se révéler, prendre la parole, évoluer et
                contribuer à chaque rencontre.
              </p>
              <p>
                - Les bénévoles, intervenants et partenaires qui offrent leur temps, leur expertise, leur créativité et leur soutien.
              </p>
              <p>
                - Les soutiens de l'ombre, qui encouragent, conseillent, inspirent et croient en la vision depuis le début.
              </p>
              <p>
                - Toutes celles et ceux qui contribuent, de près ou de loin, à faire grandir FELR avec bienveillance, engagement et ambition.
              </p>
            </div>
            <p>FELR est née d'un besoin ? Mais FELR grandit grâce à vous.</p>
            <p>
              Merci d'incarner, avec moi, une vision d'un leadership féminin plus ouvert, plus humain et plus affirmé.
            </p>
            <p>
              Merci de faire de FELR un espace où l'on s'ouvre, où l'on expérimente, où l'on partage et où chaque femme peut
              devenir, pas à pas, celle qu'elle aspire à être.
            </p>
            <p className="pt-2 text-lg md:text-xl font-semibold text-slate-900 text-center">
              Ici, tu n'es pas un(e) simple participant(e).<br />
              Tu es un acteur/une actrice du changement.
            </p>
            <p className="text-base md:text-lg font-semibold text-slate-800 text-center">
              Par <span className="font-bold">Patricia BOUCARD</span> - Présidente &amp; Fondatrice
            </p>
          </div>
          </div>

        <SectionEngagementCTA />
      </div>
      <MentionsLegalesSection />
    </main>
  );
}
