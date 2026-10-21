import type { Task } from "~/features/board/types";

export function sumRequiredProgress(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.requiredProgress, 0);
}

export function sumCurrentProgress(tasks: Task[]): number {
  return tasks.reduce((sum, task) => sum + task.progress, 0);
}

export function getSprintProgress(tasks: Task[]): number {
  const requiredProgress = sumRequiredProgress(tasks);
  const currentProgress = sumCurrentProgress(tasks);

  return Math.min(100, (currentProgress / requiredProgress) * 100);
}
