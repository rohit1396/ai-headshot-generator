
import { useRef } from "react";
import {
  Trash2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

import { formatFileSize } from "../../utils/formatFileSize";

export default function ImagePreview({
  file,
  previewUrl,
  hasError,
  onRemove,
  onReplace,
}) {
  const inputRef = useRef(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex justify-center overflow-hidden rounded-xl bg-gray-100">
        <img
          src={previewUrl}
          alt="Preview of your uploaded selfie"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="max-h-[420px] w-full rounded-xl object-contain"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <CheckCircle2
          size={22}
          className="shrink-0 text-green-600"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {file.name}
          </p>

          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </p>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
          Ready
        </span>
      </div>

      <input
        ref={inputRef}
        id="selfie-replace"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        aria-label="Replace uploaded selfie"
        aria-describedby={hasError ? "upload-error" : undefined}
        onChange={(event) => {
          const newFile = event.target.files?.[0];

          if (newFile) onReplace(newFile);

          event.target.value = "";
        }}
      />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2
            rounded-xl border border-gray-200
            px-4 py-3 text-sm font-medium
            hover:bg-gray-50"
        >
          <RefreshCw size={16} />
          Replace
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center gap-2
            rounded-xl border border-red-200
            px-4 py-3 text-sm font-medium
            text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}
