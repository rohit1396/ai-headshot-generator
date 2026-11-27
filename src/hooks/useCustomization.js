
import { useState } from "react";
import { professions } from "../data/professions";

const initialPreferences = {
  profession: "linkedin",
  background: "gray",
  outfit: "business-casual",
  lighting: "soft-studio",
  aspectRatio: "1:1",
};

export default function useCustomization() {
  const [preferences, setPreferences] = useState(
    initialPreferences
  );

  const selectProfession = (professionId) => {
    const selected = professions.find(
      (item) => item.id === professionId
    );

    if (!selected) return;

    setPreferences((prev) => ({
      ...prev,
      profession: professionId,
      outfit: selected.defaultOutfit,
    }));
  };

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences({ ...initialPreferences });
  };

  return {
    preferences,
    selectProfession,
    updatePreference,
    resetPreferences,
  };
}
