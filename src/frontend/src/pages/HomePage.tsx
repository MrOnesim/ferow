import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building,
  ChevronDown,
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { ArticleCard } from "../components/ArticleCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { GallerySection } from "../components/GallerySection";
import { Layout } from "../components/Layout";
import { SectionHeading } from "../components/SectionHeading";
import { useGetRecentArticles } from "../hooks/useArticles";
import { useJoinForm } from "../hooks/useJoinForm";
import type { ArticleCategory } from "../types";

// ─── DATA ────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    Icon: Award,
    title: "Leadership",
    description:
      "Former et inspirer des leaders responsables capables de transformer leur communauté.",
    colorClass: "text-primary",
    bgClass: "bg-primary/10 border-primary/20",
    glowClass: "hover:shadow-[0_0_24px_oklch(0.5_0.18_264/0.25)]",
  },
  {
    Icon: Heart,
    title: "Engagement",
    description:
      "S'impliquer pleinement pour les causes qui façonnent l'avenir de notre société.",
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-900/20 border-emerald-400/20",
    glowClass: "hover:shadow-[0_0_24px_rgba(52,211,153,0.18)]",
  },
  {
    Icon: Target,
    title: "Discipline",
    description:
      "Agir avec rigueur, méthode et constance pour atteindre des objectifs ambitieux.",
    colorClass: "text-amber-400",
    bgClass: "bg-amber-900/20 border-amber-400/20",
    glowClass: "hover:shadow-[0_0_24px_rgba(251,191,36,0.18)]",
  },
  {
    Icon: TrendingUp,
    title: "Impact",
    description:
      "Produire des résultats concrets et mesurables pour les jeunes et leurs communautés.",
    colorClass: "text-violet-400",
    bgClass: "bg-violet-900/20 border-violet-400/20",
    glowClass: "hover:shadow-[0_0_24px_rgba(167,139,250,0.18)]",
  },
  {
    Icon: Users,
    title: "Unité",
    description:
      "Construire un mouvement fort, soudé et diversifié autour d'une vision commune.",
    colorClass: "text-rose-400",
    bgClass: "bg-rose-900/20 border-rose-400/20",
    glowClass: "hover:shadow-[0_0_24px_rgba(251,113,133,0.18)]",
  },
];

const ACTIVITIES = [
  {
    title: "Conférences de Leadership",
    description:
      "Des rencontres inspirantes avec des personnalités influentes pour former les leaders de demain.",
    image: "/assets/generated/activity-conference.dim_800x500.jpg",
    Icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Actions Sociales",
    description:
      "Distribution de kits scolaires, aide alimentaire et soutien aux populations vulnérables.",
    image: "/assets/generated/activity-social.dim_800x500.jpg",
    Icon: Heart,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
  },
  {
    title: "Formations Professionnelles",
    description:
      "Programmes certifiants en entrepreneuriat, digital et développement personnel.",
    image: "/assets/generated/activity-formation.dim_800x500.jpg",
    Icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-900/20",
  },
  {
    title: "Sensibilisation Communautaire",
    description:
      "Campagnes de mobilisation citoyenne dans les quartiers et communautés locales.",
    image: "/assets/generated/activity-sensibilisation.dim_800x500.jpg",
    Icon: Building,
    color: "text-violet-400",
    bg: "bg-violet-900/20",
  },
];

const ACTIONS = [
  {
    id: "a1",
    title: "Distribution de kits scolaires à Cotonou",
    description:
      "200 enfants défavorisés ont reçu des kits complets, grâce à la mobilisation de 50 bénévoles engagés de FEROW.",
    date: "15 mars 2025",
    category: "education" as ArticleCategory,
    image: "/assets/generated/activity-social.dim_800x500.jpg",
  },
  {
    id: "a2",
    title: "Conférence nationale sur le leadership jeune",
    description:
      "300 jeunes leaders réunis pour débattre des défis et des opportunités de la jeunesse africaine.",
    date: "20 février 2025",
    category: "leadership" as ArticleCategory,
    image: "/assets/generated/activity-conference.dim_800x500.jpg",
  },
  {
    id: "a3",
    title: "Formation professionnelle à Porto-Novo",
    description:
      "80 jeunes ont bénéficié d'une formation en entrepreneuriat et compétences numériques.",
    date: "10 janvier 2025",
    category: "formation" as ArticleCategory,
    image: "/assets/generated/activity-formation.dim_800x500.jpg",
  },
  {
    id: "a4",
    title: "Campagne de sensibilisation à Parakou",
    description:
      "Plus de 500 citoyens sensibilisés aux enjeux civiques et à la participation politique.",
    date: "5 décembre 2024",
    category: "social" as ArticleCategory,
    image: "/assets/generated/activity-sensibilisation.dim_800x500.jpg",
  },
];

