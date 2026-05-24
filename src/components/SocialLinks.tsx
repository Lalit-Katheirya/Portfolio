import type { ComponentType } from "react";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export type SocialLinksData = {
  github?: string;
  linkedin?: string;
  upwork?: string;
};

type SocialLinksProps = SocialLinksData & {
  variant?: "icons" | "inline" | "tiles" | "compact";
  size?: "sm" | "md";
  className?: string;
};

const UpworkIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.643-2.777-2.142-4.259-2.142-3.56 0-5.86 2.783-6.68 7.147L2.1 20.002h3.177l1.2-6.772c.48-2.705 1.854-4.507 3.58-4.507 1.009 0 1.412.678 1.412 1.622l-.004.18-1.17 6.477h3.176l1.15-6.477c.48-2.705 1.853-4.507 3.58-4.507 1.01 0 1.412.678 1.412 1.622l-.005.18-1.168 6.477h3.176l1.27-7.15c.56-3.177-.28-5.37-2.998-5.37z" />
  </svg>
);

const SocialLinks = ({
  github,
  linkedin,
  upwork,
  variant = "icons",
  size = "sm",
  className,
}: SocialLinksProps) => {
  const iconSize = size === "sm" ? 16 : 20;
  const items: Array<{
    href: string;
    label: string;
    Icon: ComponentType<{ size?: number }>;
  }> = [];

  if (github) items.push({ href: github, label: "GitHub", Icon: Github });
  if (linkedin) items.push({ href: linkedin, label: "LinkedIn", Icon: Linkedin });
  if (upwork) items.push({ href: upwork, label: "Upwork", Icon: UpworkIcon });

  if (items.length === 0) return null;

  if (variant === "tiles") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {items.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#121212] text-white/90 hover:border-primary/50 hover:bg-primary/10 transition-colors"
          >
            <Icon size={iconSize} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {items.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition-all hover:border-primary/45 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_16px_rgba(99,102,241,0.25)]"
          >
            <Icon size={iconSize} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap gap-4", className)}>
        {items.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            {label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-white/75 hover:text-primary transition-colors"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
