import Image from "next/image";
import Link from "next/link";

export function MentionsLegalesSection() {
  return (
    <footer className="bg-white/50 text-slate-900" id="mentions-legales">
      <div className="mx-auto max-w-7xl px-6 py-16 space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif text-[#E2A429] mb-4">
            Suivre notre actualité
          </h2>
          <p className="text-base md:text-lg text-slate-700 mb-6">
            Rejoins la communauté FELR pour suivre les prochains ateliers, conférences et
            rencontres publiques.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://www.facebook.com/groups/366121959389854"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v2h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12Z" />
              </svg>
              Rejoindre le groupe Facebook
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Ce site a été conçu par</p>
            <p className="text-lg font-semibold text-slate-900">TigerSoft EI</p>
            <p className="text-sm text-slate-600">
              Design, intégration et accompagnement technique.
            </p>
          </div>
          <div className="relative h-12 w-40">
            <Image
              src="/temoignages/felr/tigersoft.PNG"
              alt="Logo TigerSoft EI"
              fill
              sizes="160px"
              className="object-contain"
              priority
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">Mentions légales & RGPD</p>
              <h3 className="text-2xl md:text-3xl font-serif text-[#E2A429]">
                Consulte nos documents officiels
              </h3>
            </div>
            <p className="text-base leading-relaxed text-slate-700">
              Retrouve l’intégralité des Informations légales, statuts associatifs et engagements RGPD
              dans un document unique.
            </p>
            <a
              href="/mentions-legales-rgpd.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-gray-900"
            >
              Télécharger les mentions légales & RGPD
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
