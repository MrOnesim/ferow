import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import type { Article } from "../types";

const CATEGORY_LABELS: Record<string, string> = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership",
  all: "Tous",
};

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-primary/20 text-primary border border-primary/30",
  social: "bg-emerald-900/30 text-emerald-400 border border-emerald-400/30",
  formation: "bg-violet-900/30 text-violet-400 border border-violet-400/30",
  leadership: "bg-amber-900/30 text-amber-400 border border-amber-400/30",
  all: "bg-muted text-muted-foreground",
};

interface ArticleCardProps {
  article: Article;
  index?: number;
  className?: string;
}

export function ArticleCard({
  article,
  index = 0,
  className,
}: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "card-elevated card-hover group flex flex-col overflow-hidden",
        className,
      )}
      data-ocid={`article.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        <span
          className={cn(
            "badge-category absolute top-3 left-3",
            CATEGORY_COLORS[article.category] || CATEGORY_COLORS.all,
          )}
          data-ocid={`article.category.${index + 1}`}
        >
          {CATEGORY_LABELS[article.category] || article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <time>{formattedDate}</time>
        </div>

        <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
          {article.excerpt}
        </p>

        <Link
          to="/blog/$id"
          params={{ id: article.id }}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
          data-ocid={`article.read_more.${index + 1}`}
        >
          Lire plus
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
