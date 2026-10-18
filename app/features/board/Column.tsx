import type { Task } from "./types";
import { TaskCard } from "./TaskCard";

type ColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
};

export function Column({ id, title, tasks }: ColumnProps) {
  const headingId = `column-${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="flex min-h-96 flex-col rounded-xl bg-slate-100 p-3"
    >
      <h2
        id={headingId}
        className="mb-3 flex items-center justify-between px-1 text-sm font-semibold tracking-wide text-slate-700 uppercase"
      >
        {title}
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
          {tasks.length}
        </span>
      </h2>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} dataTestId={`task-card-id-${task.id}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
