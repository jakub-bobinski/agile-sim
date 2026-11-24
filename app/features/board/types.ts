import type { Difficulty } from "./difficulty";

export const PRIORITIES = ["low", "medium", "high"] as const;

export type Priority = (typeof PRIORITIES)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done" | "wont-do";
  priority: Priority;
  difficulty: Difficulty;
  requiredProgress: number;
  progress: number;
};
