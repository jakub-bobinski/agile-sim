import { useState } from "react";
import { Board } from "~/features/board/Board";
import type { Task } from "~/features/board/types";
import { SprintBar } from "../sprint/SprintBar";
import { getSprintProgress } from "../sprint/sprint-rules";

export type GameProps = {
  initialTasks: Task[];
};

export function Game({ initialTasks }: GameProps) {
  const [tasks, setTasks] = useState(initialTasks);

  function handleTaskClick(taskId: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const progress = Math.min(task.progress + 1, task.requiredProgress);
        const status =
          progress === task.requiredProgress ? "done" : "in-progress";

        return { ...task, progress, status };
      }),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SprintBar progress={getSprintProgress(tasks)}></SprintBar>
      <Board tasks={tasks} onTaskClick={handleTaskClick} />
    </div>
  );
}
