const BASE_POINTS = 1000;

export function calculateScore(responseTimeMs: number, totalTimeMs: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  
  const timeRemaining = Math.max(0, totalTimeMs - responseTimeMs);
  const timeRatio = timeRemaining / totalTimeMs;
  
  return Math.round(BASE_POINTS * timeRatio);
}

export function calculateTimeRemaining(startTime: number): number {
  return Date.now() - startTime;
}
