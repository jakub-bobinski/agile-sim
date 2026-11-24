import type { FieldErrors } from "./validation";

export function jsonError(
  status: number,
  error: string,
  fieldErrors?: FieldErrors,
): Response {
  return Response.json(fieldErrors ? { error, fieldErrors } : { error }, {
    status,
  });
}

export const notFound = () => jsonError(404, "Backlog item not found");
