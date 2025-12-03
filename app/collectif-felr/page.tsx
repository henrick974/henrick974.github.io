
import { SectionWhiteSilver } from "@/src/components/SectionWhiteSilver";
import { SectionCollectifFelr } from "@/src/components/SectionCollectifFelr";
import { MentionsLegalesSection } from "@/src/components/MentionsLegalesSection";

export default function Collectif() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SectionWhiteSilver />
      <SectionCollectifFelr />
      <section className="mx-auto max-w-5xl px-6 py-12 space-y-6">
        <p className="text-center text-base font-semibold text-slate-800">
          Vidéos réalisées par Abdoul LOKHAT pour FELR
        </p>
        <div className="space-y-8">
          {[
            { src: "/Videolongue3.mp4", label: "Vidéolongue 3" },
            { src: "/VIDlongue2.mp4", label: "Vidéolongue 2" },
            { src: "/Videolongue.mp4", label: "Vidéolongue 1" },
          ].map((video) => (
            <div
              key={video.src}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow"
            >
              <video
                src={video.src}
                controls
                preload="metadata"
                className="w-full h-full"
                aria-label={`${video.label} - Vidéos réalisées par Abdoul LOKHAT pour FELR`}
              />
            </div>
          ))}
        </div>
      </section>
      <MentionsLegalesSection />
    </main>
  )
}
