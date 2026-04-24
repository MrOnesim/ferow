import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { SectionHeading } from "../components/SectionHeading";
import { useGetMembers } from "../hooks/useMembers";
import type { Member } from "../types";

// Derive photo URL from ExternalBlob
function getPhotoUrl(photo: Member["photo"]): string {
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
  { value: "international", label: "International" },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const photoUrl = getPhotoUrl(member.photo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="member-card group flex flex-col"
      data-ocid={`membres.card.${index + 1}`}
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted flex-shrink-0">
        <img
          src={photoUrl}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/10 to-transparent pointer-events-none" />
        {/* Blue shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-foreground text-lg leading-tight mb-1 truncate">
          {member.name}
        </h3>
        <p className="text-primary text-sm font-semibold mb-3 leading-snug line-clamp-1">
          {member.title}
        </p>
        <p
          className={`text-muted-foreground text-sm leading-relaxed ${expanded ? "" : "line-clamp-3"}`}
        >
          {member.bio}
        </p>
        {member.bio && member.bio.length > 120 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-primary text-xs font-semibold hover:underline self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            data-ocid={`membres.expand_bio.${index + 1}`}
          >
            {expanded ? "Voir moins ↑" : "Voir plus ↓"}
          </button>
        )}
      </div>
    </motion.article>
  );
}

function MemberCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="bg-card border border-border/30 rounded-xl overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="p-5 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

export default function MembresPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: members = [], isLoading, isError } = useGetMembers();

  // Filter by search & category (category derived from title keywords)
  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategory === "all") return true;
    const titleLower = m.title.toLowerCase();
    if (activeCategory === "direction") {
      return (
        titleLower.includes("président") ||
        titleLower.includes("directeur") ||
        titleLower.includes("secrétaire") ||
        titleLower.includes("trésorier")
      );
    }
    if (activeCategory === "communication") {
      return titleLower.includes("comm");
    }
    if (activeCategory === "jeunesse") {
      return titleLower.includes("jeunesse") || titleLower.includes("youth");
    }
    if (activeCategory === "formation") {
      return (
        titleLower.includes("form") || titleLower.includes("développement")
      );
    }
    if (activeCategory === "international") {
      return titleLower.includes("diaspora") || titleLower.includes("inter");
    }
    return true;
  });

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 bg-card border-b border-border/30 overflow-hidden">
        {/* Background gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.5 0.18 264) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8"
            style={{
              background:
                "radial-gradient(circle, oklch(0.38 0.16 264) 0%, transparent 70%)",
            }}
          />
          {/* Diagonal line pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, oklch(0.97 0 0) 0px, oklch(0.97 0 0) 1px, transparent 1px, transparent 12px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Accent label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-1 h-8 bg-primary rounded-full" />
              <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">
                Annuaire FEROW
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-foreground leading-[1.05] mb-5">
              Notre{" "}
              <span className="relative inline-block">
                <span className="text-primary">Équipe</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary/50 rounded-full origin-left"
                />
              </span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Découvrez les dirigeants et membres actifs de FEROW — femmes et
              hommes engagés qui construisent l&apos;Afrique de demain avec
              détermination.
            </p>

            {/* Stats pills */}
            {!isLoading && !isError && members.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mt-7"
              >
                <Badge className="px-4 py-1.5 text-sm font-display bg-primary/15 text-primary border-primary/30 border">
                  {members.length} membre{members.length > 1 ? "s" : ""}
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filters & Search ── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category tabs */}
            <div
              className="flex gap-2 flex-wrap"
              role="tablist"
              aria-label="Filtrer par catégorie"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-display font-semibold transition-smooth ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                  data-ocid={`membres.filter.${cat.value}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Rechercher un membre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border/40 placeholder:text-muted-foreground/60 focus:border-primary/60"
                data-ocid="membres.search_input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Members Grid ── */}
      <section
        className="py-14 bg-background min-h-[60vh]"
        data-ocid="membres.section"
      >
        <div className="container mx-auto px-4">
          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
                <MemberCardSkeleton key={i} index={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="membres.error_state"
            >
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-2">
                Impossible de charger les membres
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Une erreur s&apos;est produite lors du chargement de
                l&apos;annuaire. Veuillez rafraîchir la page.
              </p>
            </motion.div>
          )}

          {/* Empty state — no members at all */}
          {!isLoading && !isError && members.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="membres.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-2">
                Aucun membre disponible pour le moment.
              </h3>
              <p className="text-muted-foreground max-w-sm">
                L&apos;annuaire sera bientôt disponible. Revenez prochainement.
              </p>
            </motion.div>
          )}

          {/* No filter results */}
          {!isLoading &&
            !isError &&
            members.length > 0 &&
            filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
                data-ocid="membres.empty_state"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  Aucun résultat
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Aucun membre ne correspond à votre recherche. Essayez
                  d&apos;autres mots-clés ou sélectionnez une autre catégorie.
                </p>
              </motion.div>
            )}

          {/* Grid */}
          {!isLoading && !isError && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((member, index) => (
                  <MemberCard key={member.id} member={member} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Count bar */}
          {!isLoading && !isError && filtered.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-muted-foreground text-sm mt-10"
            >
              {filtered.length} membre{filtered.length > 1 ? "s" : ""} affiché
              {filtered.length > 1 ? "s" : ""}
            </motion.p>
          )}
        </div>
      </section>

      {/* ── CTA Join ── */}
      <section className="py-20 bg-muted/30 border-t border-border/20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] opacity-5"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.5 0.18 264) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <SectionHeading
            title="Vous souhaitez faire partie de FEROW ?"
            subtitle="Rejoignez des milliers de jeunes leaders qui construisent l'Afrique de demain. Votre engagement compte."
          />
          <motion.a
            href="/#rejoindre"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-base hover:opacity-90 shadow-elevated transition-smooth"
            data-ocid="membres.join_cta"
          >
            Rejoindre le mouvement
          </motion.a>
        </div>
      </section>
    </Layout>
  );
}
