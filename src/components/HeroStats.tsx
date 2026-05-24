import { Fragment } from "react";
import { Code2, Rocket, Smile, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroStatsProps = {
  projectCount: number;
  experienceYears?: number;
  className?: string;
};

const iconGlow =
  "text-[#7b7ef8] drop-shadow-[0_0_10px_rgba(99,102,241,0.85)]";

const StatItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Code2;
  value: string;
  label: string;
}) => (
  <div className="flex flex-1 flex-col items-center justify-center text-center px-3 sm:px-4">
    <div className="flex items-center justify-center gap-2 sm:gap-2.5">
      <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6 shrink-0", iconGlow)} />
      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {value}
      </span>
    </div>
    <p className="mt-2 text-[11px] sm:text-xs text-white/45 leading-snug">
      {label}
    </p>
  </div>
);

const HeroStats = ({
  projectCount,
  experienceYears = 4,
  className,
}: HeroStatsProps) => {
  const stats = [
    { icon: Code2, value: `${projectCount}+`, label: "Projects Completed" },
    { icon: Smile, value: "5+", label: "Happy Clients" },
    { icon: Trophy, value: `${experienceYears}+`, label: "Years Experience" },
    { icon: Rocket, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className={cn("w-full pb-8 sm:pb-10 lg:pb-12", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c14]/90 px-3 py-6 sm:px-6 sm:py-8 backdrop-blur-sm">
          {/* Desktop: row with floating dividers */}
          <div className="hidden lg:flex items-center justify-between">
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 ? (
                  <div
                    className="h-14 w-px shrink-0 bg-white/15"
                    aria-hidden
                  />
                ) : null}
                <StatItem {...stat} />
              </Fragment>
            ))}
          </div>

          {/* Mobile / tablet: 2×2 grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:hidden">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;
