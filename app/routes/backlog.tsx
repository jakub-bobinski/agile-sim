import { Form, Link, useSubmit } from "react-router";
import type { Route } from "./+types/backlog";
import { fetchBacklogItems } from "~/features/backlog/api-client";
import { BacklogItemCard } from "~/features/backlog/BacklogItemCard";
import { isPriority } from "~/features/backlog/types";
import { PRIORITIES } from "~/features/board/types";
import { useHydrated } from "~/lib/use-hydrated";

export function meta() {
  return [{ title: "Backlog · Agile Sim" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const param = new URL(request.url).searchParams.get("priority");
  const priority = isPriority(param) ? param : undefined;
  return {
    items: await fetchBacklogItems(request.url, priority),
    priority: priority ?? "all",
  };
}

export default function BacklogPage({ loaderData }: Route.ComponentProps) {
  const { items, priority } = loaderData;
  const submit = useSubmit();
  const isHydrated = useHydrated();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Backlog</h1>
          <p className="text-sm text-slate-600">
            Sprints in the game draw their tasks from these items.
          </p>
        </div>
        <Link
          to="/backlog/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          New item
        </Link>
      </div>

      <Form
        method="get"
        onChange={(event) => {
          void submit(event.currentTarget);
        }}
        className="flex items-center gap-2"
      >
        <label
          htmlFor="priority-filter"
          className="text-sm font-medium text-slate-700"
        >
          Priority
        </label>
        <select
          key={priority}
          id="priority-filter"
          name="priority"
          defaultValue={priority}
          disabled={!isHydrated}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm"
        >
          <option value="all">all</option>
          {PRIORITIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Form>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No backlog items
          {priority === "all" ? "" : ` with ${priority} priority`}.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <BacklogItemCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
