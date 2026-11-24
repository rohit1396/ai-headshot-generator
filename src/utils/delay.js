
export function delay(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(
          new DOMException("Operation cancelled", "AbortError")
        );
        return;
      }
  
      const handleAbort = () => {
        clearTimeout(timer);
  
        signal?.removeEventListener("abort", handleAbort);
  
        reject(
          new DOMException("Operation cancelled", "AbortError")
        );
      };
  
      const timer = setTimeout(() => {
        signal?.removeEventListener("abort", handleAbort);
        resolve();
      }, ms);
  
      signal?.addEventListener("abort", handleAbort, {
        once: true,
      });
    });
  }
  