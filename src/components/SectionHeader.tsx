import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  size?: "default" | "large";
  className?: string;
  headingClassName?: string;
};

const SectionHeader = ({
  title,
  subtitle,
  size = "large",
  className,
  headingClassName,
}: SectionHeaderProps) => (
  <div className={cn("mx-auto max-w-3xl text-center", className)}>
    <SectionHeading size={size} className={cn("mb-0", headingClassName)}>
      {title}
    </SectionHeading>
    {subtitle ? (
      <p className="mt-3 text-[11px] font-normal uppercase tracking-[0.2em] text-[#a0a0a0] sm:text-xs">
        {subtitle}
      </p>
    ) : null}
  </div>
);

export default SectionHeader;
