import { useEffect, useRef, useState } from "react";

const DB_NAME = "ai-headshot-generator";
const STORE_NAME = "uploads";
const IMAGE_KEY = "current-image";

function revokePreviewUrl(previewUrlRef) {
  if (!previewUrlRef.current) return;

  URL.revokeObjectURL(previewUrlRef.current);
  previewUrlRef.current = null;
}

function openImageDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readStoredImage() {
  const database = await openImageDatabase();

  return new Promise((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .get(IMAGE_KEY);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function saveStoredImage(file) {
  const database = await openImageDatabase();

  return new Promise((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, "readwrite")
      .objectStore(STORE_NAME)
      .put(file, IMAGE_KEY);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function removeStoredImage() {
  const database = await openImageDatabase();

  return new Promise((resolve, reject) => {
    const request = database
      .transaction(STORE_NAME, "readwrite")
      .objectStore(STORE_NAME)
      .delete(IMAGE_KEY);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export default function useImageUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const hydratedRef = useRef(false);
  const previewUrlRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    readStoredImage()
      .then((storedFile) => {
        if (mounted && storedFile) {
          setFile(storedFile);
          const objectUrl = URL.createObjectURL(storedFile);
          previewUrlRef.current = objectUrl;
          setPreviewUrl(objectUrl);
        }
      })
      .catch(() => {
        if (mounted) setError("Unable to restore your previous image.");
      })
      .finally(() => {
        hydratedRef.current = true;
      });

    return () => {
      mounted = false;
      revokePreviewUrl(previewUrlRef);
    };
  }, []);

  const selectImage = (selectedFile) => {
    revokePreviewUrl(previewUrlRef);

    const objectUrl = URL.createObjectURL(selectedFile);
    previewUrlRef.current = objectUrl;
    setFile(selectedFile);
    setPreviewUrl(objectUrl);
    setError(null);
    saveStoredImage(selectedFile).catch(() => {
      setError("The image was selected but could not be saved locally.");
    });
  };

  const removeImage = () => {
    revokePreviewUrl(previewUrlRef);

    setFile(null);
    setPreviewUrl(null);
    setError(null);

    if (hydratedRef.current) {
      removeStoredImage().catch(() => {
        setError("Unable to remove the saved image.");
      });
    }
  };

  return {
    file,
    previewUrl,
    error,
    setError,
    selectImage,
    removeImage,
  };
}
