
import { SectionWhiteSilver } from "@/src/components/SectionWhiteSilver";
import { SectionCollectifFelr } from "@/src/components/SectionCollectifFelr";
import { MentionsLegalesSection } from "@/src/components/MentionsLegalesSection";

export default function Collectif() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SectionWhiteSilver />
      <SectionCollectifFelr />
      <MentionsLegalesSection />
    </main>
  )
}
