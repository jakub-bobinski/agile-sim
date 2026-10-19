import type { Task } from "./types";
import { Column } from "./Column";

type BoardProps = {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
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

export function Board({ tasks, onTaskClick }: BoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => column.statuses.includes(task.status))}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}
