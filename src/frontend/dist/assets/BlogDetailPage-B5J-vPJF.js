import { u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-Cu0pNX-b.js";
import { c as useGetArticleById, b as useGetPublishedArticles, C as Calendar, a as ArticleCard } from "./useArticles-CdkbEXM0.js";
import { L as Layout, M as MessageCircle } from "./Layout-DC7T_d2S.js";
import { c as createLucideIcon, m as motion } from "./backend-DoU0t11f.js";
import { A as ArrowLeft } from "./arrow-left-CCGmeogB.js";
import "./index-DigW-PHR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const CATEGORY_LABELS = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership"
};
const CATEGORY_COLORS = {
  education: "bg-primary/20 text-primary border border-primary/30",
  social: "bg-emerald-900/30 text-emerald-400 border border-emerald-400/30",
  formation: "bg-violet-900/30 text-violet-400 border border-violet-400/30",
  leadership: "bg-amber-900/30 text-amber-400 border border-amber-400/30"
};
function BlogDetailPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: article, isLoading } = useGetArticleById(id);
  const { data: allArticles = [] } = useGetPublishedArticles();
  reactExports.useEffect(() => {
    if (article) {
      document.title = `${article.title} — FEROW`;
    }
    return () => {
      document.title = "FEROW — Fédération Nationale des Mouvements de Soutien à Romuald Wadagni";
    };
  }, [article]);
  const related = allArticles.filter((a) => a.id !== id && a.category === (article == null ? void 0 : article.category)).slice(0, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
    `${(article == null ? void 0 : article.title) ?? ""} — Découvrez cet article de FEROW : ${shareUrl}`
  )}`;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pt-32 pb-20 container mx-auto px-4",
        "data-ocid": "article.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto animate-pulse space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-muted rounded w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 bg-muted rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pt-2", children: Array.from({ length: 8 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-4 bg-muted rounded",
              style: { width: `${85 + i % 3 * 5}%` }
            },
            `skeleton-line-${i}`
          )) })
        ] })
      }
    ) });
  }
  if (!article) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "pt-40 pb-20 text-center container mx-auto px-4",
        "data-ocid": "article.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-4", children: "Article introuvable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Cet article n'existe pas ou a été supprimé." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/blog",
              className: "btn-primary",
              "data-ocid": "article.back_to_blog",
              children: "← Retour aux actualités"
            }
          )
        ]
      }
    ) });
  }
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" }
  );
  const categoryColor = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.education;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full h-64 md:h-[480px] overflow-hidden",
        "data-ocid": "article.hero_image",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: article.imageUrl,
              alt: article.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 pt-24 container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog",
              className: "inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full",
              "data-ocid": "article.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Retour aux actualités"
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "-mt-16 relative z-10 pb-10 section-alt border-b border-border/20",
        "data-ocid": "article.header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.55 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge-category ${categoryColor}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                  CATEGORY_LABELS[article.category] || article.category
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("time", { children: formattedDate })
                ] }),
                article.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                  article.author
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-display font-black text-foreground leading-tight mb-6", children: article.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-muted-foreground text-lg leading-relaxed border-l-4 pl-4 italic mb-8",
                  style: { borderColor: "var(--ferow-navy-light)" },
                  children: article.excerpt
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-wrap items-center gap-3",
                  "data-ocid": "article.share_section",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                      "Partager :"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: whatsappShare,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/30 text-emerald-400 border border-emerald-400/30 rounded-full text-sm font-semibold hover:bg-emerald-900/50 transition-smooth",
                        "data-ocid": "article.whatsapp_share",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                          "WhatsApp"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "py-14 bg-background", "data-ocid": "article.content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "\n                prose prose-invert prose-lg max-w-none\n                prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground\n                prose-p:text-muted-foreground prose-p:leading-relaxed\n                prose-a:text-primary prose-a:no-underline hover:prose-a:underline\n                prose-strong:text-foreground\n                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground\n                prose-img:rounded-xl prose-img:shadow-elevated\n                prose-ul:text-muted-foreground prose-ol:text-muted-foreground\n                prose-li:marker:text-primary\n              ",
              dangerouslySetInnerHTML: { __html: article.content }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mt-12 pt-8 border-t border-border/20 flex flex-wrap items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog",
                className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium",
                "data-ocid": "article.bottom_back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  "← Retour aux actualités"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: whatsappShare,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-400/30 rounded-lg text-sm font-semibold hover:bg-emerald-900/50 transition-smooth",
                "data-ocid": "article.bottom_whatsapp_share",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                  "Partager sur WhatsApp"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 section-alt border-t border-border/20",
        "data-ocid": "article.related",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-2xl font-display font-bold text-foreground mb-8 blue-underline text-center",
              children: "Articles similaires"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: related.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article: a, index: i }, a.id)) })
        ] })
      }
    )
  ] });
}
export {
  BlogDetailPage as default
};
