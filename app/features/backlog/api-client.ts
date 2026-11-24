import { data } from "react-router";
import type { Priority } from "~/features/board/types";
import { isBacklogItem, type BacklogItem } from "./types";

export async function fetchBacklogItems(
  baseUrl: string,
  priority?: Priority,
): Promise<BacklogItem[]> {
  const url = new URL("/api/backlog", baseUrl);
  if (priority) {
    url.searchParams.set("priority", priority);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw data("Could not load the backlog.", { status: response.status });
  }

  const items: unknown = await response.json();
  if (!Array.isArray(items) || !items.every(isBacklogItem)) {
    throw data("Unexpected API response.", { status: 502 });
  }
  return items;
}
