
import { useNavigate } from "react-router-dom";

import CustomizeSection from "../components/customize/CustomizeSection";
import ProgressStepper from "../components/layout/ProgressStepper";

export default function CustomizePage({
  upload,
  customization,
  setGenerationRequest,
}) {
  const navigate = useNavigate();

  const handleGenerate = (preferences) => {
    if (!upload.file) return;

    setGenerationRequest({
      image: upload.file,
      preferences: { ...preferences },
    });

    navigate("/generation");
  };

  return (
    <>
      <ProgressStepper currentStep="customize" />

      <CustomizeSection
        previewUrl={upload.previewUrl}
        customization={customization}
        onBack={() => navigate("/upload")}
        onGenerate={handleGenerate}
      />
    </>
  );
}