const STATS = [
  { target: 500, suffix: "+", label: "Jeunes impactés", Icon: Users },
  { target: 20, suffix: "+", label: "Actions réalisées", Icon: Target },
  { target: 5, suffix: "+", label: "Villes touchées", Icon: Building },
  { target: 1000, suffix: "+", label: "Bénéficiaires", Icon: Heart },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: recentArticles = [], isLoading: articlesLoading } =
    useGetRecentArticles(3);
  const { form, onSubmit, formState } = useJoinForm();
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all");

  const {
    register,
    formState: { errors },
  } = form;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredActions =
    activeCategory === "all"
      ? ACTIONS
      : ACTIONS.filter((a) => a.category === activeCategory);

  const CATEGORY_LABELS: Record<string, string> = {
    education: "Éducation",
    social: "Social",
    formation: "Formation",
    leadership: "Leadership",
  };

  const CATEGORY_COLORS: Record<string, string> = {
    education: "bg-primary/20 text-primary border-primary/30",
    social: "bg-emerald-900/30 text-emerald-400 border-emerald-400/30",
    formation: "bg-amber-900/30 text-amber-400 border-amber-400/30",
    leadership: "bg-violet-900/30 text-violet-400 border-violet-400/30",
  };

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-ferow.dim_1920x800.jpg)",
          }}
        />
        {/* Dark overlay layers */}
        <div className="absolute inset-0 bg-background/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.38 0.16 264 / 0.3) 40%, oklch(0.07 0.008 270 / 0.9) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-1.5 mb-8 rounded-full border text-sm font-semibold font-display tracking-wide"
              style={{
                backgroundColor: "oklch(0.38 0.16 264 / 0.25)",
                borderColor: "oklch(0.5 0.18 264 / 0.5)",
                color: "oklch(0.75 0.12 264)",
              }}
            >
              🇧🇯 Mouvement National · Bénin
            </motion.span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-foreground leading-[1.05] text-balance mb-6">
              Construisons l'avenir
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.65 0.16 264), oklch(0.80 0.12 200))",
                }}
              >
                avec une jeunesse engagée
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ color: "oklch(0.97 0 0 / 0.75)" }}
            >
              FEROW est un mouvement dédié au leadership et à l'impact social.
              Rejoignez des milliers de jeunes qui transforment leur communauté.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                type="button"
                onClick={() => scrollTo("rejoindre")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-lg px-10 py-4 rounded-xl shadow-glow-lg hover:shadow-glow-lg transition-smooth inline-flex items-center justify-center gap-2"
                data-ocid="hero.join_button"
              >
                Rejoindre maintenant
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => scrollTo("apropos")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary text-lg px-10 py-4 rounded-xl inline-flex items-center justify-center gap-2"
                data-ocid="hero.discover_button"
              >
                Découvrir
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-3 text-center"
                style={{
                  backgroundColor: "oklch(0.07 0.008 270 / 0.6)",
                  borderWidth: 1,
                  borderColor: "oklch(0.5 0.18 264 / 0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p className="text-2xl font-display font-black text-foreground">
                  {stat.suffix === "+" ? `+${stat.target}` : stat.target}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={() => scrollTo("apropos")}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors"
          aria-label="Défiler vers la section À propos"
        >
          <div className="w-6 h-10 border-2 border-foreground/25 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/60 rounded-full" />
          </div>
        </motion.button>
      </section>

      {/* ─── ABOUT ─── */}
      <section
        id="apropos"
        className="py-28 bg-background"
        data-ocid="about.section"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                À propos de FEROW
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mt-3 mb-6 leading-tight">
                Un mouvement pour une génération de leaders
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                La Fédération Nationale des Mouvements de Soutien à Romuald
                Wadagni (FEROW) est un mouvement politique et social engagé dans
                la formation, l'inspiration et la mobilisation d'une nouvelle
                génération de leaders responsables au Bénin.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  {
                    Icon: Target,
                    color: "text-primary",
                    bg: "bg-primary/10 border-primary/20",
                    title: "Notre Mission",
                    desc: "Former, inspirer et mobiliser une nouvelle génération de leaders responsables.",
                  },
                  {
                    Icon: Award,
                    color: "text-accent",
                    bg: "bg-accent/10 border-accent/20",
                    title: "Notre Vision",
                    desc: "Construire une société où chaque jeune a les moyens d'agir et d'influencer positivement.",
                  },
                ].map(({ Icon, color, bg, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${bg}`}
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1">
                        {title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value pills */}
              <div className="flex flex-wrap gap-2">
                {VALUES.map((v) => (
                  <span
                    key={v.title}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold font-display border ${v.bgClass} ${v.colorClass}`}
                  >
                    {v.title}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: image + floating card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-glow-lg">
                <img
                  src="/assets/generated/hero-ferow.dim_1920x800.jpg"
                  alt="Leadership FEROW — jeunes leaders engagés"
                  className="w-full h-[520px] object-cover"
                  style={{ objectPosition: "center 30%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 card-elevated p-6 max-w-xs shadow-glow"
              >
                <p className="text-3xl font-display font-black text-foreground">
                  +1000
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  membres actifs à travers le Bénin
                </p>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static decorative
                      key={i}
                      className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card -ml-1 first:ml-0"
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">
                    et plus encore
                  </span>
                </div>
              </motion.div>

              {/* Decorative badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -right-4 rounded-full w-20 h-20 flex items-center justify-center text-center shadow-glow"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.38 0.16 264), oklch(0.5 0.18 264))",
                }}
              >
                <div>
                  <p className="text-xs font-display font-black text-primary-foreground leading-tight">
                    Depuis
                  </p>
                  <p className="text-lg font-display font-black text-primary-foreground">
                    2020
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section
        className="py-28 section-alt"
        data-ocid="values.section"
        style={{ background: "oklch(0.07 0.008 270)" }}
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nos Valeurs"
            subtitle="Les principes fondateurs qui guident chacune de nos actions et décisions."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card-elevated card-hover p-6 border cursor-default ${value.bgClass} ${value.glowClass} hover:scale-[1.03] transition-all duration-300`}
                data-ocid={`values.item.${i + 1}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${value.bgClass}`}
                >
                  <value.Icon className={`w-6 h-6 ${value.colorClass}`} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-base">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTIVITIES ─── */}
      <section
        id="activites"
        className="py-28 bg-background"
        data-ocid="activities.section"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Nos Activités"
            subtitle="Découvrez les actions concrètes que FEROW mène sur le terrain pour transformer les communautés."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACTIVITIES.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-elevated card-hover overflow-hidden group"
                data-ocid={`activities.item.${i + 1}`}
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center ${activity.bg}`}
                  >
                    <activity.Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-foreground text-xl mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTIONS & RÉALISATIONS ─── */}
      <section
        id="actions"
        className="py-28 relative overflow-hidden"
        style={{ background: "oklch(0.07 0.008 270)" }}
        data-ocid="actions.section"
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.5 0.18 264) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4">
          <SectionHeading
            title="Nos Actions & Réalisations"
            subtitle="Découvrez les initiatives concrètes menées par FEROW pour impacter la société."
          />

          {/* Category filter */}
          <div className="flex justify-center mb-10">
            <CategoryFilter
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Action cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            >
              {filteredActions.map((action, i) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="card-elevated card-hover group flex flex-col overflow-hidden"
                  data-ocid={`actions.item.${i + 1}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={action.image}
                      alt={action.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <span
                      className={`badge-category absolute top-3 left-3 border ${CATEGORY_COLORS[action.category] || ""}`}
                    >
                      {CATEGORY_LABELS[action.category] || action.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-xs text-muted-foreground mb-2 font-body">
                      {action.date}
                    </p>
                    <h3 className="font-display font-bold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
                      {action.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollTo("blog")}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                      data-ocid={`actions.read_more.${i + 1}`}
                    >
                      Lire plus
                      <ArrowRight className="w-4 h-4 transition-transform hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Stats counters */}
          <div
            className="rounded-2xl border p-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.1 0.018 264), oklch(0.08 0.012 270))",
              borderColor: "oklch(0.5 0.18 264 / 0.15)",
            }}
          >
            <p className="text-center text-sm font-semibold text-primary uppercase tracking-widest mb-10">
              Nos chiffres clés
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {STATS.map((stat, i) => (
                <div key={stat.label} data-ocid={`actions.stat.${i + 1}`}>
                  <AnimatedCounter
                    target={stat.target}
                    prefix="+"
                    label={stat.label}
                    delay={i * 150}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <GallerySection />

      {/* ─── IMPACT SECTION ─── */}
      <section
        className="py-28 bg-background"
        data-ocid="impact.section"
        id="impact"
      >
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Notre Impact"
            subtitle="Des résultats concrets qui témoignent de l'engagement de FEROW sur le terrain."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-elevated p-8 text-center group card-hover"
                data-ocid={`impact.stat.${i + 1}`}
                style={{
                  borderTop: "3px solid oklch(0.5 0.18 264)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-smooth">
                  <stat.Icon className="w-7 h-7 text-primary" />
                </div>
                <AnimatedCounter
                  target={stat.target}
                  prefix="+"
                  label={stat.label}
                  delay={i * 150}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─── */}
      <section
        id="blog"
        className="py-28 section-alt"
        style={{ background: "oklch(0.09 0.008 270)" }}
        data-ocid="blog.section"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeading
              title="Dernières Actualités"
              subtitle="Restez informé des dernières actions et initiatives de FEROW."
              align="left"
              className="mb-0"
            />
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors whitespace-nowrap shrink-0"
              data-ocid="blog.view_all"
            >
              Voir tout le blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {articlesLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-ocid="blog.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-elevated overflow-hidden">
                  <div className="h-52 bg-muted animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                    <div className="h-5 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20 text-muted-foreground card-elevated rounded-2xl"
              data-ocid="blog.empty_state"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-display font-semibold text-foreground mb-2">
                Aucun article disponible
              </p>
              <p className="text-sm">Les articles seront bientôt publiés.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── JOIN FORM ─── */}
      <section
        id="rejoindre"
        className="py-28 relative overflow-hidden"
        style={{ background: "oklch(0.38 0.16 264)" }}
        data-ocid="join.section"
      >
        {/* Background decorative */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, oklch(0.55 0.15 200), transparent 50%), radial-gradient(circle at 20% 80%, oklch(0.3 0.1 264), transparent 50%)",
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span
                className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-semibold uppercase tracking-widest font-display"
                style={{
                  backgroundColor: "oklch(0.97 0 0 / 0.15)",
                  color: "oklch(0.97 0 0 / 0.9)",
                }}
              >
                Rejoignez le mouvement
              </span>
              <h2
                className="text-4xl md:text-5xl font-display font-black leading-tight mb-4"
                style={{ color: "oklch(0.97 0 0)" }}
              >
                Rejoignez une communauté engagée
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "oklch(0.97 0 0 / 0.75)" }}
              >
                Faites partie d'une communauté de jeunes leaders qui
                transforment le Bénin.
              </p>
            </motion.div>

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center"
                style={{
                  backgroundColor: "oklch(0.97 0 0 / 0.1)",
                  border: "1px solid oklch(0.97 0 0 / 0.2)",
                }}
                data-ocid="join.success_state"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "oklch(0.97 0 0 / 0.15)" }}
                >
                  <Award
                    className="w-8 h-8"
                    style={{ color: "oklch(0.97 0 0)" }}
                  />
                </div>
                <h3
                  className="text-2xl font-display font-bold mb-3"
                  style={{ color: "oklch(0.97 0 0)" }}
                >
                  Bienvenue dans FEROW !
                </h3>
                <p style={{ color: "oklch(0.97 0 0 / 0.75)" }}>
                  Votre candidature a été reçue avec succès. Notre équipe vous
                  contactera très prochainement.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={onSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{
                  backgroundColor: "oklch(0.07 0.008 270 / 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(0.97 0 0 / 0.12)",
                }}
                data-ocid="join.form"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Nom */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "oklch(0.97 0 0 / 0.9)" }}
                      htmlFor="nom"
                    >
                      Nom complet{" "}
                      <span style={{ color: "oklch(0.7 0.22 25)" }}>*</span>
                    </label>
                    <input
                      id="nom"
                      type="text"
                      {...register("nom", { required: "Le nom est requis" })}
                      className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth"
                      style={{
                        backgroundColor: "oklch(0.1 0.01 270 / 0.8)",
                        border: errors.nom
                          ? "1px solid oklch(0.7 0.22 25)"
                          : "1px solid oklch(0.97 0 0 / 0.15)",
                      }}
                      placeholder="Votre nom complet"
                      data-ocid="join.nom.input"
                    />
                    {errors.nom && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "oklch(0.75 0.2 25)" }}
                        data-ocid="join.nom.field_error"
                      >
                        {errors.nom.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "oklch(0.97 0 0 / 0.9)" }}
                      htmlFor="email"
                    >
                      Adresse email{" "}
                      <span style={{ color: "oklch(0.7 0.22 25)" }}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "L'email est requis",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Email invalide",
                        },
                      })}
                      className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth"
                      style={{
                        backgroundColor: "oklch(0.1 0.01 270 / 0.8)",
                        border: errors.email
                          ? "1px solid oklch(0.7 0.22 25)"
                          : "1px solid oklch(0.97 0 0 / 0.15)",
                      }}
                      placeholder="votre@email.com"
                      data-ocid="join.email.input"
                    />
                    {errors.email && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "oklch(0.75 0.2 25)" }}
                        data-ocid="join.email.field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "oklch(0.97 0 0 / 0.9)" }}
                      htmlFor="telephone"
                    >
                      Téléphone
                    </label>
                    <input
                      id="telephone"
                      type="tel"
                      {...register("telephone")}
                      className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth"
                      style={{
                        backgroundColor: "oklch(0.1 0.01 270 / 0.8)",
                        border: "1px solid oklch(0.97 0 0 / 0.15)",
                      }}
                      placeholder="+229 XX XX XX XX"
                      data-ocid="join.telephone.input"
                    />
                  </div>

                  {/* Ville */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: "oklch(0.97 0 0 / 0.9)" }}
                      htmlFor="ville"
                    >
                      Ville{" "}
                      <span style={{ color: "oklch(0.7 0.22 25)" }}>*</span>
                    </label>
                    <input
                      id="ville"
                      type="text"
                      {...register("ville", {
                        required: "La ville est requise",
                      })}
                      className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth"
                      style={{
                        backgroundColor: "oklch(0.1 0.01 270 / 0.8)",
                        border: errors.ville
                          ? "1px solid oklch(0.7 0.22 25)"
                          : "1px solid oklch(0.97 0 0 / 0.15)",
                      }}
                      placeholder="Votre ville"
                      data-ocid="join.ville.input"
                    />
                    {errors.ville && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "oklch(0.75 0.2 25)" }}
                        data-ocid="join.ville.field_error"
                      >
                        {errors.ville.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "oklch(0.97 0 0 / 0.9)" }}
                    htmlFor="message"
                  >
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-smooth resize-none"
                    style={{
                      backgroundColor: "oklch(0.1 0.01 270 / 0.8)",
                      border: "1px solid oklch(0.97 0 0 / 0.15)",
                    }}
                    placeholder="Pourquoi souhaitez-vous rejoindre FEROW ?"
                    data-ocid="join.message.textarea"
                  />
                </div>

                {formState === "error" && (
                  <p
                    className="text-sm text-center"
                    style={{ color: "oklch(0.75 0.2 25)" }}
                    data-ocid="join.error_state"
                  >
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full py-4 text-base rounded-xl font-display font-bold transition-smooth disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "oklch(0.97 0 0)",
                    color: "oklch(0.38 0.16 264)",
                  }}
                  data-ocid="join.submit_button"
                >
                  {formState === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Rejoindre maintenant
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
