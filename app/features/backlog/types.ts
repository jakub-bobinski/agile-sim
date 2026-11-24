import { PRIORITIES, type Priority } from "~/features/board/types";

export type BacklogItem = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  createdAt: string;
};

export type BacklogInput = Pick<
  BacklogItem,
  "title" | "description" | "priority"
>;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isPriority(value: unknown): value is Priority {
  return PRIORITIES.some((priority) => priority === value);
}

export function isBacklogItem(value: unknown): value is BacklogItem {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    isPriority(value.priority) &&
    typeof value.createdAt === "string"
  );
}
