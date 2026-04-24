import { r as reactExports, j as jsxRuntimeExports } from "./index-Cu0pNX-b.js";
import { b as useGetPublishedArticles, a as ArticleCard } from "./useArticles-CdkbEXM0.js";
import { a as CategoryFilter, B as BookOpen, C as ChevronDown } from "./CategoryFilter-DpsupPho.js";
import { L as Layout } from "./Layout-DC7T_d2S.js";
import { m as motion } from "./backend-DoU0t11f.js";
import { N as Newspaper } from "./newspaper-DMB5EspZ.js";
import { A as AnimatePresence } from "./index-DigW-PHR.js";
const PAGE_SIZE = 6;
const STATS = [
  { value: "+500", label: "Jeunes impactés" },
  { value: "+20", label: "Actions réalisées" },
  { value: "+5", label: "Villes touchées" },
  { value: "+1000", label: "Bénéficiaires" }
];
function BlogListPage() {
  const [category, setCategory] = reactExports.useState("all");
  const [visibleCount, setVisibleCount] = reactExports.useState(PAGE_SIZE);
  const { data: articles = [], isLoading } = useGetPublishedArticles();
  const filtered = category === "all" ? articles : articles.filter((a) => a.category === category);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  function handleCategoryChange(cat) {
    setCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }
  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative pt-32 pb-20 overflow-hidden section-alt border-b border-border/20",
        "data-ocid": "blog.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl",
              style: { background: "var(--ferow-navy-light)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 pointer-events-none blur-3xl",
              style: { background: "var(--ferow-navy)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.65 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold font-display", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-4 h-4" }),
                    "Blog & Actualités"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-display font-black text-foreground mb-5 leading-tight", children: "Actualités & Articles" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "Découvrez les initiatives concrètes menées par FEROW pour impacter la société. Restez informé de nos actions, formations et événements." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.25 },
                className: "mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto",
                "data-ocid": "blog.stats",
                children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "card-elevated px-4 py-3 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-xl text-primary", children: s.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: s.label })
                    ]
                  },
                  s.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "blog.list", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "mb-12",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilter, { value: category, onChange: handleCategoryChange })
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "blog.loading_state",
          children: Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map(
            (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "card-elevated overflow-hidden animate-pulse",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 bg-muted" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-1/3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-4/5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/4 mt-2" })
                  ] })
                ]
              },
              key
            )
          )
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: "text-center py-24",
          "data-ocid": "blog.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-9 h-9 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "Aucun article dans cette catégorie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Essayez de sélectionner une autre catégorie ou revenez plus tard." })
          ]
        }
      ),
      !isLoading && visible.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: visible.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article, index: i }, article.id)) }) }),
        hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3 },
            className: "mt-12 flex justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleLoadMore,
                className: "inline-flex items-center gap-2 px-8 py-3 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full font-semibold font-display transition-smooth",
                "data-ocid": "blog.load_more_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }),
                  "Charger plus d'articles"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
          "Affichage de ",
          visible.length,
          " sur ",
          filtered.length,
          " articles"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BlogListPage as default
};
