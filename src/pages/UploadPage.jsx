
import { useNavigate } from "react-router-dom";

import UploadSection from "../components/upload/UploadSection";
import ProgressStepper from "../components/layout/ProgressStepper";

export default function UploadPage({ upload }) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!upload.file || !upload.previewUrl) return;

    navigate("/customize");
  };

  return (
    <>
      <ProgressStepper currentStep="upload" />

      <UploadSection
        upload={upload}
        onContinue={handleContinue}
      />
    </>
  );
}
