
import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

export default function ImageComparison({
  beforeImage,
  afterImage,
  aspectRatio = "1:1",
}) {
  const [position, setPosition] = useState(50);

  return (
    <div>
      <div
        style={{
          aspectRatio: aspectRatio.replace(":", "/"),
        }}
        className="relative isolate w-full overflow-hidden
          rounded-2xl bg-gray-100"
      >
        {/* After image */}
        <img
          src={afterImage}
          alt="Sample professional headshot"
          draggable={false}
          className="absolute inset-0 h-full w-full
            select-none object-cover"
        />

        {/* Before image */}
        <img
          src={beforeImage}
          alt="Original uploaded selfie"
          draggable={false}
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
          className="absolute inset-0 h-full w-full
            select-none object-cover"
        />

        {/* Before label */}
        <span className="pointer-events-none absolute left-3 top-3
          rounded-lg bg-black/60 px-3 py-1.5
          text-xs font-medium text-white">
          Original
        </span>

        {/* After label */}
        <span className="pointer-events-none absolute right-3 top-3
          rounded-lg bg-black/60 px-3 py-1.5
          text-xs font-medium text-white">
          Sample result
        </span>

        {/* Divider */}
        <div
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute inset-y-0
            w-0.5 -translate-x-1/2 bg-white"
        >
          {/* Slider handle */}
          <div className="absolute left-1/2 top-1/2
            flex h-10 w-10 -translate-x-1/2
            -translate-y-1/2 items-center justify-center
            rounded-full bg-white text-gray-700 shadow-lg">
            <ChevronsLeftRight size={22} />
          </div>
        </div>

        {/* Accessible slider control */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) =>
            setPosition(Number(event.target.value))
          }
          aria-label="Compare original and sample headshot"
          aria-valuetext={`${position}% original image visible`}
          className="absolute inset-0 z-10 m-0 h-full w-full
            cursor-ew-resize opacity-0"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Drag the slider to compare images.
        </p>

        <button
          type="button"
          onClick={() => setPosition(50)}
          className="text-xs font-medium text-violet-600"
        >
          Reset slider
        </button>
      </div>
    </div>
  );
}
