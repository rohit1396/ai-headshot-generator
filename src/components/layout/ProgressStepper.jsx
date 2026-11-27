
import { Check } from "lucide-react";

const steps = [
  { id: "upload", label: "Upload" },
  { id: "customize", label: "Customize" },
  { id: "results", label: "Results" },
];

export default function ProgressStepper({ currentStep }) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <nav aria-label="Headshot creation progress">
      <ol className="mx-auto flex max-w-xl items-center justify-center py-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <li
              key={step.id}
              aria-current={isActive ? "step" : undefined}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-full text-sm font-semibold
                    ${
                      isCompleted
                        ? "bg-green-100 text-green-600"
                        : isActive
                          ? "bg-violet-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={18} />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`text-xs font-medium sm:text-sm ${
                    isActive
                      ? "text-violet-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`mx-3 mb-6 h-0.5 flex-1 ${
                    isCompleted
                      ? "bg-green-300"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
