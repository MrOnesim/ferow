import { c as createLucideIcon } from "./backend-DoU0t11f.js";
import { j as jsxRuntimeExports } from "./index-Cu0pNX-b.js";
import { c as cn } from "./Layout-DC7T_d2S.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
const CATEGORIES = [
  { value: "all", label: "Tous" },
  { value: "education", label: "Éducation" },
  { value: "social", label: "Social" },
  { value: "formation", label: "Formation" },
  { value: "leadership", label: "Leadership" }
];
function CategoryFilter({
  value,
  onChange,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "fieldset",
    {
      className: cn(
        "flex flex-wrap gap-2 justify-center border-none p-0 m-0",
        className
      ),
      "data-ocid": "article.filter",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filtrer par catégorie" }),
        CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(cat.value),
            "data-ocid": `article.filter.${cat.value}`,
            className: cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-smooth border",
              value === cat.value ? "bg-primary text-primary-foreground border-primary shadow-glow" : "bg-card text-muted-foreground border-border/40 hover:border-primary/60 hover:text-foreground"
            ),
            "aria-pressed": value === cat.value,
            children: cat.label
          },
          cat.value
        ))
      ]
    }
  );
}
export {
  BookOpen as B,
  ChevronDown as C,
  CategoryFilter as a
};
