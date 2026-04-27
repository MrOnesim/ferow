import { r as reactExports, j as jsxRuntimeExports } from "./index-CFjb6K-E.js";
import { L as Layout, C as ChevronRight } from "./Layout-BU-ph7QX.js";
import { S as SectionHeading } from "./SectionHeading-D8_rJWmf.js";
import { u as useGetPhotos } from "./useGallery-XSItgQ9P.js";
import { c as createLucideIcon, m as motion, X } from "./backend-DZFzHFEp.js";
import { A as AnimatePresence } from "./index-CT1y8vqp.js";
import { C as CircleAlert } from "./circle-alert-CTbUME7g.js";
import "./useMutation-LtZF5aIj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const GALLERY_CATEGORIES = [
  { value: "all", label: "Tous" },
  { value: "evenements", label: "Événements" },
  { value: "formations", label: "Formations" },
  { value: "actions_sociales", label: "Actions Sociales" },
  { value: "leadership", label: "Leadership" }
];
const CATEGORY_BADGE = {
  evenements: "bg-primary/20 text-primary border-primary/30",
  formations: "bg-amber-900/30 text-amber-400 border-amber-400/30",
  actions_sociales: "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
  // legacy hyphen form from old static data
  "actions-sociales": "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
  leadership: "bg-violet-900/30 text-violet-400 border-violet-400/30"
};
function getCategoryLabel(category) {
  var _a;
  return ((_a = GALLERY_CATEGORIES.find((c) => c.value === category)) == null ? void 0 : _a.label) ?? category;
}
function getImageUrl(photo) {
  try {
    return photo.image.getDirectURL();
  } catch {
    return "";
  }
}
function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext
}) {
  const item = items[currentIndex];
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);
  const imageUrl = getImageUrl(item);
  const categoryLabel = getCategoryLabel(item.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: {
        backgroundColor: "oklch(0.04 0.005 270 / 0.96)",
        backdropFilter: "blur(8px)"
      },
      onClick: onClose,
      "data-ocid": "gallery.lightbox",
      "aria-label": item.caption,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-card transition-colors",
            "aria-label": "Fermer",
            "data-ocid": "gallery.lightbox.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onPrev();
            },
            disabled: currentIndex === 0,
            className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
            "aria-label": "Image précédente",
            "data-ocid": "gallery.lightbox.prev_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onNext();
            },
            disabled: currentIndex === items.length - 1,
            className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
            "aria-label": "Image suivante",
            "data-ocid": "gallery.lightbox.next_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.92 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.92 },
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            className: "flex flex-col items-center max-w-5xl w-full",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: item.caption,
                  className: "w-full rounded-xl object-contain shadow-glow-lg",
                  style: { maxHeight: "70vh" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center max-w-2xl px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-block px-3 py-1 rounded-full text-xs font-semibold font-display border mb-3 ${CATEGORY_BADGE[item.category] ?? ""}`,
                    children: categoryLabel
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: item.caption }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 mt-2 font-mono", children: [
                  currentIndex + 1,
                  " / ",
                  items.length
                ] })
              ] })
            ]
          },
          item.id
        )
      ]
    },
    "lightbox-backdrop"
  ) });
}
function GallerySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
      "data-ocid": "gallery_page.loading_state",
      "aria-busy": "true",
      "aria-label": "Chargement des photos...",
      children: Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "aspect-[4/3] rounded-xl animate-pulse",
          style: { background: "oklch(0.13 0.01 270)" }
        },
        key
      ))
    }
  );
}
function GalleryError({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 text-center",
      "data-ocid": "gallery_page.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mb-4 opacity-70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: "Impossible de charger la galerie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm", children: "Une erreur est survenue lors du chargement des photos. Veuillez réessayer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onRetry,
            className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity",
            "data-ocid": "gallery_page.retry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
              "Réessayer"
            ]
          }
        )
      ]
    }
  );
}
function GalleryEmpty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-24 text-center",
      "data-ocid": "gallery_page.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-border/30",
            style: { background: "oklch(0.12 0.01 270)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                className: "w-10 h-10 text-muted-foreground/40",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: 1.2,
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "21 15 16 10 5 21" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: "Aucune photo disponible pour le moment." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "Les photos seront ajoutées prochainement par l'équipe Pantheon. Revenez bientôt !" })
      ]
    }
  );
}
function GalleryPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const { data: allPhotos = [], isLoading, isError, refetch } = useGetPhotos();
  const filtered = reactExports.useMemo(
    () => activeCategory === "all" ? allPhotos : allPhotos.filter((p) => p.category === activeCategory),
    [allPhotos, activeCategory]
  );
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = reactExports.useCallback(() => setLightboxIndex(null), []);
  const prevImage = reactExports.useCallback(
    () => setLightboxIndex((i) => i !== null && i > 0 ? i - 1 : i),
    []
  );
  const nextImage = reactExports.useCallback(
    () => setLightboxIndex(
      (i) => i !== null && i < filtered.length - 1 ? i + 1 : i
    ),
    [filtered.length]
  );
  reactExports.useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filtered.length) {
      setLightboxIndex(filtered.length > 0 ? filtered.length - 1 : null);
    }
  }, [filtered.length, lightboxIndex]);
  const photoCount = isLoading ? null : filtered.length;
  const subtitle = isLoading ? "Chargement..." : isError ? "Erreur de chargement" : `${photoCount} photo${photoCount !== 1 ? "s" : ""} · Filtrez par catégorie`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
        className: "relative py-28 flex items-center justify-center overflow-hidden",
        style: { background: "oklch(0.07 0.008 270)" },
        "data-ocid": "gallery_page.hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.06]",
              style: {
                backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.82 0.10 85) 1px, transparent 0)",
                backgroundSize: "40px 40px"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-30",
              style: {
                backgroundImage: "radial-gradient(circle at 70% 30%, oklch(0.75 0.12 85 / 0.4), transparent 60%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2, duration: 0.5 },
                className: "inline-block px-4 py-1.5 mb-6 rounded-full border text-sm font-semibold font-display tracking-wide",
                style: {
                  backgroundColor: "oklch(0.75 0.12 85 / 0.2)",
                  borderColor: "oklch(0.82 0.10 85 / 0.4)",
                  color: "oklch(0.90 0.08 75)"
                },
                children: "Nos moments en images"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3, duration: 0.6 },
                className: "text-4xl md:text-6xl font-display font-black text-foreground mb-4",
                children: [
                  "Galerie",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-transparent bg-clip-text",
                      style: {
                        backgroundImage: "linear-gradient(135deg, oklch(0.75 0.12 85), oklch(0.90 0.08 75))"
                      },
                      children: "Photo"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.5, duration: 0.5 },
                className: "text-muted-foreground text-lg max-w-xl mx-auto",
                children: "Revivez nos événements, formations, actions sociales et sessions de leadership à travers ces moments capturés sur le terrain."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 bg-background",
        "data-ocid": "gallery_page.grid_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { title: "Toutes nos photos", subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2 justify-center mb-12",
              "data-ocid": "gallery_page.filter",
              children: GALLERY_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveCategory(cat.value),
                  "data-ocid": `gallery_page.filter.${cat.value}`,
                  "aria-pressed": activeCategory === cat.value,
                  className: [
                    "px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-all duration-200 border",
                    activeCategory === cat.value ? "bg-primary text-primary-foreground border-primary shadow-glow" : "bg-card text-muted-foreground border-border/40 hover:border-primary/60 hover:text-foreground"
                  ].join(" "),
                  children: cat.label
                },
                cat.value
              ))
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GallerySkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryError, { onRetry: () => void refetch() }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryEmpty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -12 },
              transition: { duration: 0.3 },
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
              "data-ocid": "gallery_page.grid",
              children: filtered.map((photo, i) => {
                const imageUrl = getImageUrl(photo);
                const categoryLabel = getCategoryLabel(photo.category);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: { opacity: 0, y: 24 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, delay: i % 9 * 0.06 },
                    onClick: () => openLightbox(i),
                    className: "group relative aspect-[4/3] overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    style: { background: "oklch(0.1 0.01 270)" },
                    "data-ocid": `gallery_page.item.${i + 1}`,
                    "aria-label": `Voir ${photo.caption}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: imageUrl,
                          alt: photo.caption,
                          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                          loading: "lazy"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border mb-2 ${CATEGORY_BADGE[photo.category] ?? ""}`,
                            children: categoryLabel
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm leading-snug line-clamp-2", children: photo.caption })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border group-hover:opacity-0 transition-opacity duration-300 ${CATEGORY_BADGE[photo.category] ?? ""}`,
                          children: categoryLabel
                        }
                      )
                    ]
                  },
                  photo.id
                );
              })
            },
            activeCategory
          ) })
        ] })
      }
    ),
    lightboxIndex !== null && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        items: filtered,
        currentIndex: lightboxIndex,
        onClose: closeLightbox,
        onPrev: prevImage,
        onNext: nextImage
      }
    )
  ] });
}
export {
  GalleryPage as default
};
