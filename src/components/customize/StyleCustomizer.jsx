
  import {
    outfits,
    lightingOptions,
  } from "../../data/customizationOptions";
  
  function SelectField({ id, label, value, options, onChange }) {
    return (
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
  
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-gray-200
            bg-white px-4 py-3 text-sm outline-none
            focus:border-violet-500 focus:ring-2
            focus:ring-violet-100"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default function StyleCustomizer({
    preferences,
    onChange,
  }) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="outfit"
            label="Outfit"
            value={preferences.outfit}
            options={outfits}
            onChange={(value) => onChange("outfit", value)}
          />
  
          <SelectField
            id="lighting"
            label="Lighting"
            value={preferences.lighting}
            options={lightingOptions}
            onChange={(value) => onChange("lighting", value)}
          />
        </div>
  
      </div>
    );
  }
  
