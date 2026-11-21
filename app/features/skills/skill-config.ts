import { TASKS_PER_SPRINT } from "~/features/sprint/create-sprint-tasks";
import type { SkillId } from "./types";

type SkillConfig = {
  name: string;
  description: string;
  baseCost: number;
  costGrowth: number;
  maxLevel?: number;
};

export const SKILL_CONFIG: Record<SkillId, SkillConfig> = {
  clickPower: {
    name: "Click Power",
    description: "Each click (yours and your interns') adds more progress.",
    baseCost: 2,
    costGrowth: 1.6,
  },
  aiIntern: {
    name: "AI Intern",
    description: "Hires an intern who slowly works on a random task.",
    baseCost: 5,
    costGrowth: 1.8,
    // More interns than tasks would just sit idle.
    maxLevel: TASKS_PER_SPRINT,
  },
};
