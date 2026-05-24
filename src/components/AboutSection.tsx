import { motion } from "framer-motion";
import { Code2, MapPin, Rocket, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  first: string;
  last: string;
  title: string;
  summary: string;
  aboutParagraphs?: string[];
  location?: string;
  interests?: string[];
  projectCount: number;
  experienceYears?: number;
};

const highlights = [
  {
    icon: Code2,
    title: "Clean Architecture",
    text: "Maintainable, testable codebases built for long-term growth.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    text: "Fast load times, smooth UX, and optimized hybrid experiences.",
  },
  {
    icon: Sparkles,
    title: "User-Centered",
    text: "Interfaces that feel intuitive—from idea to production.",
  },
];

const AboutSection = ({
  first,
  last,
  title,
  summary,
  aboutParagraphs = [],
  location,
  interests = [],
  projectCount,
  experienceYears = 4,
}: AboutSectionProps) => {
  const paragraphs =
    aboutParagraphs.length > 0
      ? aboutParagraphs
      : [
          "I collaborate closely with teams and clients to ship reliable software—from responsive dashboards and hybrid mobile apps to RESTful APIs and Firebase-backed platforms.",
        ];

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-white/[0.06] bg-black py-16 sm:py-20 md:py-24"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="Who I am and what I bring to your team"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            <p className="text-sm font-medium text-primary sm:text-base">
              {title}
            </p>

            <div className="relative pl-4 sm:pl-5">
              <span
                className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-0.5 rounded-full bg-gradient-to-b from-primary to-[hsl(262_83%_58%)]"
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-white/85 sm:text-base sm:leading-relaxed">
                {summary}
              </p>
            </div>

            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-sm leading-relaxed text-white/65 sm:text-base sm:leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {location ? (
              <p className="flex items-center gap-2 text-sm text-white/50">
                <MapPin size={15} className="shrink-0 text-primary" />
                {location}
              </p>
            ) : null}

            {interests.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-white/10 bg-[#0a0a0a] px-3 py-1 text-[11px] text-white/70 sm:text-xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: `${experienceYears}+`, label: "Years Experience" },
                { value: `${projectCount}+`, label: "Projects Delivered" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-4 text-center sm:py-5"
                >
                  <p className="text-2xl font-bold text-gradient-heading sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#a0a0a0] sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-xl border border-white/10 bg-[#0a0a0a] p-4 sm:p-5"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      "border border-primary/25 bg-primary/10"
                    )}
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/55 sm:text-sm">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <p className="text-center text-xs text-white/40 lg:text-left">
              <span className="text-white">{first}</span>{" "}
              <span className="text-gradient-heading">{last}</span>
              {" · "}Open to full-time & freelance opportunities
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
