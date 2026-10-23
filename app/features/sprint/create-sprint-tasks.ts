import type { Task } from "~/features/board/types";
import { pickRandom, randomInt, shuffle } from "~/lib/random";

type TaskContent = Pick<Task, "title" | "description">;

const TASK_CONTENT: TaskContent[] = [
  { title: "Fix login bug", description: "Users can't log in with SSO." },
  { title: "Write unit tests", description: "Cover the payment module." },
  { title: "Update dependencies", description: "Bump outdated npm packages." },
  {
    title: "Refactor API client",
    description: "Remove duplicated fetch logic.",
  },
  { title: "Add dark mode", description: "Support the system color scheme." },
  { title: "Improve page load", description: "Lazy-load heavy components." },
  {
    title: "Fix flaky E2E test",
    description: "Checkout test fails randomly on CI.",
  },
  { title: "Write release notes", description: "Summarise changes for v2.0." },
];

const PRIORITIES: Task["priority"][] = ["low", "medium", "high"];

const TASKS_PER_SPRINT = 5;
const MIN_REQUIRED_CLICKS = 3;
const MAX_REQUIRED_CLICKS = 15;

function createTask(
  content: TaskContent,
  sprintNumber: number,
  index: number,
): Task {
  return {
    ...content,
    id: `s${sprintNumber}-${index}`,
    priority: pickRandom(PRIORITIES),
    requiredProgress: randomInt(MIN_REQUIRED_CLICKS, MAX_REQUIRED_CLICKS),
    status: "todo",
    progress: 0,
  };
}

export function createSprintTasks(sprintNumber: number): Task[] {
  return shuffle(TASK_CONTENT)
    .slice(0, TASKS_PER_SPRINT) //shuffle to not make duplicates when sprint changes
    .map((content, index) => createTask(content, sprintNumber, index));
}
