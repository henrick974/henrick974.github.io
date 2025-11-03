"use client";
import { useState } from "react";

type Tab = "partenaire" | "membre";

export default function SlidingForms() {
  const [tab, setTab] = useState<Tab>("partenaire");
  const isPartenaire = tab === "partenaire";

  return (
    <section className="w-full max-w-xl mx-auto">
      <h2 className="mb-3 text-3xl font-script">Devenez</h2>

      {/* --- Onglets --- */}
      <div
        role="tablist"
        aria-label="Choisir un formulaire"
        className="relative grid grid-cols-2 p-1 rounded-xl bg-neutral-800/40 border border-neutral-700"
      >
        {/* Indicateur qui glisse */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)]
                      rounded-lg bg-amber-400/20 border border-amber-400
                      transition-transform duration-300 will-change-transform
                      ${isPartenaire ? "translate-x-0" : "translate-x-full"}`}
        />
        <button
          type="button"
          role="tab"
          id="tab-partenaire"
          aria-controls="panel-partenaire"
          aria-selected={isPartenaire}
          className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors
                     ${isPartenaire ? "text-amber-300" : "text-neutral-300 hover:text-white"}`}
          onClick={() => setTab("partenaire")}
        >
          Partenaire
        </button>
        <button
          type="button"
          role="tab"
          id="tab-membre"
          aria-controls="panel-membre"
          aria-selected={!isPartenaire}
          className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors
                     ${!isPartenaire ? "text-amber-300" : "text-neutral-300 hover:text-white"}`}
          onClick={() => setTab("membre")}
        >
          Membre
        </button>
      </div>

      {/* --- Conteneur des formulaires (slide) --- */}
      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
        <div
          className={`flex w-[200%] motion-safe:transition-transform motion-safe:duration-500
                      ${isPartenaire ? "translate-x-0" : "-translate-x-1/2"}`}
        >
          {/* Form Partenaire */}
          <div
            role="tabpanel"
            id="panel-partenaire"
            aria-labelledby="tab-partenaire"
            aria-hidden={!isPartenaire}
            className="w-1/2"
          >
            <form className="p-6 space-y-4">
              <div>
                <label htmlFor="p_org" className="block text-sm mb-1">Organisation</label>
                <input id="p_org" name="organisation"
                  className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                             outline-none focus:border-amber-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p_name" className="block text-sm mb-1">Nom complet</label>
                  <input id="p_name" name="name"
                    className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                               outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label htmlFor="p_email" className="block text-sm mb-1">Email</label>
                  <input id="p_email" type="email" name="email"
                    className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                               outline-none focus:border-amber-400" />
                </div>
              </div>
              <div>
                <label htmlFor="p_msg" className="block text-sm mb-1">Message</label>
                <textarea id="p_msg" name="message" rows={4}
                  className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                             outline-none focus:border-amber-400" />
              </div>
              <button
                className="rounded-lg px-4 py-2 border border-amber-400 text-amber-300
                           hover:bg-amber-400 hover:text-black transition">
                Devenir partenaire
              </button>
            </form>
          </div>

          {/* Form Membre */}
          <div
            role="tabpanel"
            id="panel-membre"
            aria-labelledby="tab-membre"
            aria-hidden={isPartenaire}
            className="w-1/2"
          >
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="m_first" className="block text-sm mb-1">Prénom</label>
                  <input id="m_first" name="firstname"
                    className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                               outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label htmlFor="m_last" className="block text-sm mb-1">Nom</label>
                  <input id="m_last" name="lastname"
                    className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                               outline-none focus:border-amber-400" />
                </div>
              </div>
              <div>
                <label htmlFor="m_phone" className="block text-sm mb-1">Téléphone</label>
                <input id="m_phone" name="phone"
                  className="w-full rounded-lg border border-neutral-700 bg-transparent p-2
                             outline-none focus:border-amber-400" />
              </div>
              <button
                className="rounded-lg px-4 py-2 border border-amber-400 text-amber-300
                           hover:bg-amber-400 hover:text-black transition">
                Devenir membre
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
