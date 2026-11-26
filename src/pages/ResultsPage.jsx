
import { useNavigate } from "react-router-dom";

import ProgressStepper from "../components/layout/ProgressStepper";
import HeadshotResult from "../components/results/HeadshotResult";

export default function ResultsPage({
  upload,
  customization,
  generator,
  generationRequest,
  setGenerationRequest,
}) {
  const navigate = useNavigate();

  const handleRegenerate = () => {
    if (!generationRequest) return;

    const nextRequest = {
      image: generationRequest.image,
      preferences: {
        ...generationRequest.preferences,
      },
    };

    generator.resetGeneration();

    setGenerationRequest(nextRequest);

    navigate("/generation", { replace: true });
  };

  const handleEditPreferences = () => {
    navigate("/customize");
  };

  const handleStartOver = () => {
    generator.resetGeneration();

    upload.removeImage();

    customization.resetPreferences();

    setGenerationRequest(null);

    navigate("/", { replace: true });
  };

  return (
    <>
      <ProgressStepper currentStep="results" />

      <HeadshotResult
        originalImage={upload.previewUrl}
        result={generator.result}
        onRegenerate={handleRegenerate}
        onEditPreferences={handleEditPreferences}
        onStartOver={handleStartOver}
      />
    </>
  );
}
