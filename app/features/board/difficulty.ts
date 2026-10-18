export type Difficulty = "easy" | "medium" | "hard";

const EASY_MAX_CLICKS = 5;
const MEDIUM_MAX_CLICKS = 12;

export function getDifficulty(requiredProgress: number): Difficulty {
  if (requiredProgress <= EASY_MAX_CLICKS) return "easy";
  if (requiredProgress <= MEDIUM_MAX_CLICKS) return "medium";
  return "hard";
}
