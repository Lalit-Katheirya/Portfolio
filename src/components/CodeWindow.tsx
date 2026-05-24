import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CodeWindowProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
};

const CodeWindow = ({ children, className, align = "left" }: CodeWindowProps) => (
  <div
    className={cn(
      "w-full max-w-xl",
      align === "right" ? "ml-auto" : "mr-auto",
      className
    )}
  >
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1a1a] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <pre className="overflow-x-auto p-5 font-jetbrains text-sm leading-relaxed text-gray-300">
        {children}
      </pre>
    </div>
  </div>
);

export default CodeWindow;
