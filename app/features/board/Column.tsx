import type { Task } from "./types";
import { TaskCard } from "./TaskCard";

type ColumnProps = {
  title: string;
  tasks: Task[];
};

export function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            dataTestId={`task-card-id-${task.id}`}
          />
        ))}
      </div>
    </div>
  );
}
