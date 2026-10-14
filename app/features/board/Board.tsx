import type { Task } from "./types";
import { Column } from "./Column";

type BoardProps = {
  tasks: Task[];
};

type ColumnConfig = {
  title: string;
  statuses: Task["status"][];
};

const columns: ColumnConfig[] = [
  { title: "To Do", statuses: ["todo", "in-progress"] },
  { title: "Done", statuses: ["done"] },
  { title: "Won't Do", statuses: ["wont-do"] },
];

export function Board({ tasks }: BoardProps) {
  return (
    <div className="flex space-x-4 p-4">
      {columns.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          tasks={tasks.filter((task) => column.statuses.includes(task.status))}
        />
      ))}
    </div>
  );
}
