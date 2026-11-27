
import { useState, useRef } from "react";
import { toast } from "sonner";

import {
  downloadImage,
  copyImageUrl,
} from "../utils/imageExport";

export default function useImageExport() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const downloadingRef = useRef(false);
  const copyingRef = useRef(false);

  const handleDownload = async (imageUrl, filename) => {
    if (downloadingRef.current) return;

    downloadingRef.current = true;
    setIsDownloading(true);

    try {
      await downloadImage(imageUrl, filename);

      toast.success("Image download started!");
    } catch (error) {
      toast.error(
        error.message || "Failed to download image."
      );
    } finally {
      downloadingRef.current = false;
      setIsDownloading(false);
    }
  };

  const handleCopyUrl = async (imageUrl) => {
    if (copyingRef.current) return;

    copyingRef.current = true;
    setIsCopying(true);

    try {
      await copyImageUrl(imageUrl);

      toast.success("Image URL copied to clipboard!");
    } catch (error) {
      toast.error(
        error.message || "Failed to copy image URL."
      );
    } finally {
      copyingRef.current = false;
      setIsCopying(false);
    }
  };

  return {
    isDownloading,
    isCopying,
    handleDownload,
    handleCopyUrl,
  };
}
