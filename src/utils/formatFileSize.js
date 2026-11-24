
export function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
  
    const units = ["Bytes", "KB", "MB", "GB"];
  
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );
  
    const size = bytes / Math.pow(1024, index);
  
    return `${size.toFixed(2)} ${units[index]}`;
  }
  