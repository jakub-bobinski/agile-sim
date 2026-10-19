import { getDifficulty, type Difficulty } from "./difficulty";
import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
  dataTestId?: string;
  onClick: () => void;
};

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

const difficultyStyles: Record<Difficulty, string> = {
  easy: "text-emerald-700",
  medium: "text-amber-700",
  hard: "text-red-700",
};

export function TaskCard({ task, dataTestId, onClick }: TaskCardProps) {
  const difficulty = getDifficulty(task.requiredProgress);
  const percent = Math.min(100, (task.progress / task.requiredProgress) * 100);
  const isClosed = task.status === "done" || task.status === "wont-do";
  const closedText = isClosed ? "line-through decoration-slate-400" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isClosed}
      className="block w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition select-none hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:scale-[0.98] disabled:cursor-default disabled:bg-slate-50 disabled:opacity-60 disabled:shadow-none disabled:hover:shadow-none disabled:active:scale-100"
      data-testid={dataTestId}
    >
      <span className="flex items-start justify-between gap-2">
        <span className={`text-sm font-semibold text-slate-900 ${closedText}`}>
          {task.title}
        </span>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </span>
      <span className={`mt-1 block text-xs text-slate-600 ${closedText}`}>
        {task.description}
      </span>
      <span className="mt-3 flex items-center justify-between text-xs">
        <span className={`font-medium ${difficultyStyles[difficulty]}`}>
          {difficulty}
        </span>
        <span className="text-slate-500 tabular-nums">
          {task.progress} / {task.requiredProgress}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mt-1 block h-1.5 overflow-hidden rounded-full bg-slate-100"
      >
        <span
          className="block h-full rounded-full bg-blue-500 transition-[width] duration-150"
          style={{ width: `${percent}%` }}
        />
      </span>
    </button>
  );
}
