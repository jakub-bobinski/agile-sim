import type { Route } from "./+types/api.backlog.$id";
import {
  deleteItem,
  getItem,
  updateItem,
} from "~/features/backlog/backlog.server";
import {
  jsonError,
  notFound,
  parseId,
  readJsonBody,
} from "~/features/backlog/http.server";
import { validateBacklogInput } from "~/features/backlog/validation";

export function loader({ params }: Route.LoaderArgs) {
  const id = parseId(params.id);
  const item = id === null ? null : getItem(id);
  return item ? Response.json(item) : notFound();
}

export async function action({ request, params }: Route.ActionArgs) {
  const id = parseId(params.id);
  if (id === null) return notFound();

  switch (request.method) {
    case "PUT": {
      if (!getItem(id)) return notFound();

      const parsed = await readJsonBody(request);
      if (!parsed.ok) return jsonError(400, "Request body must be valid JSON");

      const result = validateBacklogInput(parsed.body);
      if (!result.ok) {
        return jsonError(400, "Validation failed", result.fieldErrors);
      }

      const updated = updateItem(id, result.data);
      return updated ? Response.json(updated) : notFound();
    }

    case "DELETE":
      return deleteItem(id) ? new Response(null, { status: 204 }) : notFound();

    default:
      return jsonError(405, `Method ${request.method} not allowed`);
  }
}
