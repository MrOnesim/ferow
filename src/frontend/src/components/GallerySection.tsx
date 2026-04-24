import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "../data/galleryData";
import { SectionHeading } from "./SectionHeading";

const CATEGORY_BADGE: Record<string, string> = {
  evenements: "bg-primary/20 text-primary border-primary/30",
  formations: "bg-amber-900/30 text-amber-400 border-amber-400/30",
  "actions-sociales":
    "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
  leadership: "bg-violet-900/30 text-violet-400 border-violet-400/30",
};

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">(
    "all",
  );

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS.slice(0, 6)
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory).slice(
          0,
          6,
        );

  const categoryLabel = (cat: string) =>
    GALLERY_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;

  return (
    <section
      className="py-28 bg-background"
      data-ocid="gallery.section"
      id="galerie"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Notre Galerie"
          subtitle="Revivez nos moments forts en images"
        />

        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          data-ocid="gallery.filter"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              data-ocid={`gallery.filter.${cat.value}`}
              aria-pressed={activeCategory === cat.value}
              className={[
                "px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-all duration-200 border",
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-card text-muted-foreground border-border/40 hover:border-primary/60 hover:text-foreground",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
                style={{ background: "oklch(0.1 0.01 270)" }}
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span
                    className={`inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border mb-2 ${CATEGORY_BADGE[item.category] ?? ""}`}
                  >
                    {categoryLabel(item.category)}
                  </span>
                  <h3 className="font-display font-bold text-foreground text-sm leading-snug line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Always visible category badge */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border group-hover:opacity-0 transition-opacity duration-300 ${CATEGORY_BADGE[item.category] ?? ""}`}
                >
                  {categoryLabel(item.category)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/galerie"
              className="inline-flex items-center gap-2.5 btn-primary px-8 py-3.5 rounded-xl text-base font-display font-bold transition-smooth shadow-glow hover:shadow-glow-lg"
              data-ocid="gallery.view_all_link"
            >
              <Camera className="w-5 h-5" />
              Voir toute la galerie
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
