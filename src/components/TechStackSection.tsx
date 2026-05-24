import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { iconUrl, resolveSkillIcon } from "@/lib/skillIcons";

type TechStackSectionProps = {
  skills: Record<string, string[]>;
};

const CATEGORY_ORDER = [
  "frontend",
  "backend",
  "cloudDevOps",
  "stateManagement",
  "tools",
  "aiTools",
  "softSkills",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  cloudDevOps: "Cloud Dev Ops",
  stateManagement: "State Management",
  tools: "Tools",
  aiTools: "AI Tools",
  softSkills: "Soft Skills",
};

const SkillPill = ({ name }: { name: string }) => {
  const icon = resolveSkillIcon(name);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0d0d0d] px-2.5 py-1.5 text-[11px] sm:text-xs text-white/90">
      {icon ? (
        <img
          src={iconUrl(icon)}
          alt=""
          className="h-3.5 w-3.5 shrink-0 object-contain sm:h-4 sm:w-4"
          loading="lazy"
        />
      ) : (
        <Sparkles
          className="h-3.5 w-3.5 shrink-0 text-primary/70 sm:h-4 sm:w-4"
          aria-hidden
        />
      )}
      <span className="leading-none">{name}</span>
    </span>
  );
};

const TechStackSection = ({ skills }: TechStackSectionProps) => {
  const categories = CATEGORY_ORDER.filter(
    (key) => Array.isArray(skills[key]) && skills[key].length > 0
  );

  if (categories.length === 0) return null;

  return (
    <section id="skills" className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
      <SectionHeader
        title="Tech Stack"
        subtitle="Technologies and tools I work with"
        className="mb-10 sm:mb-12"
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
        {categories.map((key, index) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-4 sm:px-5 sm:py-5"
          >
            <h3
              className={cn(
                "mb-3 text-[11px] font-bold uppercase tracking-[0.18em] sm:mb-4 sm:text-xs",
                "text-white"
              )}
            >
              {CATEGORY_LABELS[key] ?? key}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills[key].map((skill) => (
                <SkillPill key={skill} name={skill} />
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
