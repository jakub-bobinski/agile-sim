export const SKILL_IDS = ["clickPower", "aiIntern"] as const;
export type SkillId = (typeof SKILL_IDS)[number];

export type SkillLevels = Record<SkillId, number>;
