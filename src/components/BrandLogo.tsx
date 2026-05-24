import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

/** Modern LK monogram for desktop header */
const BrandLogo = ({ className }: BrandLogoProps) => (
  <span
    className={cn(
      "group relative inline-flex h-11 w-11 shrink-0 items-center justify-center transition-transform hover:scale-[1.02]",
      className
    )}
    aria-hidden
  >
    <span className="absolute inset-0 rounded-[11px] bg-gradient-to-br from-[#8a2be2] via-[#6366f1] to-[#4169e1] opacity-90 shadow-[0_0_22px_rgba(99,102,241,0.4)] transition-shadow group-hover:shadow-[0_0_30px_rgba(99,102,241,0.55)]" />
    <span className="absolute inset-[1.5px] rounded-[9px] bg-[#0a0a0f]" />
    <span className="absolute inset-[1.5px] rounded-[9px] bg-gradient-to-br from-primary/20 via-transparent to-[#4169e1]/10" />
    <span className="relative z-10 font-bold text-[15px] leading-none tracking-[-0.05em]">
      <span className="text-white">L</span>
      <span className="bg-gradient-to-r from-[#c4b5fd] via-[#a5b4fc] to-[#60a5fa] bg-clip-text text-transparent">
        K
      </span>
    </span>
  </span>
);

export default BrandLogo;
