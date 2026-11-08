import { SKILL_CONFIG } from "./skill-config";
import type { SkillOption } from "./skill-rules";
import type { SkillId } from "./types";

export type SkillShopProps = {
  options: SkillOption[];
  onUpgrade: (skillId: SkillId) => void;
};

export function SkillShop({ options, onUpgrade }: SkillShopProps) {
  return (
    <section
      aria-labelledby="skill-shop-heading"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2
        id="skill-shop-heading"
        className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase"
      >
        Skills
      </h2>
      <ul className="flex flex-col gap-3">
        {options.map(({ id, level, cost, canUpgrade }) => {
          const { name, description } = SKILL_CONFIG[id];

          return (
            <li
              key={id}
              className="rounded-lg border border-slate-100 bg-slate-50 p-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{name}</h3>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 tabular-nums">
                  Lvl {level}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">{description}</p>
              <button
                type="button"
                disabled={!canUpgrade}
                onClick={() => {
                  onUpgrade(id);
                }}
                className="mt-3 w-full cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:active:scale-100"
              >
                Upgrade <span className="sr-only">{name}</span>
                <span className="tabular-nums">· {cost} pts</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
