import { j as jsxRuntimeExports } from "./index-CFjb6K-E.js";
import { c as cn } from "./Layout-BU-ph7QX.js";
function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  accent = true,
  eyebrow
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
        eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3 font-display", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: cn(
              "text-3xl md:text-4xl font-display font-bold text-foreground",
              accent && "gold-underline"
            ),
            children: title
          }
        ),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: cn(
              "mt-6 text-muted-foreground text-lg leading-relaxed",
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            ),
            children: subtitle
          }
        )
      ]
    }
  );
}
export {
  SectionHeading as S
};
