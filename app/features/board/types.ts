import type { Difficulty } from "./difficulty";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done" | "wont-do";
  priority: "low" | "medium" | "high";
  difficulty: Difficulty;
  requiredProgress: number;
  progress: number;
};
