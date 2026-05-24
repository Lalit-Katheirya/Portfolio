import type { LucideIcon } from "lucide-react";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfilePortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

const GlassCard = ({
  icon: Icon,
  title,
  subtitle,
  className,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  className?: string;
}) => (
  <div
    className={cn(
      "absolute z-40 min-w-[108px] max-w-[140px] rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      "sm:min-w-[120px] sm:px-3.5 sm:py-2.5",
      "lg:min-w-[128px] lg:max-w-[150px] lg:px-4 lg:py-3",
      className
    )}
  >
    <Icon className="mb-1 h-3.5 w-3.5 text-[#60a5fa] drop-shadow-[0_0_6px_rgba(96,165,250,0.8)] sm:mb-1.5 sm:h-4 sm:w-4" />
    <p className="text-xs font-semibold leading-tight text-white sm:text-sm">{title}</p>
    <p className="mt-0.5 text-[9px] leading-snug text-white/50 sm:text-[10px]">{subtitle}</p>
  </div>
);

const AvailableBadge = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "absolute z-50 flex min-w-[118px] max-w-[150px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      "sm:min-w-[130px] sm:gap-2.5 sm:px-3.5 sm:py-2.5",
      "lg:min-w-[140px] lg:px-4 lg:py-3",
      className
    )}
  >
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-50" />
      <span className="relative h-2.5 w-2.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
    </span>
    <div className="text-left leading-tight">
      <p className="text-sm font-semibold text-[#4ade80]">Available</p>
      <p className="mt-0.5 text-[10px] text-white/50">Open to work</p>
    </div>
  </div>
);

const ProfilePortrait = ({ src, alt, className }: ProfilePortraitProps) => (
  <div
    className={cn(
      "relative w-full overflow-hidden lg:overflow-visible",
      className
    )}
  >
    <div
      className={cn(
        "relative mx-auto w-full",
        "h-[340px] max-w-[320px]",
        "sm:h-[400px] sm:max-w-[360px]",
        "md:h-[440px] md:max-w-[420px]",
        "lg:h-[500px] lg:max-w-[480px]",
        "xl:h-[520px] xl:max-w-[500px]"
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute bottom-0 left-1/2 z-10 -translate-x-1/2 object-contain object-bottom",
          "h-[88%] w-auto max-w-[78%]",
          "sm:h-[90%] sm:max-w-[80%]",
          "lg:h-[92%] lg:max-w-[82%]"
        )}
      />

      {/* Top-left — Clean Code */}
      <GlassCard
        icon={Code2}
        title="Clean Code"
        subtitle="Better Solutions"
        className={cn(
          "left-1 top-[6%]",
          "sm:left-0 sm:top-[5%]",
          "lg:-left-[10%] lg:top-[4%] xl:-left-[12%]"
        )}
      />

      {/* Middle-left — Performance */}
      <GlassCard
        icon={Rocket}
        title="Performance"
        subtitle="Scalable Applications"
        className={cn(
          "left-1 top-[40%]",
          "sm:left-0 sm:top-[38%]",
          "lg:-left-[12%] lg:top-[40%] xl:-left-[14%]"
        )}
      />

      {/* Top-right — Creative */}
      <GlassCard
        icon={Lightbulb}
        title="Creative"
        subtitle="Problem Solver"
        className={cn(
          "right-1 top-[22%]",
          "sm:right-0 sm:top-[20%]",
          "lg:-right-[10%] lg:top-[8%] xl:-right-[12%]"
        )}
      />

      {/* Bottom-right — Available */}
      <AvailableBadge
        className={cn(
          "right-1 bottom-[6%]",
          "sm:right-0 sm:bottom-[8%]",
          "lg:-right-[8%] lg:bottom-[12%] xl:-right-[10%] xl:bottom-[14%]"
        )}
      />
    </div>
  </div>
);

export default ProfilePortrait;
