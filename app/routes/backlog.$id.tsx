import { data, Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/backlog.$id";
import { PriorityBadge } from "~/components/ui/PriorityBadge";
import { BacklogForm } from "~/features/backlog/BacklogForm";
import { isBacklogItem } from "~/features/backlog/types";
import { validateBacklogInput } from "~/features/backlog/validation";
import { useHydrated } from "~/lib/use-hydrated";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData?.item.title ?? "Backlog item"} Agile Sim` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const response = await fetch(
    new URL(`/api/backlog/${params.id}`, request.url),
  );
  if (!response.ok) {
    throw data("Could not load this backlog item.", {
      status: response.status,
    });
  }

  const item: unknown = await response.json();
  if (!isBacklogItem(item)) {
    throw data("Unexpected API response.", { status: 502 });
  }
  return { item };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  if (request.method === "DELETE") {
    const response = await fetch(`/api/backlog/${params.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return { deleteError: "Deleting failed. Please try again." };
    }
    return redirect("/backlog");
  }

  const formData = await request.formData();
  const result = validateBacklogInput(Object.fromEntries(formData));
  if (!result.ok) {
    return { fieldErrors: result.fieldErrors };
  }

  const response = await fetch(`/api/backlog/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });
  if (!response.ok) {
    return { error: "Saving failed. Please try again." };
  }
  return { saved: true };
}

export default function BacklogItemPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { item } = loaderData;
  const navigation = useNavigation();
  const isDeleting = navigation.formMethod === "DELETE";
  const isHydrated = useHydrated();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Link to="/backlog" className="text-sm text-blue-700 hover:underline">
        ← Back to backlog
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold break-words text-slate-900">
            {item.title}
          </h1>
          <PriorityBadge priority={item.priority} />
        </div>
        <p className="mt-2 text-slate-700">{item.description}</p>
        <p className="mt-3 text-xs text-slate-500">
          #{item.id} · created {item.createdAt}
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Edit</h2>
        {actionData?.saved && (
          <p
            role="status"
            className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            Saved.
          </p>
        )}
        <BacklogForm
          key={item.id}
          initialValues={item}
          submitLabel="Save changes"
          fieldErrors={actionData?.fieldErrors}
          error={actionData?.error}
        />
      </section>

      <section className="rounded-xl border border-rose-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Danger zone</h2>
        {actionData?.deleteError && (
          <p role="alert" className="mt-2 text-sm text-rose-700">
            {actionData.deleteError}
          </p>
        )}
        <Form
          method="delete"
          onSubmit={(event) => {
            const confirmed = window.confirm(
              `Delete "${item.title}"? This cannot be undone.`,
            );
            if (!confirmed) {
              event.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            disabled={isDeleting || !isHydrated}
            className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:bg-rose-400"
          >
            {isDeleting ? "Deleting…" : "Delete item"}
          </button>
        </Form>
      </section>
    </div>
  );
}
