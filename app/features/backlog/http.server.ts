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

export async function readJsonBody(
  request: Request,
): Promise<{ ok: true; body: unknown } | { ok: false }> {
  try {
    const body: unknown = await request.json();
    return { ok: true, body };
  } catch {
    return { ok: false };
  }
}

export function parseId(param: string | undefined): number | null {
  const id = Number(param);
  return Number.isInteger(id) && id > 0 ? id : null;
}
