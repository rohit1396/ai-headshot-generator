import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

import BackgroundSelector from "./BackgroundSelector";
import ProfessionSelector from "./ProfessionSelector";
import StyleCustomizer from "./StyleCustomizer";
import { backgrounds, lightingOptions, outfits } from "../../data/customizationOptions";
import { professions } from "../../data/professions";

export default function CustomizeSection({ customization, onBack, onGenerate }) {
  const {
    preferences,
    selectProfession,
    updatePreference,
    resetPreferences,
  } = customization;

  const getLabel = (options, id) =>
    options.find((option) => option.id === id)?.label || id;

  const summary = [
    getLabel(professions, preferences.profession),
    `${getLabel(backgrounds, preferences.background)} background`,
    getLabel(outfits, preferences.outfit),
    getLabel(lightingOptions, preferences.lighting),
  ];

  return (
    <section className="mx-auto max-w-3xl pb-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Customize your headshot
        </h1>
        <p className="mt-3 text-gray-500">
          Choose a professional style that represents you.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <ProfessionSelector
          selected={preferences.profession}
          onSelect={selectProfession}
        />

        <hr className="my-8 border-gray-200" />

        <BackgroundSelector
          selected={preferences.background}
          onSelect={(value) => updatePreference("background", value)}
        />

        <hr className="my-8 border-gray-200" />

        <StyleCustomizer
          preferences={preferences}
          onChange={updatePreference}
        />

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={resetPreferences}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-violet-600"
          >
            <RotateCcw size={16} />
            Reset preferences
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Your selected preferences
          </h2>
          <p className="mt-1 text-sm text-gray-500">{summary.join(" · ")}</p>
        </div>

        <button
          type="button"
          onClick={() => onGenerate({ ...preferences })}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3.5 font-semibold text-white transition hover:bg-black"
        >
          <Sparkles size={18} />
          Generate my headshot
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          Interactive prototype with illustrative profession images.
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-violet-600"
      >
        <ArrowLeft size={16} />
        Back to upload
      </button>
    </section>
  );
}
