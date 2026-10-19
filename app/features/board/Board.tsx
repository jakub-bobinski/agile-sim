import { useState } from "react";
import type { Task } from "./types";
import { Column } from "./Column";

type BoardProps = {
  tasks: Task[];
};

type ColumnConfig = {
  id: string;
  title: string;
  statuses: Task["status"][];
};

const columns: ColumnConfig[] = [
  { id: "todo", title: "To Do", statuses: ["todo", "in-progress"] },
  { id: "done", title: "Done", statuses: ["done"] },
  { id: "wont-do", title: "Won't Do", statuses: ["wont-do"] },
];

export function Board({ tasks: initialTasks }: BoardProps) {
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => column.statuses.includes(task.status))}
          onTaskClick={handleTaskClick}
        />
      ))}
    </div>
  );
}
