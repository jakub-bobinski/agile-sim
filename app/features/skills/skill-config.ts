import type { SkillId } from "./types";

type SkillConfig = {
  name: string;
  description: string;
  baseCost: number;
  costStep: number;
};

export const SKILL_CONFIG: Record<SkillId, SkillConfig> = {
  clickPower: {
    name: "Click Power",
    description: "Each click adds more progress to a task.",
    baseCost: 1,
    costStep: 2,
  },
  aiIntern: {
    name: "AI Intern",
    description: "Automatically works on tasks over time.",
    baseCost: 5,
    costStep: 3,
  },
};
