
import { generationStages } from "../data/generationStages";
import { mockHeadshots } from "../data/mockHeadshots";
import { delay } from "../utils/delay";

export async function generateHeadshot(
  { image, preferences },
  {
    onProgress = () => {},
    signal,
    simulateError = false,
  } = {}
) {
  if (!image) {
    throw new Error("Please upload an image first.");
  }

  const imageUrl = mockHeadshots[preferences?.profession];

  if (!imageUrl) {
    throw new Error("Invalid profession selected.");
  }

  signal?.throwIfAborted();

  let currentProgress = 0;

  for (const stage of generationStages) {
    const startProgress = currentProgress;
    const difference = stage.progress - startProgress;

    const ticks = 10;
    const interval = stage.duration / ticks;

    for (let tick = 1; tick <= ticks; tick++) {
      await delay(interval, signal);

      currentProgress = Math.round(
        startProgress + (difference * tick) / ticks
      );

      onProgress({
        progress: currentProgress,
        stage: stage.id,
        message: stage.label,
      });

      // Deterministic failure for testing
      if (simulateError && currentProgress >= 50) {
        throw new Error(
          "Generation service is temporarily unavailable."
        );
      }
    }
  }

  signal?.throwIfAborted();

  return {
    id: crypto.randomUUID(),
    imageUrl,
    preferences: { ...preferences },
    createdAt: new Date().toISOString(),
    isMock: true,
  };
}
