import { BookOpen, ChevronDown, Newspaper } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { Layout } from "../components/Layout";
import { useGetPublishedArticles } from "../hooks/useArticles";
import type { ArticleCategory } from "../types";

const PAGE_SIZE = 6;

const STATS = [
  { value: "+500", label: "Jeunes impactés" },
  { value: "+20", label: "Actions réalisées" },
  { value: "+5", label: "Villes touchées" },
  { value: "+1000", label: "Bénéficiaires" },
];

export default function BlogListPage() {
  const [category, setCategory] = useState<ArticleCategory>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { data: articles = [], isLoading } = useGetPublishedArticles();

  const filtered =
    category === "all"
      ? articles
      : articles.filter((a) => a.category === category);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: ArticleCategory) {
    setCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  return (
    <Layout>
      {/* ── Hero Banner ── */}
      <section
        className="relative pt-32 pb-20 overflow-hidden section-alt border-b border-border/20"
        data-ocid="blog.header"
      >
        {/* Decorative gradient orbs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl"
          style={{ background: "var(--ferow-navy-light)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 pointer-events-none blur-3xl"
          style={{ background: "var(--ferow-navy)" }}
        />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold font-display">
              <Newspaper className="w-4 h-4" />
              Blog &amp; Actualités
            </span>

            <h1 className="text-4xl md:text-6xl font-display font-black text-foreground mb-5 leading-tight">
              Actualités &amp; Articles
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Découvrez les initiatives concrètes menées par FEROW pour impacter
              la société. Restez informé de nos actions, formations et
              événements.
            </p>
          </motion.div>

          {/* Mini stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            data-ocid="blog.stats"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="card-elevated px-4 py-3 text-center"
              >
                <p className="font-display font-black text-xl text-primary">
                  {s.value}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Article Grid ── */}
      <section className="py-20 bg-background" data-ocid="blog.list">
        <div className="container mx-auto px-4">
          {/* Filter chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <CategoryFilter value={category} onChange={handleCategoryChange} />
          </motion.div>

          {/* Loading skeletons */}
          {isLoading && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="blog.loading_state"
            >
              {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="card-elevated overflow-hidden animate-pulse"
                  >
                    <div className="h-52 bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-muted rounded w-1/3" />
                      <div className="h-5 bg-muted rounded w-4/5" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-3/5" />
                      <div className="h-4 bg-muted rounded w-1/4 mt-2" />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-24"
              data-ocid="blog.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-9 h-9 text-muted-foreground" />
              </div>
              <p className="text-xl font-display font-semibold text-foreground mb-2">
                Aucun article dans cette catégorie
              </p>
              <p className="text-muted-foreground">
                Essayez de sélectionner une autre catégorie ou revenez plus
                tard.
              </p>
            </motion.div>
          )}

          {/* Article cards */}
          {!isLoading && visible.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visible.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Load more */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full font-semibold font-display transition-smooth"
                    data-ocid="blog.load_more_button"
                  >
                    <ChevronDown className="w-4 h-4" />
                    Charger plus d'articles
                  </button>
                </motion.div>
              )}

              {/* Article count info */}
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Affichage de {visible.length} sur {filtered.length} articles
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
