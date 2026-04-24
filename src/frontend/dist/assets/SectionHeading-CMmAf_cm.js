import { j as jsxRuntimeExports } from "./index-Cu0pNX-b.js";
import { c as cn } from "./Layout-DC7T_d2S.js";
function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  accent = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: cn(
              "text-3xl md:text-4xl font-display font-bold text-foreground",
              accent && "blue-underline"
            ),
            children: title
          }
        ),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: subtitle })
      ]
    }
  );
}
export {
  SectionHeading as S
};
