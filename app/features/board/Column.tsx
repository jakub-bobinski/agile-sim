import { useState, type DragEvent } from "react";
import type { Task } from "./types";
import { TASK_ID_MIME, TaskCard } from "./TaskCard";

type ColumnProps = {
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onTaskDragStart: (taskId: string) => void;
  onTaskDragEnd: () => void;
  isDropTarget?: boolean;
  onDropTask?: (taskId: string) => void;
};

export function Column({
  id,
  title,
  tasks,
  onTaskClick,
  onTaskDragStart,
  onTaskDragEnd,
  isDropTarget = false,
  onDropTask,
}: ColumnProps) {
  const headingId = `column-${id}-heading`;
  const [isOver, setIsOver] = useState(false);

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setIsOver(false);
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setIsOver(false);
    const taskId = event.dataTransfer.getData(TASK_ID_MIME);
    if (taskId && onDropTask) onDropTask(taskId);
  }

  const dropStyles = isDropTarget
    ? isOver
      ? "bg-rose-100 ring-2 ring-rose-400"
      : "bg-rose-50 ring-2 ring-rose-200 ring-dashed"
    : "bg-slate-100";

  return (
    <section
      aria-labelledby={headingId}
      onDragOver={onDropTask ? handleDragOver : undefined}
      onDragLeave={onDropTask ? handleDragLeave : undefined}
      onDrop={onDropTask ? handleDrop : undefined}
      className={`flex min-h-96 flex-col rounded-xl p-3 transition-colors ${dropStyles}`}
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
            <TaskCard
              task={task}
              onClick={() => onTaskClick(task.id)}
              onDragStart={() => onTaskDragStart(task.id)}
              onDragEnd={onTaskDragEnd}
              dataTestId={`task-card-id-${task.id}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
