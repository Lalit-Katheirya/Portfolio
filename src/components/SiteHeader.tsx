import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/BrandLogo";
import SocialLinks, { type SocialLinksData } from "@/components/SocialLinks";

export type NavItem = { id: string; label: string };

type SiteHeaderProps = {
  navItems: NavItem[];
  profileImage: string;
  name: string;
  firstName: string;
  lastName: string;
  social?: SocialLinksData;
};

const SiteHeader = ({
  navItems,
  profileImage,
  name,
  firstName,
  lastName,
  social,
}: SiteHeaderProps) => {
  const [activeId, setActiveId] = useState("home");
  const [open, setOpen] = useState(false);

  const linkClass = (id: string) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors hover:text-primary",
      activeId === id ? "text-primary" : "text-white/65"
    );

  const connectButtonClass =
    "inline-flex items-center justify-center rounded-lg border border-primary/60 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/10";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a
          href="#home"
          className="inline-flex shrink-0 items-center gap-3"
          aria-label={`${name} — Home`}
        >
          <span className="text-lg font-bold tracking-tight lg:hidden">
            <span className="text-white">{firstName} </span>
            <span className="text-gradient-heading">{lastName}</span>
          </span>
          <BrandLogo className="hidden lg:inline-flex" />
        </a>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={linkClass(item.id)}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
              {activeId === item.id ? (
                <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {social ? (
            <SocialLinks
              {...social}
              size="sm"
              className="hidden sm:flex"
            />
          ) : null}
          <a
            href="#contact"
            className={cn("max-lg:hidden", connectButtonClass)}
            onClick={() => setActiveId("contact")}
          >
            Let&apos;s Connect
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-primary/50 text-white shadow-[0_0_14px_hsl(239_84%_67%_/_0.3)]"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#080808] border-white/10 w-[min(100%,300px)]"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white flex items-center gap-3 text-base font-semibold">
                  <img
                    src={profileImage}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-primary/40"
                  />
                  {name}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "text-base font-medium py-1.5",
                      activeId === item.id ? "text-primary" : "text-white/75"
                    )}
                    onClick={() => {
                      setActiveId(item.id);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                {social ? (
                  <div className="pt-4 mt-2 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                      Connect
                    </p>
                    <SocialLinks {...social} />
                  </div>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
