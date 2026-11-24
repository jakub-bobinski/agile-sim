import type { Route } from "./+types/home";
import { fetchBacklogItems } from "~/features/backlog/api-client";
import { Game } from "~/features/game/Game";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";

export function meta() {
  return [{ title: "Agile Sim" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const backlog = await fetchBacklogItems(request.url);
  return { backlog, tasks: createSprintTasks(1, backlog) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { backlog, tasks } = loaderData;

  return (
    <>
      <h1 className="sr-only">Agile Sim game</h1>
      <Game initialTasks={tasks} backlog={backlog} />
    </>
  );
}
