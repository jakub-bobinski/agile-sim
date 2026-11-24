import type { Route } from "./+types/api.backlog.$id";
import {
  deleteItem,
  getItem,
  updateItem,
} from "~/features/backlog/backlog.server";
import { jsonError, notFound } from "~/features/backlog/http.server";
import { validateBacklogInput } from "~/features/backlog/validation";

export function loader({ params }: Route.LoaderArgs) {
  const item = getItem(Number(params.id));
  return item ? Response.json(item) : notFound();
}

export async function action({ request, params }: Route.ActionArgs) {
  const id = Number(params.id);

  switch (request.method) {
    case "PUT": {
      const body: unknown = await request.json().catch(() => null);
      const result = validateBacklogInput(body);
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
