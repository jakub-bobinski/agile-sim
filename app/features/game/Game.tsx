import { Board } from "~/features/board/Board";
import type { Task } from "~/features/board/types";
import { SkillShop } from "~/features/skills/SkillShop";
import { SprintBar } from "~/features/sprint/SprintBar";
import { UserPanel } from "~/features/user-panel/UserPanel";
import { useGame } from "./useGame";

export type GameProps = {
  initialTasks: Task[];
};

export function Game({ initialTasks }: GameProps) {
  const {
    tasks,
    sprintNumber,
    points,
    clickPower,
    sprintProgress,
    sprintReward,
    skillOptions,
    clickTask,
    dropTaskToWontDo,
    upgradeSkill,
  } = useGame(initialTasks);

  return (
    <div className="flex flex-col gap-6">
      <SprintBar
        sprintNumber={sprintNumber}
        progress={sprintProgress}
        reward={sprintReward}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <div className="flex flex-col gap-6">
          <UserPanel clickPower={clickPower} points={points} />
          <SkillShop options={skillOptions} onUpgrade={upgradeSkill} />
        </div>
        <Board
          tasks={tasks}
          onTaskClick={clickTask}
          onTaskWontDo={dropTaskToWontDo}
        />
      </div>
    </div>
  );
}
