import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
  dataTestId?: string;
};

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export function TaskCard({ task, dataTestId }: TaskCardProps) {
  return (
    <button
      type="button"
      className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition select-none hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:scale-[0.98]"
      data-testid={dataTestId}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-slate-900">
          {task.title}
        </span>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </span>
      <span className="mt-1 block text-xs text-slate-600">
        {task.description}
      </span>
    </button>
  );
}
