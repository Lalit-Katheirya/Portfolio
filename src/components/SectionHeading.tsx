import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: ReactNode;
  size?: "default" | "large";
  className?: string;
};

const SectionHeading = ({
  children,
  size = "default",
  className,
}: SectionHeadingProps) => (
  <h2
    className={cn(
      "font-bold text-gradient-heading tracking-tight",
      size === "large"
        ? "text-3xl sm:text-4xl md:text-5xl"
        : "text-2xl sm:text-3xl",
      className
    )}
  >
    {children}
  </h2>
);

export default SectionHeading;
