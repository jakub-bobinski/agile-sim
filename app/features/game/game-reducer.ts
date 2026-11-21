import { applyClick, markWontDo } from "~/features/board/task-rules";
import type { Task } from "~/features/board/types";
import { type Intern, workInterns } from "~/features/skills/ai-intern";
import { applyUpgrade, getClickPower } from "~/features/skills/skill-rules";
import type { SkillId, SkillLevels } from "~/features/skills/types";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";
import {
  getSprintReward,
  isSprintComplete,
} from "~/features/sprint/sprint-rules";

export type GameState = {
  tasks: Task[];
  sprintNumber: number;
  points: number;
  skillLevels: SkillLevels;
  interns: Intern[];
};

export type GameAction =
  | { type: "taskClicked"; taskId: string }
  | { type: "taskDroppedToWontDo"; taskId: string }
  | { type: "skillUpgraded"; skillId: SkillId }
  | { type: "internsWorked" };

export function createInitialGameState(tasks: Task[]): GameState {
  return {
    tasks,
    sprintNumber: 1,
    points: 0,
    skillLevels: { clickPower: 0, aiIntern: 0 },
    interns: [],
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "taskClicked": {
      const clickPower = getClickPower(state.skillLevels);
      const tasks = state.tasks.map((task) =>
        task.id === action.taskId ? applyClick(task, clickPower) : task,
      );
      return finishSprintIfComplete({ ...state, tasks });
    }

    case "taskDroppedToWontDo": {
      const tasks = state.tasks.map((task) =>
        task.id === action.taskId ? markWontDo(task) : task,
      );
      return finishSprintIfComplete({ ...state, tasks });
    }

    case "skillUpgraded": {
      const { skillLevels, points } = applyUpgrade(state, action.skillId);
      return { ...state, skillLevels, points };
    }

    case "internsWorked": {
      const { tasks, interns } = workInterns(
        state.tasks,
        state.interns,
        state.skillLevels.aiIntern,
        getClickPower(state.skillLevels),
      );
      return finishSprintIfComplete({ ...state, tasks, interns });
    }
  }
}

function finishSprintIfComplete(state: GameState): GameState {
  if (!isSprintComplete(state.tasks)) return state;

  const sprintNumber = state.sprintNumber + 1;
  return {
    ...state,
    sprintNumber,
    points: state.points + getSprintReward(state.sprintNumber, state.tasks),
    tasks: createSprintTasks(sprintNumber),
    interns: state.interns.map(() => ({ taskId: null })),
  };
}
