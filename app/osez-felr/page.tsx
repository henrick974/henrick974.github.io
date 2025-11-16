// app/ta-route/page.tsx (là où est déjà ton fichier)

const SPHINX_URL =
  "https://s2.sphinxonline.net/SurveyServer/s/OptiSurvey/FELR-JIE-2025/Quest.htm?ORIGINE_SAISIE=Iframe";

export default function Page() {
  return (
    <div className="flex-1">
      <iframe
        src={SPHINX_URL}
        title="Formulaire d'inscription FELR"
        className="w-full h-[90vh] border-0 rounded-xl bg-white"
        loading="lazy"
      />
    </div>
  );
}

