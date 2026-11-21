import { applyClick, isTaskClosed } from "~/features/board/task-rules";
import type { Task } from "~/features/board/types";
import { pickRandom } from "~/lib/random";

export const INTERN_TICK_MS = 2000;
const INTERN_POWER = 1;

export type Intern = {
  taskId: string | null;
};

type InternWorkResult = {
  tasks: Task[];
  interns: Intern[];
};

// idle interns pick a random open task and are working on it.
export function workInterns(
  tasks: Task[],
  interns: Intern[],
  internCount: number,
): InternWorkResult {
  const openTaskIds = tasks
    .filter((task) => !isTaskClosed(task))
    .map((task) => task.id);

  // stay on task if still open
  const kept = Array.from({ length: internCount }, (_, i) => {
    const taskId = interns.at(i)?.taskId ?? null;
    return taskId !== null && openTaskIds.includes(taskId) ? taskId : null;
  });

  // idle intern pick open task (task that is not kept by other intern)
  const takenIds = new Set(kept.filter((id): id is string => id !== null));
  const assigned = kept.map((taskId) => {
    if (taskId !== null) return taskId;

    const freeIds = openTaskIds.filter((id) => !takenIds.has(id));
    if (freeIds.length === 0) return null;

    const picked = pickRandom(freeIds);
    takenIds.add(picked);
    return picked;
  });

  // progress for each
  const nextTasks = tasks.map((task) =>
    assigned.includes(task.id) ? applyClick(task, INTERN_POWER) : task,
  );

  return {
    tasks: nextTasks,
    interns: assigned.map((taskId) => ({ taskId })),
  };
}
