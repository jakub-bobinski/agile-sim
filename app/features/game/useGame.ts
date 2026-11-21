import { useEffect, useReducer } from "react";
import type { Task } from "~/features/board/types";
import { INTERN_TICK_MS } from "~/features/skills/ai-intern";
import { getClickPower, getSkillOptions } from "~/features/skills/skill-rules";
import type { SkillId } from "~/features/skills/types";
import { getSprintProgress } from "~/features/sprint/sprint-rules";
import { createInitialGameState, gameReducer } from "./game-reducer";

export function useGame(initialTasks: Task[]) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialTasks,
    createInitialGameState,
  );

  // Only "are there any interns?" matters here: the reducer reads the exact
  // count from state, so hiring another intern doesn't restart the timer.
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

  function upgradeSkill(skillId: SkillId) {
    dispatch({ type: "skillUpgraded", skillId });
  }

  return {
    tasks: state.tasks,
    sprintNumber: state.sprintNumber,
    points: state.points,
    clickPower: getClickPower(state.skillLevels),
    sprintProgress: getSprintProgress(state.tasks),
    skillOptions: getSkillOptions(state.skillLevels, state.points),
    clickTask,
    upgradeSkill,
  };
}
