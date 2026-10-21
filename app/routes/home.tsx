import type { Task } from "~/features/board/types";
import type { Route } from "./+types/home";
import { Game } from "~/features/game/Game";

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
  const tasks: Task[] = [
    {
      id: "1",
      title: "Implement login feature",
      description: "Create a login page and authentication flow.",
      status: "todo",
      priority: "high",
      requiredProgress: 10,
      progress: 0,
    },
    {
      id: "2",
      title: "Design landing page",
      description: "Create a responsive landing page for the app.",
      status: "todo",
      priority: "medium",
      requiredProgress: 13,
      progress: 0,
    },
    {
      id: "3",
      title: "Test",
      description: "Test.",
      status: "todo",
      priority: "high",
      requiredProgress: 22,
      progress: 0,
    },
    {
      id: "4",
      title: "Test",
      description: "Test.",
      status: "todo",
      priority: "high",
      requiredProgress: 3,
      progress: 0,
    },
  ];

  return { tasks };
}
