import { useState } from "react";
import { canMarkWontDo } from "./task-rules";
import type { Task } from "./types";
import { Column } from "./Column";

type BoardProps = {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onTaskWontDo: (taskId: string) => void;
};

type ColumnConfig = {
  id: string;
  title: string;
  statuses: Task["status"][];
  acceptsDrop?: boolean;
};

const columns: ColumnConfig[] = [
  { id: "todo", title: "To Do", statuses: ["todo", "in-progress"] },
  { id: "done", title: "Done", statuses: ["done"] },
  {
    id: "wont-do",
    title: "Won't Do",
    statuses: ["wont-do"],
    acceptsDrop: true,
  },
];

export function Board({ tasks, onTaskClick, onTaskWontDo }: BoardProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // if an intern finishes the dragged task mid-drag, the drop zone stops highlighting on its own.
  const isDraggingDroppable = tasks.some(
    (task) => task.id === draggedTaskId && canMarkWontDo(task),
  );

  function handleDrop(taskId: string) {
    setDraggedTaskId(null);
    onTaskWontDo(taskId);
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {columns.map((column) => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => column.statuses.includes(task.status))}
          onTaskClick={onTaskClick}
          onTaskDragStart={setDraggedTaskId}
          onTaskDragEnd={() => {
            setDraggedTaskId(null);
          }}
          isDropTarget={column.acceptsDrop === true && isDraggingDroppable}
          onDropTask={column.acceptsDrop ? handleDrop : undefined}
        />
      ))}
    </div>
  );
}
