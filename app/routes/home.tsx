import type { Route } from "./+types/home";
import { Game } from "~/features/game/Game";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";

export function meta() {
  return [{ title: "Agile Sim" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { tasks } = loaderData;

  return (
    <>
      <h1 className="sr-only">Agile Sim game</h1>
      <Game initialTasks={tasks} />
    </>
  );
}

export async function loader() {
  return { tasks: createSprintTasks(1) };
}
