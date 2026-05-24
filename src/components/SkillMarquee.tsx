import { useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { buildCarouselSkills, iconUrl, type SkillIcon } from "@/lib/skillIcons";
import { cn } from "@/lib/utils";

type SkillMarqueeProps = {
  skills: string[];
  compact?: boolean;
  className?: string;
};

const SkillItem = ({
  icon,
  compact,
}: {
  icon: SkillIcon;
  compact?: boolean;
}) => (
  <div
    className={cn(
      "flex min-w-0 shrink-0 items-center",
      compact ? "gap-1.5 px-3" : "gap-2.5 px-4 md:px-5"
    )}
  >
    <img
      src={iconUrl(icon)}
      alt={icon.label}
      className={cn(
        "object-contain",
        compact ? "h-4 w-4" : "h-6 w-6"
      )}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
    <span
      className={cn(
        "font-normal text-white/60 whitespace-nowrap",
        compact ? "text-xs" : "text-sm text-white/75"
      )}
    >
      {icon.displayLabel ?? icon.label}
    </span>
  </div>
);

const SkillMarquee = ({
  skills,
  compact = false,
  className,
}: SkillMarqueeProps) => {
  const icons = useMemo(() => buildCarouselSkills(skills), [skills]);
  const slides = useMemo(() => [...icons, ...icons], [icons]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
      watchDrag: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1.2,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins()?.autoScroll?.play();
  }, [emblaApi]);

  if (icons.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden marquee-fade",
          compact ? "py-1" : "rounded-lg py-2"
        )}
      >
        <div ref={emblaRef} className="overflow-hidden" aria-label="Skills carousel">
          <div className="flex touch-pan-y">
            {slides.map((icon, index) => (
              <SkillItem
                key={`${icon.slug}-${index}`}
                icon={icon}
                compact={compact}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMarquee;
