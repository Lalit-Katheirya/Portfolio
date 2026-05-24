import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SkillMarquee from "@/components/SkillMarquee";
import HeroTechGrid from "@/components/HeroTechGrid";
import HeroStats from "@/components/HeroStats";
import ProfilePortrait from "@/components/ProfilePortrait";

type HeroSectionProps = {
  first: string;
  last: string;
  title: string;
  tagline: string;
  profileImage: string;
  fullName: string;
  skills: string[];
  projectCount: number;
};

const HeroSection = ({
  first,
  last,
  title,
  tagline,
  profileImage,
  fullName,
  skills,
  projectCount,
}: HeroSectionProps) => (
  <section id="home" className="relative overflow-x-hidden">

    <div className="container mx-auto max-w-6xl px-4 pt-8 pb-0 sm:pt-10 lg:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16 items-center"
      >
        {/* ——— Left: copy, stack, CTAs ——— */}
        <div className="order-2 flex w-full flex-col items-center gap-4 text-center sm:gap-5 lg:order-1 lg:items-start lg:text-left lg:gap-6 lg:pr-4">
          <span className="inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-primary/35 bg-[#1a1030]/90 px-3.5 py-1.5 text-xs font-medium text-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_#6366f1]" />
            {title}
          </span>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground hidden lg:block">
              Hello, I&apos;m
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]">
              <span className="text-white">{first} </span>
              <span className="text-gradient-heading">{last}</span>
            </h1>
            <p className="text-lg font-medium text-primary lg:hidden pt-1">
              {title}
            </p>
            <p className="hidden lg:block text-xl font-medium text-primary pt-1">
              {title}
              <span className="animate-pulse ml-0.5">|</span>
            </p>
          </div>

          <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-white/70 sm:max-w-md sm:text-base lg:mx-0 lg:max-w-md">
            {tagline}
          </p>

          <HeroTechGrid skills={skills} className="lg:hidden -mt-1" />

          <SkillMarquee
            skills={skills}
            compact
            className="hidden w-full max-w-md lg:block lg:mx-0"
          />

          <div className="flex w-full max-w-[300px] flex-col gap-3 pt-1 sm:max-w-sm lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-start">
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[hsl(262_83%_58%)] px-5 py-3 text-sm font-semibold text-white shadow-glow-primary transition-opacity hover:opacity-90 sm:px-6 lg:w-auto lg:rounded-lg lg:py-2.5"
            >
              View My Work
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <ArrowRight size={14} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-primary/60 bg-transparent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/10 sm:px-6 lg:w-auto lg:rounded-lg lg:py-2.5"
            >
              Contact Me
            </a>
          </div>

        </div>

        {/* ——— Right: portrait + carousel ——— */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="order-1 flex w-full flex-col items-center overflow-visible lg:order-2 lg:items-end lg:pr-6 xl:pr-10"
        >
          <ProfilePortrait
            src={profileImage}
            alt={fullName}
            className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[520px]"
          />
        </motion.div>
      </motion.div>

      <HeroStats projectCount={projectCount} className="mt-6 sm:mt-8 lg:mt-10" />
    </div>
  </section>
);

export default HeroSection;
