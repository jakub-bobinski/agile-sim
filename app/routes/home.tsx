import type { Route } from "./+types/home";
import { Game } from "~/features/game/Game";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";

export function meta() {
  return [{ title: "Agile Sim" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { tasks } = loaderData;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Agile Sim</h1>
      <Game initialTasks={tasks} />
    </main>
  );
}

export async function loader() {
  return { tasks: createSprintTasks(1) };
}
