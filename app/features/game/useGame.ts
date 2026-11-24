import { useEffect, useReducer } from "react";
import type { BacklogInput } from "~/features/backlog/types";
import type { Task } from "~/features/board/types";
import { INTERN_TICK_MS } from "~/features/skills/ai-intern";
import { getClickPower, getSkillOptions } from "~/features/skills/skill-rules";
import type { SkillId } from "~/features/skills/types";
import {
  getSprintProgress,
  getSprintReward,
} from "~/features/sprint/sprint-rules";
import { createInitialGameState, gameReducer } from "./game-reducer";

export function useGame(initialTasks: Task[], backlog: BacklogInput[]) {
  const [state, dispatch] = useReducer(
    gameReducer,
    createInitialGameState(initialTasks, backlog),
  );

  const hasInterns = state.skillLevels.aiIntern > 0;

  useEffect(() => {
    if (!hasInterns) return;

    const intervalId = setInterval(() => {
      dispatch({ type: "internsWorked" });
    }, INTERN_TICK_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [hasInterns]);

  function clickTask(taskId: string) {
    dispatch({ type: "taskClicked", taskId });
  }

  function dropTaskToWontDo(taskId: string) {
    dispatch({ type: "taskDroppedToWontDo", taskId });
  }

  function upgradeSkill(skillId: SkillId) {
    dispatch({ type: "skillUpgraded", skillId });
  }

  return {
    tasks: state.tasks,
    sprintNumber: state.sprintNumber,
    points: state.points,
    clickPower: getClickPower(state.skillLevels),
    sprintProgress: getSprintProgress(state.tasks),
    sprintReward: getSprintReward(state.sprintNumber, state.tasks),
    skillOptions: getSkillOptions(state.skillLevels, state.points),
    clickTask,
    dropTaskToWontDo,
    upgradeSkill,
  };
}
