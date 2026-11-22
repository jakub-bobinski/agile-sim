import { isPriority, isRecord, type BacklogInput } from "./types";

export const TITLE_MIN = 3;
export const TITLE_MAX = 80;
export const DESCRIPTION_MAX = 300;

export type FieldErrors = Partial<Record<keyof BacklogInput, string>>;

export type ValidationResult =
  { ok: true; data: BacklogInput } | { ok: false; fieldErrors: FieldErrors };

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateBacklogInput(raw: unknown): ValidationResult {
  const source = isRecord(raw) ? raw : {};
  const title = readString(source, "title");
  const description = readString(source, "description");
  const priority = source.priority;
  const fieldErrors: FieldErrors = {};

  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    fieldErrors.title = `Title must be ${TITLE_MIN}–${TITLE_MAX} characters.`;
  }
  if (description.length === 0 || description.length > DESCRIPTION_MAX) {
    fieldErrors.description = `Description is required (max ${DESCRIPTION_MAX} characters).`;
  }
  if (!isPriority(priority)) {
    fieldErrors.priority = "Priority must be low, medium or high.";
  }

  if (!isPriority(priority) || Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }
  return { ok: true, data: { title, description, priority } };
}
