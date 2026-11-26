
import {
    ArrowLeft,
    RefreshCw,
    RotateCcw,
    CheckCircle2,
  } from "lucide-react";
  
  import ImageComparison from "./ImageComparison";
  import ExportActions from "./ExportActions";
  import ResultDetails from "./ResultDetails";
  
  export default function HeadshotResult({
    originalImage,
    result,
    onRegenerate,
    onEditPreferences,
    onStartOver,
  }) {
    return (
      <section className="mx-auto max-w-6xl pb-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16
            items-center justify-center rounded-full
            bg-green-100 text-green-600">
            <CheckCircle2 size={32} />
          </div>
  
          <h1 className="mt-5 text-3xl font-bold
            tracking-tight sm:text-4xl">
            Your headshot is ready!
          </h1>
  
          <p className="mt-3 text-gray-500">
            Compare, download, and explore your result.
          </p>
        </div>
  
        <div className="grid items-start gap-8
          lg:grid-cols-[minmax(0,1fr)_360px]">
  
          {/* Image comparison */}
          <div className="rounded-2xl border
            border-gray-200 bg-white p-4 sm:p-6">
  
            <ImageComparison
              beforeImage={originalImage}
              afterImage={result.imageUrl}
              aspectRatio={result.preferences.aspectRatio}
            />
  
            {result.isMock && (
              <p className="mt-4 text-center
                text-xs text-gray-500">
                This comparison uses a sample headshot,
                not a transformation of your selfie.
              </p>
            )}
          </div>
  
          {/* Details and export actions */}
          <aside className="rounded-2xl border
            border-gray-200 bg-white p-6
            lg:sticky lg:top-6">
  
            <ResultDetails result={result} />
  
            <hr className="my-6 border-gray-200" />
  
            <ExportActions result={result} />
  
            <hr className="my-6 border-gray-200" />
  
            <button
              type="button"
              onClick={onRegenerate}
              className="flex w-full items-center
                justify-center gap-2 rounded-xl border
                border-violet-200 px-4 py-3 text-sm
                font-medium text-violet-600
                hover:bg-violet-50"
            >
              <RefreshCw size={17} />
              Regenerate headshot
            </button>
  
            <p className="mt-2 text-center
              text-xs text-gray-400">
              Generate again using the same preferences.
            </p>
          </aside>
        </div>
  
        {/* Navigation actions */}
        <div className="mt-8 flex flex-wrap
          items-center justify-between gap-4">
  
          <button
            type="button"
            onClick={onEditPreferences}
            className="flex items-center gap-2 text-sm
              font-medium text-gray-600
              hover:text-violet-600"
          >
            <ArrowLeft size={17} />
            Edit preferences
          </button>
  
          <button
            type="button"
            onClick={onStartOver}
            className="flex items-center gap-2 text-sm
              font-medium text-gray-600
              hover:text-red-600"
          >
            <RotateCcw size={17} />
            Start over
          </button>
        </div>
      </section>
    );
  }
  