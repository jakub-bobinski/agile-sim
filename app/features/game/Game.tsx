import { useState } from "react";
import { Board } from "~/features/board/Board";
import { applyClick } from "~/features/board/task-rules";
import type { Task } from "~/features/board/types";
import { createSprintTasks } from "~/features/sprint/create-sprint-tasks";
import { SprintBar } from "~/features/sprint/SprintBar";
import { UserPanel } from "~/features/user-panel/UserPanel";
import { SkillShop } from "~/features/skills/SkillShop";
import {
  getSprintProgress,
  getSprintReward,
  isSprintComplete,
} from "~/features/sprint/sprint-rules";
import type { SkillId, SkillLevels } from "~/features/skills/types";
import {
  applyUpgrade,
  getClickPower,
  getSkillOptions,
} from "~/features/skills/skill-rules";

export type GameProps = {
  initialTasks: Task[];
};

export function Game({ initialTasks }: GameProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [sprintNumber, setSprintNumber] = useState(1);
  const [skillLevels, setSkillLevels] = useState<SkillLevels>({
    clickPower: 0,
    aiIntern: 0,
  });
  const [points, setPoints] = useState(0);
  const clickPower = getClickPower(skillLevels);
  const skillOptions = getSkillOptions(skillLevels, points);

  function handleTaskClick(taskId: string) {
    const nextTasks = tasks.map((task) =>
      task.id === taskId ? applyClick(task, clickPower) : task,
    );

    if (isSprintComplete(nextTasks)) {
      const nextSprintNumber = sprintNumber + 1;
      setPoints(points + getSprintReward(sprintNumber));
      setSprintNumber(nextSprintNumber);
      setTasks(createSprintTasks(nextSprintNumber));
    } else {
      setTasks(nextTasks);
    }
  }

  function handleUpgrade(skillId: SkillId) {
    const next = applyUpgrade({ skillLevels, points }, skillId);
    setSkillLevels(next.skillLevels);
    setPoints(next.points);
  }

  return (
    <div className="flex flex-col gap-6">
      <SprintBar
        sprintNumber={sprintNumber}
        progress={getSprintProgress(tasks)}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr]">
        <div className="flex flex-col gap-6">
          <UserPanel clickPower={clickPower} points={points} />
          <SkillShop options={skillOptions} onUpgrade={handleUpgrade} />
        </div>
        <Board tasks={tasks} onTaskClick={handleTaskClick} />
      </div>
    </div>
  );
}
