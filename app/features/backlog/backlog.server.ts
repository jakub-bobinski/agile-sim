import { db } from "~/lib/db.server";
import {
  isPriority,
  type BacklogInput,
  type BacklogItem,
  type Priority,
} from "./types";

function toBacklogItem(row: Record<string, unknown>): BacklogItem {
  const { id, title, description, priority, created_at } = row;
  if (
    typeof id !== "number" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    !isPriority(priority) ||
    typeof created_at !== "string"
  ) {
    throw new Error("Unexpected backlog_items row shape");
  }
  return { id, title, description, priority, createdAt: created_at };
}

export function listItems(priority?: Priority): BacklogItem[] {
  const rows = priority
    ? db
        .prepare("SELECT * FROM backlog_items WHERE priority = ? ORDER BY id")
        .all(priority)
    : db.prepare("SELECT * FROM backlog_items ORDER BY id").all();
  return rows.map(toBacklogItem);
}

export function getItem(id: number): BacklogItem | null {
  const row = db.prepare("SELECT * FROM backlog_items WHERE id = ?").get(id);
  return row ? toBacklogItem(row) : null;
}

export function createItem(input: BacklogInput): BacklogItem {
  const row = db
    .prepare(
      "INSERT INTO backlog_items (title, description, priority) VALUES (?, ?, ?) RETURNING *",
    )
    .get(input.title, input.description, input.priority);
  if (!row) throw new Error("Insert returned no row");
  return toBacklogItem(row);
}

export function updateItem(
  id: number,
  input: BacklogInput,
): BacklogItem | null {
  const row = db
    .prepare(
      "UPDATE backlog_items SET title = ?, description = ?, priority = ? WHERE id = ? RETURNING *",
    )
    .get(input.title, input.description, input.priority, id);
  return row ? toBacklogItem(row) : null;
}

export function deleteItem(id: number): boolean {
  const result = db.prepare("DELETE FROM backlog_items WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}
