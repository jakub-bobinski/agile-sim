import {
  isTaskClosed,
  WONT_DO_PENALTY_WEIGHT,
} from "~/features/board/task-rules";
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
  return tasks.length > 0 && tasks.every(isTaskClosed);
}

const SPRINTS_PER_REWARD_STEP = 3;

export function getBaseSprintReward(sprintNumber: number): number {
  return 1 + Math.floor(sprintNumber / SPRINTS_PER_REWARD_STEP);
}

export function getWontDoPenalty(sprintNumber: number, tasks: Task[]): number {
  const totalWeight = tasks
    .filter((task) => task.status === "wont-do")
    .reduce((sum, task) => sum + WONT_DO_PENALTY_WEIGHT[task.priority], 0);
  return Math.floor(totalWeight * getBaseSprintReward(sprintNumber));
}

export function getSprintReward(sprintNumber: number, tasks: Task[]): number {
  return (
    getBaseSprintReward(sprintNumber) - getWontDoPenalty(sprintNumber, tasks)
  );
}
