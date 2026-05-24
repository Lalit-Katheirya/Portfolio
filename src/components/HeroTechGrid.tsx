import { iconUrl, resolveSkillIcon, type SkillIcon } from "@/lib/skillIcons";
import { cn } from "@/lib/utils";

/** Fixed hero stack — always shown in order */
const HERO_STACK_SKILLS = [
  "Firebase",
  "MongoDB",
  "SQL",
  "PostgreSQL",
  "AWS (EC2, S3, IAM)",
  "Docker",
] as const;

const DISPLAY_LABELS: Record<string, string> = {
  mysql: "SQL",
  amazonwebservices: "AWS",
};

type HeroTechGridProps = {
  skills: string[];
  className?: string;
};

const GridItem = ({ icon }: { icon: SkillIcon }) => {
  const isAws = icon.slug === "amazonwebservices";

  return (
    <div className="flex items-center gap-1.5 px-0.5 py-1">
      <img
        src={iconUrl(icon)}
        alt={DISPLAY_LABELS[icon.slug] ?? icon.label}
        className={cn(
          "shrink-0 object-contain",
          isAws ? "h-[14px] w-auto max-w-[26px]" : "h-[18px] w-[18px]"
        )}
        loading="lazy"
      />
      <span className="text-[10px] font-normal leading-none text-white/55">
        {DISPLAY_LABELS[icon.slug] ?? icon.label}
      </span>
    </div>
  );
};

const HeroTechGrid = ({ skills, className }: HeroTechGridProps) => {
  void skills;

  const icons = HERO_STACK_SKILLS.map((name) => resolveSkillIcon(name)).filter(
    (icon): icon is SkillIcon => icon !== null
  );

  if (icons.length === 0) return null;

  return (
    <div className={cn("mx-auto w-fit", className)}>
      <div className="rounded-xl border border-white/[0.08] bg-[#111111] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="grid grid-cols-3 gap-x-3 gap-y-1.5 sm:gap-x-4">
          {icons.map((icon) => (
            <GridItem key={icon.slug} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTechGrid;
