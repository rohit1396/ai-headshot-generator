
import {
    Sparkles,
    CheckCircle2,
    Circle,
    LoaderCircle,
    X,
  } from "lucide-react";
  
  import { generationStages } from "../../data/generationStages";
  
  export default function GenerationProgress({
    progress,
    message,
    onCancel,
  }) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10">
        <div className="text-center">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
            <div className="absolute inset-0 animate-ping rounded-full bg-violet-200 opacity-40 motion-reduce:animate-none" />
  
            <Sparkles
              size={36}
              className="relative text-violet-600"
            />
          </div>
  
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
            Creating your professional headshot
          </h1>
  
          <p className="mt-3 text-sm text-gray-500">
            Please wait while we prepare your portrait.
          </p>
        </div>
  
        {/* Progress bar */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              Generation progress
            </span>
  
            <span className="font-semibold tabular-nums text-violet-600">
              {progress}%
            </span>
          </div>
  
          <div
            role="progressbar"
            aria-label="Headshot generation progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-3 overflow-hidden rounded-full bg-gray-100"
          >
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-violet-600 transition-all duration-200 ease-linear"
            />
          </div>
  
          <p
            role="status"
            className="mt-3 text-sm text-gray-500"
          >
            {message}
          </p>
        </div>
  
        {/* Generation stages */}
        <div className="mt-8 space-y-5">
          {generationStages.map((stage, index) => {
            const previousProgress =
              generationStages[index - 1]?.progress ?? 0;
  
            const isCompleted = progress >= stage.progress;
  
            const isActive =
              progress >= previousProgress &&
              progress < stage.progress;
  
            return (
              <div
                key={stage.id}
                className="flex items-center gap-3"
              >
                {isCompleted ? (
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-600"
                  />
                ) : isActive ? (
                  <LoaderCircle
                    size={20}
                    className="shrink-0 animate-spin text-violet-600 motion-reduce:animate-none"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="shrink-0 text-gray-300"
                  />
                )}
  
                <span
                  className={`text-sm ${
                    isActive
                      ? "font-medium text-violet-600"
                      : isCompleted
                        ? "text-gray-700"
                        : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
  
        <button
          type="button"
          onClick={onCancel}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <X size={17} />
          Cancel generation
        </button>
  
        <p className="mt-4 text-center text-xs text-gray-400">
          Demo mode — simulated generation
        </p>
      </div>
    );
  }
  