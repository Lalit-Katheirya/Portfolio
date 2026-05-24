import { motion } from "framer-motion";
import JobCodeWindow, { type JobData } from "@/components/JobCodeWindow";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type ExperienceTimelineProps = {
  jobs: JobData[];
};

const ExperienceTimeline = ({ jobs }: ExperienceTimelineProps) => (
  <section id="experience" className="container mx-auto px-4 py-20 md:py-28">
    <SectionHeader
      title="Experience"
      subtitle="The positions I have worked in my career so far"
      className="mb-14 md:mb-20"
    />

    <div className="relative mx-auto max-w-4xl">
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/15 md:-translate-x-1/2"
        aria-hidden
      />

      <div className="space-y-14 md:space-y-20">
        {jobs.map((job, index) => {
          const isRight = index % 2 === 1;

          return (
            <motion.div
              key={`${job.title}-${job.company}-${index}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                "relative pl-12 md:pl-0",
                isRight ? "md:flex md:justify-end" : "md:flex md:justify-start"
              )}
            >
              <span
                className={cn(
                  "absolute top-6 h-3 w-3 rounded-full border-2 border-white/30 bg-black",
                  "left-4 md:left-1/2 md:-translate-x-1/2"
                )}
                aria-hidden
              />

              <JobCodeWindow
                job={job}
                index={index}
                align={isRight ? "right" : "left"}
                className={cn(
                  "md:w-[calc(50%-2.5rem)]",
                  isRight ? "md:pr-8" : "md:pl-8"
                )}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ExperienceTimeline;
