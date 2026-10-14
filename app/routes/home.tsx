import type { Task } from "~/features/board/types";
import { TaskCard } from "~/features/board/TaskCard";
import type { Route } from "./+types/home";

export function meta() {
  return [{ title: "Agile Sim" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { tasks } = loaderData;

  return (
    <main className="mx-auto max-w-md p-6">
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
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
  ];

  return { tasks };
}
