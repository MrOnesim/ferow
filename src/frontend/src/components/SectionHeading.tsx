import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  accent?: boolean;
  /** Optional smaller eyebrow label above the title */
  eyebrow?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  accent = true,
  eyebrow,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3 font-display">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-display font-bold text-foreground",
          accent && "gold-underline",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-muted-foreground text-lg leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
