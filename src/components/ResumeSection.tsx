import { Link } from "react-router-dom";
import { Eye, Lock, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { DEFAULT_RESUME_URL, resumeDownloadName } from "@/lib/resume";

type ResumeSectionProps = {
  name: string;
  title?: string;
  resumeUrl?: string;
};

const SkeletonLine = ({ className }: { className?: string }) => (
  <div className={cn("h-2 rounded-full bg-white/10", className)} />
);

const ResumePreview = ({ name, title }: { name: string; title?: string }) => (
  <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[1fr_100px] md:p-8 min-h-[240px] md:min-h-[300px]">
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
        {title ? (
          <p className="mt-1 text-xs font-medium text-primary">{title}</p>
        ) : null}
      </div>
      <div className="space-y-2.5 pt-1">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-[92%]" />
        <SkeletonLine className="w-[85%]" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-[78%]" />
      </div>
      <div className="space-y-2.5 pt-3">
        <SkeletonLine className="w-[70%]" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-[88%]" />
      </div>
      <div className="space-y-2.5 pt-3">
        <SkeletonLine className="w-[65%]" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-[80%]" />
      </div>
    </div>
    <div className="hidden space-y-3 border-l border-white/5 pl-4 sm:block">
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-[90%]" />
      <SkeletonLine className="w-full" />
      <div className="space-y-2.5 pt-4">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-[85%]" />
      </div>
    </div>
  </div>
);

const ResumeSection = ({
  name,
  title,
  resumeUrl = DEFAULT_RESUME_URL,
}: ResumeSectionProps) => {
  const downloadName = resumeDownloadName(name);
  const fileLabel = downloadName;

  return (
    <section id="resume" className="scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <SectionHeader
            title="Resume"
            subtitle="View my experience online or download my CV"
            className="mb-10 md:mb-12"
          />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#141414] px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-[#0d0d0d] px-2.5 py-1.5 sm:px-3">
                <Lock size={12} className="shrink-0 text-white/35" />
                <span className="truncate font-jetbrains text-[11px] text-white/55 sm:text-xs">
                  {fileLabel}
                </span>
              </div>
              <Link
                to="/resume"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-primary/15 hover:text-primary"
                aria-label="View resume"
                title="View resume"
              >
                <Eye size={16} />
              </Link>
            </div>

            <Link
              to="/resume"
              className="group relative block bg-[#1c1c1c] outline-none transition-colors hover:bg-[#222]"
            >
              <ResumePreview name={name} title={title} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/50 group-focus-visible:bg-black/50">
                <span className="flex scale-95 items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 sm:text-sm">
                  <MousePointerClick size={16} className="text-primary" />
                  Click to view resume
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
