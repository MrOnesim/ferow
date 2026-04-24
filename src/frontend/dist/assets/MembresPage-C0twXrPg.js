import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-Cu0pNX-b.js";
import { c as composeRefs, a as useGetMembers } from "./useMembers-3weDYoRW.js";
import { a as clsx, c as cn, L as Layout } from "./Layout-DC7T_d2S.js";
import { S as SectionHeading } from "./SectionHeading-CMmAf_cm.js";
import { c as createLucideIcon, m as motion } from "./backend-DoU0t11f.js";
import { C as CircleAlert } from "./circle-alert-BCpoKl1G.js";
import { U as Users } from "./users-BHWUpi4x.js";
import { A as AnimatePresence } from "./index-DigW-PHR.js";
import "./useMutation-C9s4NLTr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function getPhotoUrl(photo) {
  if (!photo) return "/assets/images/placeholder.svg";
  try {
    return photo.getDirectURL();
  } catch {
    return "/assets/images/placeholder.svg";
  }
}
const CATEGORIES = [
  { value: "all", label: "Tous" },
  { value: "direction", label: "Direction" },
  { value: "communication", label: "Communication" },
  { value: "jeunesse", label: "Jeunesse" },
  { value: "formation", label: "Formation" },
  { value: "international", label: "International" }
];
function MemberCard({ member, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const photoUrl = getPhotoUrl(member.photo);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: "member-card group flex flex-col",
      "data-ocid": `membres.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoUrl,
              alt: member.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              onError: (e) => {
                e.currentTarget.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card/95 via-card/10 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg leading-tight mb-1 truncate", children: member.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold mb-3 leading-snug line-clamp-1", children: member.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-muted-foreground text-sm leading-relaxed ${expanded ? "" : "line-clamp-3"}`,
              children: member.bio
            }
          ),
          member.bio && member.bio.length > 120 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((v) => !v),
              className: "mt-2 text-primary text-xs font-semibold hover:underline self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
              "data-ocid": `membres.expand_bio.${index + 1}`,
              children: expanded ? "Voir moins ↑" : "Voir plus ↓"
            }
          )
        ] })
      ]
    }
  );
}
function MemberCardSkeleton({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border/30 rounded-xl overflow-hidden",
      style: { animationDelay: `${index * 100}ms` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" })
        ] })
      ]
    }
  );
}
function MembresPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const { data: members = [], isLoading, isError } = useGetMembers();
  const filtered = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategory === "all") return true;
    const titleLower = m.title.toLowerCase();
    if (activeCategory === "direction") {
      return titleLower.includes("président") || titleLower.includes("directeur") || titleLower.includes("secrétaire") || titleLower.includes("trésorier");
    }
    if (activeCategory === "communication") {
      return titleLower.includes("comm");
    }
    if (activeCategory === "jeunesse") {
      return titleLower.includes("jeunesse") || titleLower.includes("youth");
    }
    if (activeCategory === "formation") {
      return titleLower.includes("form") || titleLower.includes("développement");
    }
    if (activeCategory === "international") {
      return titleLower.includes("diaspora") || titleLower.includes("inter");
    }
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-28 pb-20 bg-card border-b border-border/30 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-10",
                style: {
                  background: "radial-gradient(circle, oklch(0.5 0.18 264) 0%, transparent 70%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8",
                style: {
                  background: "radial-gradient(circle, oklch(0.38 0.16 264) 0%, transparent 70%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-[0.03]",
                style: {
                  backgroundImage: "repeating-linear-gradient(-45deg, oklch(0.97 0 0) 0px, oklch(0.97 0 0) 1px, transparent 1px, transparent 12px)"
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          className: "max-w-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -16 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.15 },
                className: "flex items-center gap-3 mb-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-8 bg-primary rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display font-semibold text-sm uppercase tracking-widest", children: "Annuaire FEROW" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-display font-black text-foreground leading-[1.05] mb-5", children: [
              "Notre",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Équipe" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { scaleX: 0 },
                    animate: { scaleX: 1 },
                    transition: { delay: 0.6, duration: 0.5, ease: "easeOut" },
                    className: "absolute -bottom-1 left-0 w-full h-[3px] bg-primary/50 rounded-full origin-left"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-xl", children: "Découvrez les dirigeants et membres actifs de FEROW — femmes et hommes engagés qui construisent l'Afrique de demain avec détermination." }),
            !isLoading && !isError && members.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5 },
                className: "flex items-center gap-3 mt-7",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "px-4 py-1.5 text-sm font-display bg-primary/15 text-primary border-primary/30 border", children: [
                  members.length,
                  " membre",
                  members.length > 1 ? "s" : ""
                ] })
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 flex-wrap",
          role: "tablist",
          "aria-label": "Filtrer par catégorie",
          children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeCategory === cat.value,
              onClick: () => setActiveCategory(cat.value),
              className: `px-4 py-1.5 rounded-full text-sm font-display font-semibold transition-smooth ${activeCategory === cat.value ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`,
              "data-ocid": `membres.filter.${cat.value}`,
              children: cat.label
            },
            cat.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Rechercher un membre...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 bg-card border-border/40 placeholder:text-muted-foreground/60 focus:border-primary/60",
            "data-ocid": "membres.search_input"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-background min-h-[60vh]",
        "data-ocid": "membres.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({ length: 8 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCardSkeleton, { index: i }, i)) }),
          isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              className: "flex flex-col items-center justify-center py-24 text-center",
              "data-ocid": "membres.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-xl mb-2", children: "Impossible de charger les membres" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Une erreur s'est produite lors du chargement de l'annuaire. Veuillez rafraîchir la page." })
              ]
            }
          ),
          !isLoading && !isError && members.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-24 text-center",
              "data-ocid": "membres.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-xl mb-2", children: "Aucun membre disponible pour le moment." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "L'annuaire sera bientôt disponible. Revenez prochainement." })
              ]
            }
          ),
          !isLoading && !isError && members.length > 0 && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-24 text-center",
              "data-ocid": "membres.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-10 h-10 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-xl mb-2", children: "Aucun résultat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Aucun membre ne correspond à votre recherche. Essayez d'autres mots-clés ou sélectionnez une autre catégorie." })
              ]
            }
          ),
          !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.2 },
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
              children: filtered.map((member, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { member, index }, member.id))
            },
            `${activeCategory}-${search}`
          ) }),
          !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              className: "text-center text-muted-foreground text-sm mt-10",
              children: [
                filtered.length,
                " membre",
                filtered.length > 1 ? "s" : "",
                " affiché",
                filtered.length > 1 ? "s" : ""
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 bg-muted/30 border-t border-border/20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] opacity-5",
              style: {
                background: "radial-gradient(ellipse, oklch(0.5 0.18 264) 0%, transparent 70%)"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            title: "Vous souhaitez faire partie de FEROW ?",
            subtitle: "Rejoignez des milliers de jeunes leaders qui construisent l'Afrique de demain. Votre engagement compte."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.a,
          {
            href: "/#rejoindre",
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.3 },
            className: "inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-base hover:opacity-90 shadow-elevated transition-smooth",
            "data-ocid": "membres.join_cta",
            children: "Rejoindre le mouvement"
          }
        )
      ] })
    ] })
  ] });
}
export {
  MembresPage as default
};
