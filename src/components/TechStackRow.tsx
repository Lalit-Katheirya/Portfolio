import { buildCarouselSkills, iconUrl, type SkillIcon } from "@/lib/skillIcons";

const DISPLAY_SLUGS = [
  "angularjs",
  "javascript",
  "typescript",
  "tailwindcss",
  "bootstrap",
];

type TechStackRowProps = {
  skills: string[];
  className?: string;
};

const TechStackRow = ({ skills, className = "" }: TechStackRowProps) => {
  const icons = buildCarouselSkills(skills).filter((icon) =>
    DISPLAY_SLUGS.includes(icon.slug)
  );

  if (icons.length === 0) return null;

  return (
    <div className={className || undefined}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80 mb-4">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-6 md:gap-8">
        {icons.map((icon) => (
          <TechStackItem key={icon.slug} icon={icon} />
        ))}
      </div>
    </div>
  );
};

const TechStackItem = ({ icon }: { icon: SkillIcon }) => (
  <div className="flex flex-col items-center gap-2 min-w-[72px]">
    <img
      src={iconUrl(icon)}
      alt={icon.label}
      className="h-8 w-8 object-contain"
      loading="lazy"
    />
    <span className="text-xs text-white/70">{icon.label}</span>
  </div>
);

export default TechStackRow;
