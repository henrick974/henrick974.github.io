import Image from "next/image";
import Link from "next/link";

export function MentionsLegalesSection() {
  return (
    <>
      <section
        id="mentions-legales"
        className="mx-auto max-w-7xl px-6 py-14 text-slate-900"
      >
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif text-[#E2A429] mb-6">
            Mentions légales & RGPD
          </h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm space-y-3">
              <h3 className="text-xl font-semibold text-slate-900">Telecharger le document</h3>
              <p className="text-base leading-relaxed text-slate-700">
                Retrouve l’intégralité des Mentions legales & RGPD dans un fichier dédié.
              </p>
              <a
                href="/mentions-legales-rgpd.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-900 transition"
              >
                Télécharger le document
              </a>
            </div>

            <Link
              href="https://www.facebook.com/groups/366121959389854"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v2h2.3l-.4 2.9h-1.9v7A10 10 0 0 0 22 12Z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900">Suivre notre Actualité</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 shadow-sm">
          <p className="text-sm md:text-base text-slate-800">
            Site conçu et développé par <span className="font-semibold">TigerSoft EI</span>.
          </p>
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
        </div>
      </section>
    </>
  );
}
