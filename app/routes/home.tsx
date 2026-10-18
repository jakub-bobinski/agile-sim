import type { Task } from "~/features/board/types";
import type { Route } from "./+types/home";
import { Board } from "~/features/board/Board";

export function meta() {
  return [{ title: "Agile Sim" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { tasks } = loaderData;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Agile Sim</h1>
      <Board tasks={tasks} />
    </main>
  );
}

export async function loader() {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Implement login feature",
      description: "Create a login page and authentication flow.",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "2",
      title: "Design landing page",
      description: "Create a responsive landing page for the app.",
      status: "todo",
      priority: "medium",
    },
    {
      id: "3",
      title: "Test",
      description: "Test.",
      status: "done",
      priority: "high",
    },
    {
      id: "4",
      title: "Test",
      description: "Test.",
      status: "wont-do",
      priority: "high",
    },
  ];

  return { tasks };
}
