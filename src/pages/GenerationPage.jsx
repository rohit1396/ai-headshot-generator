
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

import ProgressStepper from "../components/layout/ProgressStepper";

export default function GenerationPage({
  generationRequest,
}) {
  const navigate = useNavigate();

  return (
    <>
      <ProgressStepper currentStep="results" />

      <section className="mx-auto max-w-xl py-16 text-center">
        <Sparkles
          size={40}
          className="mx-auto text-violet-600"
        />

        <h1 className="mt-5 text-3xl font-bold">
          Ready to generate your headshot
        </h1>

        <p className="mt-3 text-gray-500">
          Mock AI generation is coming in Step 4.
        </p>

        <pre className="mt-6 overflow-auto rounded-xl bg-gray-100 p-5 text-left text-sm">
          {JSON.stringify(
            generationRequest.preferences,
            null,
            2
          )}
        </pre>

        <button
          type="button"
          onClick={() => navigate("/customize")}
          className="mx-auto mt-6 flex items-center gap-2 font-medium text-violet-600"
        >
          <ArrowLeft size={16} />
          Back to customization
        </button>
      </section>
    </>
  );
}
