const DEFAULT_FADE_SECONDS = 3.5;

/** Gradually lowers a video's native volume during its final few seconds. */
export function fadeVideoAudio(video: HTMLVideoElement, fadeSeconds = DEFAULT_FADE_SECONDS) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;

  const secondsLeft = Math.max(0, video.duration - video.currentTime);
  if (secondsLeft >= fadeSeconds) return;

  const remainingRatio = secondsLeft / fadeSeconds;
  // A gentle ease-in keeps the voice/music present until near the end, then fades it cleanly.
  video.volume = Math.min(1, Math.max(0, remainingRatio * remainingRatio));
}

export function restoreVideoAudio(video: HTMLVideoElement) {
  video.volume = 1;
}
