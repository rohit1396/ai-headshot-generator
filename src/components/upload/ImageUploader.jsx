
import { useDropzone } from "react-dropzone";
import { CloudUpload, ImagePlus } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ImageUploader({
  onSelect,
  onError,
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    open,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },

    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    multiple: false,
    noClick: true,
    noKeyboard: true,

    onDropAccepted: ([file]) => {
      onSelect(file);
    },

    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];

      const messages = {
        "file-too-large":
          "Image size must be less than 10 MB.",

        "file-invalid-type":
          "Only JPG, PNG and WEBP images are allowed.",

        "too-many-files":
          "Please upload only one image.",
      };

      onError(
        messages[error?.code] ||
          "Unable to select this image."
      );
    },
  });

  const borderStyle = isDragReject
    ? "border-red-500 bg-red-50"
    : isDragActive
      ? "border-violet-600 bg-violet-50"
      : "border-gray-300 hover:border-violet-500";

  return (
    <div
      {...getRootProps({
        onClick: open,
      })}
      className={`
        flex cursor-pointer flex-col items-center
        justify-center rounded-2xl border-2
        border-dashed px-6 py-12 text-center
        transition-colors sm:py-16
        ${borderStyle}
      `}
    >
      <input
        {...getInputProps({
          "aria-label": "Upload your selfie",
        })}
      />

      <div className="mb-5 rounded-2xl bg-violet-100 p-4">
        <CloudUpload
          size={32}
          className="text-violet-600"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {isDragReject
          ? "Unsupported image"
          : isDragActive
            ? "Drop your image here"
            : "Drag and drop your photo here"}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        or browse files from your device
      </p>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        className="mt-6 inline-flex items-center gap-2
          rounded-xl bg-violet-600 px-5 py-3
          text-sm font-medium text-white
          transition hover:bg-violet-700
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-violet-600"
      >
        <ImagePlus size={18} />
        Choose image
      </button>

      <p className="mt-5 text-xs text-gray-400">
        JPG, PNG, WEBP · Maximum 10 MB
      </p>
    </div>
  );
}
