export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done" | "wont-do";
  priority: "low" | "medium" | "high";
  requiredProgress: number;
  progress: number;
  sprintId?: string;
};
