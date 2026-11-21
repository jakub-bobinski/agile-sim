import type { Task } from "./types";

export const WONT_DO_PENALTY_WEIGHT: Record<Task["priority"], number> = {
  low: 0.5,
  medium: 1,
  high: 3,
};

export function isTaskClosed(task: Task): boolean {
  return task.status === "done" || task.status === "wont-do";
}

export function canMarkWontDo(task: Task): boolean {
  return !isTaskClosed(task);
}

export function markWontDo(task: Task): Task {
  if (!canMarkWontDo(task)) return task;
  return { ...task, status: "wont-do" };
}

export function applyClick(task: Task, clickPower: number): Task {
  if (isTaskClosed(task)) return task;
  const progress = Math.min(task.progress + clickPower, task.requiredProgress);
  const status = progress === task.requiredProgress ? "done" : "in-progress";

  return { ...task, progress, status };
}
