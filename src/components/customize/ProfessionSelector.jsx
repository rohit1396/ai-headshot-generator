
import { Check } from "lucide-react";
import { professions } from "../../data/professions";

export default function ProfessionSelector({
  selected,
  onSelect,
}) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold text-gray-900">
        Choose your profession
      </legend>

      <p className="mt-1 text-sm text-gray-500">
        Select the professional style that suits you.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {professions.map((profession) => {
          const isSelected = selected === profession.id;

          return (
            <label
              key={profession.id}
              className="relative cursor-pointer"
            >
              <input
                type="radio"
                name="profession"
                value={profession.id}
                checked={isSelected}
                onChange={() => onSelect(profession.id)}
                className="peer sr-only"
              />

              <div
                className={`
                  h-full overflow-hidden rounded-2xl
                  border-2 bg-white transition-all
                  peer-focus-visible:ring-2
                  peer-focus-visible:ring-violet-500
                  peer-focus-visible:ring-offset-2
                  ${
                    isSelected
                      ? "border-violet-600 ring-2 ring-violet-100"
                      : "border-gray-200 hover:border-violet-300"
                  }
                `}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={profession.image}
                    alt={`${profession.label} headshot example`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />

                  {isSelected && (
                    <div className="absolute right-3 top-3 rounded-full bg-violet-600 p-1.5 text-white">
                      <Check size={16} />
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-gray-900">
                    {profession.label}
                  </h3>

                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
