import { Link, redirect } from "react-router";
import type { Route } from "./+types/backlog.new";
import { BacklogForm } from "~/features/backlog/BacklogForm";
import { isBacklogItem } from "~/features/backlog/types";
import { validateBacklogInput } from "~/features/backlog/validation";

export function meta() {
  return [{ title: "New backlog item · Agile Sim" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const result = validateBacklogInput(Object.fromEntries(formData));
  if (!result.ok) {
    return { fieldErrors: result.fieldErrors };
  }

  const response = await fetch("/api/backlog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });
  const item: unknown = await response.json();
  if (!response.ok || !isBacklogItem(item)) {
    return { error: "Saving failed. Please try again." };
  }

  return redirect(`/backlog/${item.id}`);
}

export default function NewBacklogItemPage({
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Link to="/backlog" className="text-sm text-blue-700 hover:underline">
        ← Back to backlog
      </Link>
      <h1 className="text-2xl font-bold text-slate-900">New backlog item</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <BacklogForm
          submitLabel="Create item"
          fieldErrors={actionData?.fieldErrors}
          error={actionData?.error}
        />
      </div>
    </div>
  );
}
