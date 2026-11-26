
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import ProgressStepper from "../components/layout/ProgressStepper";
import GenerationProgress from "../components/generation/GenerationProgress";
import GenerationError from "../components/generation/GenerationError";

export default function GenerationPage({
  generationRequest,
  generator,
}) {
  const navigate = useNavigate();

  const {
    status,
    progress,
    message,
    error,
    result,
    startGeneration,
    cancelGeneration,
    retryGeneration,
    resetGeneration,
  } = generator;

  // Start generation when the page mounts.
  useEffect(() => {
    startGeneration(generationRequest);

    return () => {
      cancelGeneration();
    };
  }, [
    generationRequest,
    startGeneration,
    cancelGeneration,
  ]);

  // Navigate to results after successful generation.
  useEffect(() => {
    if (status === "success" && result) {
      navigate("/results", { replace: true });
    }
  }, [status, result, navigate]);

  const handleBack = () => {
    resetGeneration();

    navigate("/customize");
  };

  return (
    <>
      <ProgressStepper currentStep="results" />

      <section className="mx-auto max-w-2xl pb-16 pt-4">

        {(status === "idle" ||
          status === "processing") && (
          <GenerationProgress
            progress={progress}
            message={message}
            onCancel={cancelGeneration}
          />
        )}

        {(status === "failed" ||
          status === "cancelled") && (
          <GenerationError
            status={status}
            error={error}
            onRetry={retryGeneration}
            onBack={handleBack}
          />
        )}

        {status === "success" && result && (
          <div
            role="status"
            className="rounded-2xl border border-gray-200
              bg-white p-10 text-center"
          >
            <CheckCircle2
              size={48}
              className="mx-auto text-green-600"
            />

            <h2 className="mt-5 text-2xl font-bold">
              Generation complete!
            </h2>

            <p className="mt-3 text-gray-500">
              Preparing your results...
            </p>
          </div>
        )}
      </section>
    </>
  );
}
