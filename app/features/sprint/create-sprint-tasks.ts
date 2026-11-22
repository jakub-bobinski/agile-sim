import { getDifficulty } from "~/features/board/difficulty";
import type { Task } from "~/features/board/types";
import { randomInt, shuffle } from "~/lib/random";

export type TaskContent = Pick<Task, "title" | "description" | "priority">;

export const DEFAULT_TASK_CONTENT: TaskContent[] = [
  {
    title: "Fix login bug",
    description: "Users can't log in with SSO.",
    priority: "high",
  },
  {
    title: "Write unit tests",
    description: "Cover the payment module.",
    priority: "medium",
  },
  {
    title: "Update dependencies",
    description: "Bump outdated npm packages.",
    priority: "low",
  },
  {
    title: "Refactor API client",
    description: "Remove duplicated fetch logic.",
    priority: "medium",
  },
  {
    title: "Add dark mode",
    description: "Support the system color scheme.",
    priority: "low",
  },
  {
    title: "Improve page load",
    description: "Lazy-load heavy components.",
    priority: "medium",
  },
  {
    title: "Fix flaky E2E test",
    description: "Checkout test fails randomly on CI.",
    priority: "high",
  },
  {
    title: "Write release notes",
    description: "Summarise changes for v2.0.",
    priority: "low",
  },
];

export const TASKS_PER_SPRINT = 5;
const MIN_REQUIRED_CLICKS = 3;
const MAX_REQUIRED_CLICKS = 15;
const DIFFICULTY_GROWTH = 1.12;

function getDifficultyMultiplier(sprintNumber: number): number {
  return DIFFICULTY_GROWTH ** (sprintNumber - 1);
}

function createTask(
  content: TaskContent,
  sprintNumber: number,
  index: number,
): Task {
  const baseClicks = randomInt(MIN_REQUIRED_CLICKS, MAX_REQUIRED_CLICKS);

  return {
    title: content.title,
    description: content.description,
    priority: content.priority,
    id: `s${sprintNumber}-${index}`,
    difficulty: getDifficulty(baseClicks),
    requiredProgress: Math.round(
      baseClicks * getDifficultyMultiplier(sprintNumber),
    ),
    status: "todo",
    progress: 0,
  };
}

export function createSprintTasks(
  sprintNumber: number,
  pool: TaskContent[] = DEFAULT_TASK_CONTENT,
): Task[] {
  const source = pool.length > 0 ? pool : DEFAULT_TASK_CONTENT;
  return shuffle(source)
    .slice(0, TASKS_PER_SPRINT)
    .map((content, index) => createTask(content, sprintNumber, index));
}
