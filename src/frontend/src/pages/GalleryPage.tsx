import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { SectionHeading } from "../components/SectionHeading";
import { useGetPhotos } from "../hooks/useGallery";
import type { GalleryPhoto } from "../types";

// Static category definitions — used for filter buttons
const GALLERY_CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "evenements", label: "Événements" },
  { value: "formations", label: "Formations" },
  { value: "actions_sociales", label: "Actions Sociales" },
  { value: "leadership", label: "Leadership" },
];

const CATEGORY_BADGE: Record<string, string> = {
  evenements: "bg-primary/20 text-primary border-primary/30",
  formations: "bg-amber-900/30 text-amber-400 border-amber-400/30",
  actions_sociales: "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
  // legacy hyphen form from old static data
  "actions-sociales":
    "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
  leadership: "bg-violet-900/30 text-violet-400 border-violet-400/30",
};

function getCategoryLabel(category: string): string {
  return (
    GALLERY_CATEGORIES.find((c) => c.value === category)?.label ?? category
  );
}

function getImageUrl(photo: GalleryPhoto): string {
  try {
    return photo.image.getDirectURL();
  } catch {
    return "";
  }
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[currentIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: "oklch(0.04 0.005 270 / 0.96)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onClose}
        data-ocid="gallery.lightbox"
        aria-label={item.caption}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-card transition-colors"
          aria-label="Fermer"
          data-ocid="gallery.lightbox.close_button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Image précédente"
          data-ocid="gallery.lightbox.prev_button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={currentIndex === items.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Image suivante"
          data-ocid="gallery.lightbox.next_button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={item.caption}
            className="w-full rounded-xl object-contain shadow-glow-lg"
            style={{ maxHeight: "70vh" }}
          />
          <div className="mt-5 text-center max-w-2xl px-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-display border mb-3 ${CATEGORY_BADGE[item.category] ?? ""}`}
            >
              {categoryLabel}
            </span>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              {item.caption}
            </h2>
            <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function GallerySkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      data-ocid="gallery_page.loading_state"
      aria-busy="true"
      aria-label="Chargement des photos..."
    >
      {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="aspect-[4/3] rounded-xl animate-pulse"
          style={{ background: "oklch(0.13 0.01 270)" }}
        />
      ))}
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────

function GalleryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="gallery_page.error_state"
    >
      <AlertCircle className="w-12 h-12 text-destructive mb-4 opacity-70" />
      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        Impossible de charger la galerie
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        Une erreur est survenue lors du chargement des photos. Veuillez
        réessayer.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
        data-ocid="gallery_page.retry_button"
      >
        <RefreshCw className="w-4 h-4" />
        Réessayer
      </button>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function GalleryEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="gallery_page.empty_state"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-border/30"
        style={{ background: "oklch(0.12 0.01 270)" }}
      >
        <svg
          className="w-10 h-10 text-muted-foreground/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        Aucune photo disponible pour le moment.
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        Les photos seront ajoutées prochainement par l'équipe FEROW. Revenez
        bientôt !
      </p>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: allPhotos = [], isLoading, isError, refetch } = useGetPhotos();

  // Filter on the client side from the full list
  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? allPhotos
        : allPhotos.filter((p) => p.category === activeCategory),
    [allPhotos, activeCategory],
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && i < filtered.length - 1 ? i + 1 : i,
      ),
    [filtered.length],
  );

  // If lightbox was open and photos changed (e.g. category switch), guard index
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filtered.length) {
      setLightboxIndex(filtered.length > 0 ? filtered.length - 1 : null);
    }
  }, [filtered.length, lightboxIndex]);

  const photoCount = isLoading ? null : filtered.length;
  const subtitle = isLoading
    ? "Chargement..."
    : isError
      ? "Erreur de chargement"
      : `${photoCount} photo${photoCount !== 1 ? "s" : ""} · Filtrez par catégorie`;

  return (
    <Layout>
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-28 flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.07 0.008 270)" }}
        data-ocid="gallery_page.hero"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.5 0.18 264) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, oklch(0.38 0.16 264 / 0.4), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border text-sm font-semibold font-display tracking-wide"
            style={{
              backgroundColor: "oklch(0.38 0.16 264 / 0.2)",
              borderColor: "oklch(0.5 0.18 264 / 0.4)",
              color: "oklch(0.75 0.12 264)",
            }}
          >
            Nos moments en images
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-display font-black text-foreground mb-4"
          >
            Galerie{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(0.65 0.16 264), oklch(0.80 0.12 200))",
              }}
            >
              Photo
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Revivez nos événements, formations, actions sociales et sessions de
            leadership à travers ces moments capturés sur le terrain.
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery */}
      <section
        className="py-20 bg-background"
        data-ocid="gallery_page.grid_section"
      >
        <div className="container mx-auto px-4">
          <SectionHeading title="Toutes nos photos" subtitle={subtitle} />

          {/* Category filter tabs */}
          <div
            className="flex flex-wrap gap-2 justify-center mb-12"
            data-ocid="gallery_page.filter"
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                data-ocid={`gallery_page.filter.${cat.value}`}
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

          {/* Content area: loading / error / empty / grid */}
          {isLoading ? (
            <GallerySkeleton />
          ) : isError ? (
            <GalleryError onRetry={() => void refetch()} />
          ) : filtered.length === 0 ? (
            <GalleryEmpty />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                data-ocid="gallery_page.grid"
              >
                {filtered.map((photo, i) => {
                  const imageUrl = getImageUrl(photo);
                  const categoryLabel = getCategoryLabel(photo.category);

                  return (
                    <motion.button
                      key={photo.id}
                      type="button"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % 9) * 0.06 }}
                      onClick={() => openLightbox(i)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      style={{ background: "oklch(0.1 0.01 270)" }}
                      data-ocid={`gallery_page.item.${i + 1}`}
                      aria-label={`Voir ${photo.caption}`}
                    >
                      <img
                        src={imageUrl}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <span
                          className={`inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border mb-2 ${CATEGORY_BADGE[photo.category] ?? ""}`}
                        >
                          {categoryLabel}
                        </span>
                        <h3 className="font-display font-bold text-foreground text-sm leading-snug line-clamp-2">
                          {photo.caption}
                        </h3>
                      </div>
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold font-display border group-hover:opacity-0 transition-opacity duration-300 ${CATEGORY_BADGE[photo.category] ?? ""}`}
                      >
                        {categoryLabel}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filtered.length > 0 && (
        <Lightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </Layout>
  );
}
