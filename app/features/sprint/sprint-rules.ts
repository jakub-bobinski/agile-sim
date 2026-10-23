import type { Task } from "~/features/board/types";

export function getSprintClicks(tasks: Task[]) {
  const counted = tasks.filter((task) => task.status !== "wont-do");
  return {
    done: counted.reduce((sum, task) => sum + task.progress, 0),
    required: counted.reduce((sum, task) => sum + task.requiredProgress, 0),
  };
}

export function getSprintProgress(tasks: Task[]): number {
  const { done, required } = getSprintClicks(tasks);
  if (required === 0) return 0;
  return Math.min(100, (done / required) * 100);
}

export function isSprintComplete(tasks: Task[]): boolean {
  const { done, required } = getSprintClicks(tasks);
  return required > 0 && done >= required;
}
