
import {
    AlertCircle,
    CircleX,
    RefreshCw,
    ArrowLeft,
  } from "lucide-react";
  
  export default function GenerationError({
    status,
    error,
    onRetry,
    onBack,
  }) {
    const isCancelled = status === "cancelled";
  
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center sm:p-12">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            isCancelled
              ? "bg-gray-100 text-gray-500"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isCancelled ? (
            <CircleX size={36} />
          ) : (
            <AlertCircle size={36} />
          )}
        </div>
  
        <h1 className="mt-6 text-2xl font-bold">
          {isCancelled
            ? "Generation cancelled"
            : "Something went wrong"}
        </h1>
  
        <p
          role={isCancelled ? "status" : "alert"}
          className="mt-3 text-sm leading-6 text-gray-500"
        >
          {isCancelled
            ? "You cancelled the generation process. You can retry whenever you're ready."
            : error || "Unable to generate your headshot."}
        </p>
  
        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          Your uploaded selfie and customization
          preferences have been preserved.
        </div>
  
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 font-semibold text-white transition hover:bg-violet-700"
        >
          <RefreshCw size={18} />
          Retry generation
        </button>
  
        <button
          type="button"
          onClick={onBack}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Back to customization
        </button>
      </div>
    );
  }
  