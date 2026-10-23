import { useState } from "react";
import { Board } from "~/features/board/Board";
import type { Task } from "~/features/board/types";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";
import { SprintBar } from "~/features/sprint/SprintBar";
import {
  getSprintProgress,
  isSprintComplete,
} from "~/features/sprint/sprint-rules";

export type GameProps = {
  initialTasks: Task[];
};

export function Game({ initialTasks }: GameProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [sprintNumber, setSprintNumber] = useState(1);

  function handleTaskClick(taskId: string) {
    const nextTasks: Task[] = tasks.map((task) => {
      if (task.id !== taskId) return task;

      const progress = Math.min(task.progress + 1, task.requiredProgress);
      const status =
        progress === task.requiredProgress ? "done" : "in-progress";

      return { ...task, progress, status };
    });

    if (isSprintComplete(nextTasks)) {
      const nextSprintNumber = sprintNumber + 1;
      setSprintNumber(nextSprintNumber);
      setTasks(createSprintTasks(nextSprintNumber));
    } else {
      setTasks(nextTasks);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SprintBar
        sprintNumber={sprintNumber}
        progress={getSprintProgress(tasks)}
      />
      <Board tasks={tasks} onTaskClick={handleTaskClick} />
    </div>
  );
}
