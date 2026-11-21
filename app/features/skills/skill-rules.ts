import { SKILL_IDS, type SkillId, type SkillLevels } from "./types";
import { SKILL_CONFIG } from "./skill-config";

const BASE_CLICK_POWER = 1;

export type SkillOption = {
  id: SkillId;
  level: number;
  cost: number;
  isMaxed: boolean;
  canUpgrade: boolean;
};

export type SkillState = {
  skillLevels: SkillLevels;
  points: number;
};

export function getClickPower(skillLevels: SkillLevels): number {
  return BASE_CLICK_POWER + skillLevels.clickPower;
}

export function getSkillCost(id: SkillId, skillLevels: SkillLevels): number {
  const { baseCost, costGrowth } = SKILL_CONFIG[id];
  return Math.round(baseCost * costGrowth ** skillLevels[id]);
}

export function getSkillOptions(
  skillLevels: SkillLevels,
  points: number,
): SkillOption[] {
  return SKILL_IDS.map((id) => {
    const level = skillLevels[id];
    const { maxLevel } = SKILL_CONFIG[id];
    const isMaxed = maxLevel !== undefined && level >= maxLevel;
    const cost = getSkillCost(id, skillLevels);
    return { id, level, cost, isMaxed, canUpgrade: !isMaxed && cost <= points };
  });
}

export function applyUpgrade(state: SkillState, id: SkillId): SkillState {
  const { skillLevels, points } = state;
  const option = getSkillOptions(skillLevels, points).find(
    (skill) => skill.id === id,
  );
  if (!option?.canUpgrade) return state;

  return {
    skillLevels: { ...skillLevels, [id]: skillLevels[id] + 1 },
    points: points - option.cost,
  };
}
