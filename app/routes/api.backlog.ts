import type { Route } from "./+types/api.backlog";
import { createItem, listItems } from "~/features/backlog/backlog.server";
import { jsonError } from "~/features/backlog/http.server";
import { isPriority } from "~/features/backlog/types";
import { validateBacklogInput } from "~/features/backlog/validation";

export function loader({ request }: Route.LoaderArgs) {
  const priority = new URL(request.url).searchParams.get("priority");
  if (priority !== null && !isPriority(priority)) {
    return jsonError(400, "Invalid priority filter. Use low, medium or high.");
  }
  return Response.json(listItems(priority ?? undefined));
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return jsonError(405, `Method ${request.method} not allowed`);
  }

  const body: unknown = await request.json().catch(() => null);
  const result = validateBacklogInput(body);
  if (!result.ok) {
    return jsonError(400, "Validation failed", result.fieldErrors);
  }

  return Response.json(createItem(result.data), { status: 201 });
}
