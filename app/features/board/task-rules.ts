import type { Task } from "./types";

export function isTaskClosed(task: Task): boolean {
  return task.status === "done" || task.status === "wont-do";
}

export function applyClick(task: Task, clickPower: number): Task {
  if (isTaskClosed(task)) return task;
  const progress = Math.min(task.progress + clickPower, task.requiredProgress);
  const status = progress === task.requiredProgress ? "done" : "in-progress";

  return { ...task, progress, status };
}
