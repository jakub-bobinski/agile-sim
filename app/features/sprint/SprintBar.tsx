import type { Task } from "../board/types";
import { getSprintProgress } from "./sprint-rules";

export type SprintBarProps = {
  tasks: Task[];
};

export function SprintBar({ tasks }: SprintBarProps) {
  const progress = getSprintProgress(tasks);

  return <span>{Math.round(progress)}%</span>;
}
