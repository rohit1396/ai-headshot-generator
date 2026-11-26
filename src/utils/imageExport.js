
export function getAbsoluteImageUrl(imageUrl) {
    return new URL(imageUrl, window.location.origin).href;
  }
  
  export async function downloadImage(
    imageUrl,
    filename = "headshot"
  ) {
    const response = await fetch(imageUrl);
  
    if (!response.ok) {
      throw new Error("Unable to download the image.");
    }
  
    const blob = await response.blob();
  
    if (!blob.type.startsWith("image/")) {
      throw new Error("The downloaded file is not an image.");
    }
  
    const extensions = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
  
    const extension = extensions[blob.type];
  
    if (!extension) {
      throw new Error("Unsupported image format.");
    }
  
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
  
    anchor.href = objectUrl;
    anchor.download = `${filename}.${extension}`;
  
    document.body.appendChild(anchor);
  
    try {
      anchor.click();
    } finally {
      anchor.remove();
  
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    }
  }
  
  export async function copyImageUrl(imageUrl) {
    if (!navigator.clipboard) {
      throw new Error("Clipboard access is unavailable.");
    }
  
    const absoluteUrl = getAbsoluteImageUrl(imageUrl);
  
    await navigator.clipboard.writeText(absoluteUrl);
  
    return absoluteUrl;
  }
  