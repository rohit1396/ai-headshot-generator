
import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col
        items-center justify-center gap-4"
    >
      <LoaderCircle
        size={36}
        className="animate-spin text-violet-600 motion-reduce:animate-none"
      />

      <p className="text-sm text-gray-500">
        Loading page...
      </p>
    </div>
  );
}
