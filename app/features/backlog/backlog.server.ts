import type { Priority } from "~/features/board/types";
import { db } from "~/lib/db.server";
import { isBacklogItem, type BacklogInput, type BacklogItem } from "./types";

const COLUMNS = "id, title, description, priority, created_at AS createdAt";

const selectAll = db.prepare(
  `SELECT ${COLUMNS} FROM backlog_items ORDER BY id`,
);
const selectByPriority = db.prepare(
  `SELECT ${COLUMNS} FROM backlog_items WHERE priority = ? ORDER BY id`,
);
const selectById = db.prepare(
  `SELECT ${COLUMNS} FROM backlog_items WHERE id = ?`,
);
const insert = db.prepare(
  `INSERT INTO backlog_items (title, description, priority) VALUES (?, ?, ?) RETURNING ${COLUMNS}`,
);
const update = db.prepare(
  `UPDATE backlog_items SET title = ?, description = ?, priority = ? WHERE id = ? RETURNING ${COLUMNS}`,
);
const remove = db.prepare("DELETE FROM backlog_items WHERE id = ?");

function toBacklogItem(row: unknown): BacklogItem {
  if (!isBacklogItem(row))
    throw new Error("Unexpected backlog_items row shape");
  return row;
}

export function listItems(priority?: Priority): BacklogItem[] {
  const rows = priority ? selectByPriority.all(priority) : selectAll.all();
  return rows.map(toBacklogItem);
}

export function getItem(id: number): BacklogItem | null {
  const row = selectById.get(id);
  return row ? toBacklogItem(row) : null;
}

export function createItem(input: BacklogInput): BacklogItem {
  return toBacklogItem(
    insert.get(input.title, input.description, input.priority),
  );
}

export function updateItem(
  id: number,
  input: BacklogInput,
): BacklogItem | null {
  const row = update.get(input.title, input.description, input.priority, id);
  return row ? toBacklogItem(row) : null;
}

export function deleteItem(id: number): boolean {
  return Number(remove.run(id).changes) > 0;
}
