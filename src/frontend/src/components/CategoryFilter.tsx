import { cn } from "@/lib/utils";
import type { ArticleCategory } from "../types";

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "education", label: "Éducation" },
  { value: "social", label: "Social" },
  { value: "formation", label: "Formation" },
  { value: "leadership", label: "Leadership" },
];

interface CategoryFilterProps {
  value: ArticleCategory;
  onChange: (category: ArticleCategory) => void;
  className?: string;
}

export function CategoryFilter({
  value,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <fieldset
      className={cn(
        "flex flex-wrap gap-2 justify-center border-none p-0 m-0",
        className,
      )}
      data-ocid="article.filter"
    >
      <legend className="sr-only">Filtrer par catégorie</legend>
      {CATEGORIES.map((cat) => (
        <button
          type="button"
          key={cat.value}
          onClick={() => onChange(cat.value)}
          data-ocid={`article.filter.${cat.value}`}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-smooth border",
            value === cat.value
              ? "bg-primary text-primary-foreground border-primary shadow-glow"
              : "bg-card text-muted-foreground border-border/40 hover:border-primary/60 hover:text-foreground",
          )}
          aria-pressed={value === cat.value}
        >
          {cat.label}
        </button>
      ))}
    </fieldset>
  );
}
