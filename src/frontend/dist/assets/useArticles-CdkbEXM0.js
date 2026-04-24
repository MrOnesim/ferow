import { j as jsxRuntimeExports, L as Link } from "./index-Cu0pNX-b.js";
import { c as cn } from "./Layout-DC7T_d2S.js";
import { c as createLucideIcon, m as motion, u as useActor, b as useQuery, a as createActor } from "./backend-DoU0t11f.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const CATEGORY_LABELS = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership",
  all: "Tous"
};
const CATEGORY_COLORS = {
  education: "bg-primary/20 text-primary border border-primary/30",
  social: "bg-emerald-900/30 text-emerald-400 border border-emerald-400/30",
  formation: "bg-violet-900/30 text-violet-400 border border-violet-400/30",
  leadership: "bg-amber-900/30 text-amber-400 border border-amber-400/30",
  all: "bg-muted text-muted-foreground"
};
function ArticleCard({
  article,
  index = 0,
  className
}) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.1 },
      className: cn(
        "card-elevated card-hover group flex flex-col overflow-hidden",
        className
      ),
      "data-ocid": `article.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden h-52", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: article.imageUrl,
              alt: article.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "badge-category absolute top-3 left-3",
                CATEGORY_COLORS[article.category] || CATEGORY_COLORS.all
              ),
              "data-ocid": `article.category.${index + 1}`,
              children: CATEGORY_LABELS[article.category] || article.category
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("time", { children: formattedDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg leading-snug mb-3 line-clamp-2 group-hover:text-accent transition-colors", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3", children: article.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog/$id",
              params: { id: article.id },
              className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors group/link",
              "data-ocid": `article.read_more.${index + 1}`,
              children: [
                "Lire plus",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover/link:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function mapArticle(a) {
  return {
    id: String(a.id),
    title: a.title,
    content: a.content,
    excerpt: a.excerpt,
    imageUrl: a.image.getDirectURL(),
    category: a.category.toLowerCase(),
    createdAt: new Date(Number(a.created_at) / 1e6).toISOString(),
    published: a.published
  };
}
function useGetPublishedArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles", "published"],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getPublishedArticles();
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function useGetRecentArticles(limit = 3) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles", "recent", limit],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getRecentArticles(BigInt(limit));
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function useGetArticleById(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      if (!actor) return void 0;
      const article = await actor.getArticleById(BigInt(id));
      return article ? mapArticle(article) : void 0;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 5 * 60 * 1e3
  });
}
export {
  ArrowRight as A,
  Calendar as C,
  ArticleCard as a,
  useGetPublishedArticles as b,
  useGetArticleById as c,
  useGetRecentArticles as u
};
