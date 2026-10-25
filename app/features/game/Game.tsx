import { useState } from "react";
import { Board } from "~/features/board/Board";
import { applyClick } from "~/features/board/task-rules";
import type { Task } from "~/features/board/types";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";
import { SprintBar } from "~/features/sprint/SprintBar";
import { UserPanel } from "~/features/user-panel/UserPanel";
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
  const clickPower: number = 1;

  function handleTaskClick(taskId: string) {
    const nextTasks = tasks.map((task) =>
      task.id === taskId ? applyClick(task, clickPower) : task,
    );

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <UserPanel clickPower={clickPower} />
        <Board tasks={tasks} onTaskClick={handleTaskClick} />
      </div>
    </div>
  );
}
