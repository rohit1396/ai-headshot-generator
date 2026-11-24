
import { Check } from "lucide-react";
import { backgrounds } from "../../data/customizationOptions";

export default function BackgroundSelector({
  selected,
  onSelect,
}) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">
        Background
      </legend>

      <div className="mt-4 grid grid-cols-5 gap-3">
        {backgrounds.map((background) => {
          const isSelected = selected === background.id;

          return (
            <label
              key={background.id}
              className="cursor-pointer text-center"
            >
              <input
                type="radio"
                name="background"
                value={background.id}
                checked={isSelected}
                onChange={() => onSelect(background.id)}
                className="peer sr-only"
              />

              <div
                style={{ backgroundColor: background.color }}
                className={`
                  flex aspect-square items-center
                  justify-center rounded-xl border-2
                  transition-all
                  peer-focus-visible:ring-2
                  peer-focus-visible:ring-violet-500
                  peer-focus-visible:ring-offset-2
                  ${
                    isSelected
                      ? "border-violet-600 ring-2 ring-violet-100"
                      : "border-gray-200"
                  }
                `}
              >
                {isSelected && (
                  <span className="rounded-full bg-violet-600 p-1 text-white">
                    <Check size={16} />
                  </span>
                )}
              </div>

              <span className="mt-2 block text-xs font-medium text-gray-600">
                {background.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
