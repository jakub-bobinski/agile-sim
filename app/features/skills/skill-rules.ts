import { SKILL_IDS, type SkillId, type SkillLevels } from "./types";
import { SKILL_CONFIG } from "./skill-config";

export type SkillOption = {
  id: SkillId;
  level: number;
  cost: number;
  canUpgrade: boolean;
};

export function getSkillCost(id: SkillId, skillLevels: SkillLevels): number {
  const { baseCost, costStep } = SKILL_CONFIG[id];
  return baseCost + costStep * getTotalUpgrades(skillLevels);
}

export function getSkillOptions(
  skillLevels: SkillLevels,
  points: number,
): SkillOption[] {
  return SKILL_IDS.map((id) => {
    const cost = getSkillCost(id, skillLevels);
    return { id, level: skillLevels[id], cost, canUpgrade: cost <= points };
  });
}

export function canUpgrade(
  id: SkillId,
  skillLevels: SkillLevels,
  points: number,
): boolean {
  return getSkillCost(id, skillLevels) <= points;
}

export function getTotalUpgrades(skillLevels: SkillLevels): number {
  return Object.values(skillLevels).reduce((sum, level) => sum + level, 0);
}
