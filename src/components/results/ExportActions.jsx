
import {
    Download,
    ExternalLink,
    Copy,
    LoaderCircle,
  } from "lucide-react";
  
  import useImageExport from "../../hooks/useImageExport";
  import { getAbsoluteImageUrl } from "../../utils/imageExport";
  
  export default function ExportActions({ result }) {
    const {
      isDownloading,
      isCopying,
      handleDownload,
      handleCopyUrl,
    } = useImageExport();
  
    const { imageUrl, preferences, id } = result;
  
    const filename = `headshot-${preferences.profession}-${id.slice(0, 8)}`;
  
    const absoluteUrl = getAbsoluteImageUrl(imageUrl);
  
    return (
      <div className="space-y-3">
        {/* Download */}
        <button
          type="button"
          disabled={isDownloading}
          onClick={() =>
            handleDownload(imageUrl, filename)
          }
          className="flex w-full items-center justify-center
            gap-2 rounded-xl bg-violet-600 px-5 py-3.5
            font-semibold text-white transition
            hover:bg-violet-700 disabled:cursor-not-allowed
            disabled:opacity-60"
        >
          {isDownloading ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Download size={18} />
          )}
  
          {isDownloading
            ? "Downloading..."
            : "Download headshot"}
        </button>
  
        <div className="grid grid-cols-2 gap-3">
          {/* Open in new tab */}
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2
              rounded-xl border border-gray-200 px-3 py-3
              text-sm font-medium text-gray-700
              transition hover:bg-gray-50"
          >
            <ExternalLink size={16} />
            Open image
          </a>
  
          {/* Copy URL */}
          <button
            type="button"
            disabled={isCopying}
            onClick={() => handleCopyUrl(imageUrl)}
            className="flex items-center justify-center gap-2
              rounded-xl border border-gray-200 px-3 py-3
              text-sm font-medium text-gray-700
              transition hover:bg-gray-50
              disabled:opacity-60"
          >
            {isCopying ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Copy size={16} />
            )}
  
            {isCopying ? "Copying..." : "Copy URL"}
          </button>
        </div>
      </div>
    );
  }
  