import { Link } from "react-router";
import { PriorityBadge } from "~/components/ui/PriorityBadge";
import type { BacklogItem } from "./types";

export function BacklogItemCard({ item }: { item: BacklogItem }) {
  return (
    <Link
      to={`/backlog/${item.id}`}
      className="block h-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-semibold text-slate-900">{item.title}</span>
        <PriorityBadge priority={item.priority} />
      </span>
      <span className="mt-1 block text-sm text-slate-600">
        {item.description}
      </span>
    </Link>
  );
}
