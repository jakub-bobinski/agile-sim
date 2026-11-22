import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { DEFAULT_TASK_CONTENT } from "~/features/sprint/create-sprint-tasks";

if (existsSync(".env")) process.loadEnvFile();

const DATABASE_PATH = process.env.DATABASE_PATH ?? "./data/agile-sim.db";

function openDatabase(): DatabaseSync {
  mkdirSync(dirname(DATABASE_PATH), { recursive: true });
  const database = new DatabaseSync(DATABASE_PATH);

  database.exec(`
    CREATE TABLE IF NOT EXISTS backlog_items (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      description TEXT NOT NULL,
      priority    TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const row = database
    .prepare("SELECT COUNT(*) AS count FROM backlog_items")
    .get();
  if (row?.count === 0) {
    const insert = database.prepare(
      "INSERT INTO backlog_items (title, description, priority) VALUES (?, ?, ?)",
    );
    for (const item of DEFAULT_TASK_CONTENT) {
      insert.run(item.title, item.description, item.priority);
    }
  }

  return database;
}

export const db = openDatabase();
