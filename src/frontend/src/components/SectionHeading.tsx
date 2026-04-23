import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  accent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  accent = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <h2
        className={cn(
          "text-3xl md:text-4xl font-display font-bold text-foreground",
          accent && "blue-underline",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
