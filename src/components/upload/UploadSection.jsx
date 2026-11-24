
import {
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
  } from "lucide-react";
  
  import ImageUploader from "./ImageUploader";
  import ImagePreview from "./ImagePreview";
  
  const tips = [
    "Use a clear, front-facing photo.",
    "Ensure good lighting and a visible face.",
    "Avoid sunglasses and heavy filters.",
    "Use an individual photo, not a group photo.",
  ];
  
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];
  
  export default function UploadSection({ upload, onContinue }) {
    const {
      file,
      previewUrl,
      error,
      setError,
      selectImage,
      removeImage,
    } = upload;
  
    const handleSelect = (selectedFile) => {
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only JPG, PNG and WEBP images are allowed.");
        return;
      }
  
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10 MB.");
        return;
      }
  
      if (selectedFile.size === 0) {
        setError("The selected image is empty.");
        return;
      }
  
      selectImage(selectedFile);
    };
  
    return (
      <section className="mx-auto max-w-2xl py-12 sm:py-16">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold text-violet-600">
            STEP 1 OF 3
          </span>
  
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Upload your selfie
          </h1>
  
          <p className="mt-3 text-gray-500">
            Start with a clear photo of yourself.
            We'll take care of the rest.
          </p>
        </div>
  
        {file && previewUrl ? (
          <ImagePreview
            file={file}
            previewUrl={previewUrl}
            onRemove={removeImage}
            onReplace={handleSelect}
          />
        ) : (
          <ImageUploader
            onSelect={handleSelect}
            onError={setError}
          />
        )}
  
        {error && (
          <div
            role="alert"
            className="mt-4 flex items-center gap-2
              rounded-xl border border-red-200
              bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="shrink-0" />
            {error}
          </div>
        )}
  
        <div className="mt-6 rounded-2xl bg-gray-100 p-5">
          <h3 className="font-semibold">
            Tips for the best results
          </h3>
  
          <ul className="mt-4 space-y-3">
            {tips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 text-sm text-gray-600"
              >
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-green-600"
                />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          disabled={!file || !previewUrl}
          onClick={onContinue}
          className="mt-6 flex w-full items-center justify-center gap-2
            rounded-xl bg-violet-600 px-6 py-4 font-semibold
            text-white transition hover:bg-violet-700
            disabled:cursor-not-allowed disabled:opacity-40"
        >
          Customize your headshot
          <ArrowRight size={18} />
        </button>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck size={15} />
          Your photo stays in your browser.
        </p>
      </section>
    );
  }
  
