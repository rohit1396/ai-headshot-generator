
import { professions } from "../../data/professions";

import {
  backgrounds,
  outfits,
  lightingOptions,
  aspectRatios,
} from "../../data/customizationOptions";

function getLabel(options, id) {
  return options.find((option) => option.id === id)?.label
    || id;
}

export default function ResultDetails({ result }) {
  const { preferences, createdAt, isMock } = result;

  const details = [
    {
      label: "Profession",
      value: getLabel(
        professions,
        preferences.profession
      ),
    },
    {
      label: "Background",
      value: getLabel(
        backgrounds,
        preferences.background
      ),
    },
    {
      label: "Outfit",
      value: getLabel(outfits, preferences.outfit),
    },
    {
      label: "Lighting",
      value: getLabel(
        lightingOptions,
        preferences.lighting
      ),
    },
    {
      label: "Selected format",
      value: `${preferences.aspectRatio} — ${getLabel(
        aspectRatios,
        preferences.aspectRatio
      )}`,
    },
    {
      label: "Created at",
      value: new Date(createdAt).toLocaleString(),
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold">
        Headshot details
      </h2>

      <dl className="mt-5 space-y-4">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between
              gap-4 text-sm"
          >
            <dt className="text-gray-500">
              {item.label}
            </dt>

            <dd className="text-right font-medium
              text-gray-900">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {isMock && (
        <div className="mt-5 rounded-xl bg-amber-50
          p-3 text-xs leading-5 text-amber-700">
          Demo result. These are your requested preferences,
          not verified properties of the sample image.
        </div>
      )}
    </div>
  );
}
