import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { Layout } from "../components/Layout";
import {
  useGetArticleById,
  useGetPublishedArticles,
} from "../hooks/useArticles";

const CATEGORY_LABELS: Record<string, string> = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership",
};

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-primary/20 text-primary border border-primary/30",
  social: "bg-emerald-900/30 text-emerald-400 border border-emerald-400/30",
  formation: "bg-violet-900/30 text-violet-400 border border-violet-400/30",
  leadership: "bg-amber-900/30 text-amber-400 border border-amber-400/30",
};

export default function BlogDetailPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: article, isLoading } = useGetArticleById(id);
  const { data: allArticles = [] } = useGetPublishedArticles();

  // SEO: update document title
  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Pantheon`;
    }
    return () => {
      document.title =
        "Pantheon — Mouvement National de Leadership et d'Impact Social";
    };
  }, [article]);

  const related = allArticles
    .filter((a) => a.id !== id && a.category === article?.category)
    .slice(0, 3);

  // WhatsApp share URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `${article?.title ?? ""} — Découvrez cet article de Pantheon : ${shareUrl}`,
  )}`;

  // ── Loading state ──
  if (isLoading) {
    return (
      <Layout>
        <div
          className="pt-32 pb-20 container mx-auto px-4"
          data-ocid="article.loading_state"
        >
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
            <div className="h-5 bg-muted rounded w-28" />
            <div className="h-4 bg-muted rounded w-20" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-5 bg-muted rounded w-40" />
            <div className="h-80 bg-muted rounded-2xl" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
                <div
                  key={`skeleton-line-${i}`}
                  className="h-4 bg-muted rounded"
                  style={{ width: `${85 + (i % 3) * 5}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Not found state ──
  if (!article) {
    return (
      <Layout>
        <div
          className="pt-40 pb-20 text-center container mx-auto px-4"
          data-ocid="article.error_state"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Tag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Article introuvable
          </h1>
          <p className="text-muted-foreground mb-8">
            Cet article n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/blog"
            className="btn-primary"
            data-ocid="article.back_to_blog"
          >
            ← Retour aux actualités
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const categoryColor =
    CATEGORY_COLORS[article.category] || CATEGORY_COLORS.education;

  return (
    <Layout>
      {/* ── Full-width Hero Image ── */}
      <div
        className="relative w-full h-64 md:h-[480px] overflow-hidden"
        data-ocid="article.hero_image"
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button overlaid on image */}
        <div className="absolute top-0 left-0 right-0 pt-24 container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full"
            data-ocid="article.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
        </div>
      </div>

      {/* ── Article Header ── */}
      <section
        className="-mt-16 relative z-10 pb-10 section-alt border-b border-border/20"
        data-ocid="article.header"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Category + date row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`badge-category ${categoryColor}`}>
                <Tag className="w-3 h-3" />
                {CATEGORY_LABELS[article.category] || article.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <time>{formattedDate}</time>
              </span>
              {article.author && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  {article.author}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <p
              className="text-muted-foreground text-lg leading-relaxed border-l-4 pl-4 italic mb-8"
              style={{ borderColor: "var(--pantheon-gold-light)" }}
            >
              {article.excerpt}
            </p>

            {/* Share row */}
            <div
              className="flex flex-wrap items-center gap-3"
              data-ocid="article.share_section"
            >
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Share2 className="w-4 h-4" />
                Partager :
              </span>
              <a
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/30 text-emerald-400 border border-emerald-400/30 rounded-full text-sm font-semibold hover:bg-emerald-900/50 transition-smooth"
                data-ocid="article.whatsapp_share"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="py-14 bg-background" data-ocid="article.content">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="
                prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-img:rounded-xl prose-img:shadow-elevated
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:marker:text-primary
              "
              // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled HTML from admin CMS
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>

          {/* Bottom share nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border/20 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              data-ocid="article.bottom_back_link"
            >
              <ArrowLeft className="w-4 h-4" />← Retour aux actualités
            </Link>

            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-400/30 rounded-lg text-sm font-semibold hover:bg-emerald-900/50 transition-smooth"
              data-ocid="article.bottom_whatsapp_share"
            >
              <MessageCircle className="w-4 h-4" />
              Partager sur WhatsApp
            </a>
          </motion.div>
        </div>
      </article>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section
          className="py-16 section-alt border-t border-border/20"
          data-ocid="article.related"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-display font-bold text-foreground mb-8 blue-underline text-center"
            >
              Articles similaires
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <ArticleCard key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
