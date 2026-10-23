export type SprintBarProps = {
  progress: number;
};

export function SprintBar({ progress }: SprintBarProps) {
  return <span>{Math.round(progress)}%</span>;
}
