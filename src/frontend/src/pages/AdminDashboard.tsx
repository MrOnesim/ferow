import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  LogOut,
  Newspaper,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteArticle,
  useGetAllArticles,
  useTogglePublish,
} from "../hooks/useAdminArticles";
import { useGetJoinSubmissions } from "../hooks/useAdminArticles";

const CATEGORY_LABELS: Record<string, string> = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership",
};

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-blue-900/30 text-blue-400 border-blue-400/20",
  social: "bg-emerald-900/30 text-emerald-400 border-emerald-400/20",
  formation: "bg-violet-900/30 text-violet-400 border-violet-400/20",
  leadership: "bg-amber-900/30 text-amber-400 border-amber-400/20",
};

type AdminTab = "articles" | "submissions";

export default function AdminDashboard() {
  const { data: articles = [], isLoading: articlesLoading } =
    useGetAllArticles();
  const { data: submissions = [], isLoading: subsLoading } =
    useGetJoinSubmissions();
  const deleteArticle = useDeleteArticle();
  const togglePublish = useTogglePublish();
  const { clear: logout, identity } = useInternetIdentity();

  const [activeTab, setActiveTab] = useState<AdminTab>("articles");
  const [articleToDelete, setArticleToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!articleToDelete) return;
    try {
      await deleteArticle.mutateAsync(articleToDelete.id);
      toast.success("Article supprimé avec succès");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setArticleToDelete(null);
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    setTogglingId(id);
    try {
      await togglePublish.mutateAsync({ id, published: !published });
      toast.success(published ? "Article dépublié" : "Article publié");
    } catch {
      toast.error("Erreur lors du changement de statut");
    } finally {
      setTogglingId(null);
    }
  };

  const published = articles.filter((a) => a.published).length;
  const drafts = articles.filter((a) => !a.published).length;

  const shortPrincipal = identity?.getPrincipal().toString().slice(0, 12);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card border-r border-border/30 flex flex-col min-h-screen sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border/30">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="admin.sidebar.home_link"
          >
            <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-black text-foreground text-sm leading-none">
                FEROW
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">Admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth text-left ${
              activeTab === "articles"
                ? "bg-primary/20 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
            data-ocid="admin.sidebar.articles_tab"
          >
            <Newspaper className="w-4 h-4 flex-shrink-0" />
            Articles
            <span className="ml-auto text-xs bg-muted rounded-full px-1.5 py-0.5">
              {articles.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth text-left ${
              activeTab === "submissions"
                ? "bg-primary/20 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
            data-ocid="admin.sidebar.submissions_tab"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            Soumissions
            <span className="ml-auto text-xs bg-muted rounded-full px-1.5 py-0.5">
              {submissions.length}
            </span>
          </button>
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-border/30">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-muted-foreground font-mono truncate">
              {shortPrincipal ? `${shortPrincipal}...` : "Administrateur"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth text-left"
            data-ocid="admin.sidebar.logout_button"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-card border-b border-border/30 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-display font-black text-foreground leading-tight">
              {activeTab === "articles"
                ? "Gestion des articles"
                : "Soumissions membres"}
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              {activeTab === "articles"
                ? `${articles.length} article${articles.length !== 1 ? "s" : ""} au total`
                : `${submissions.length} soumission${submissions.length !== 1 ? "s" : ""} reçue${submissions.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {activeTab === "articles" && (
            <Link
              to="/admin/articles/new"
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
              data-ocid="admin.create_article_button"
            >
              <Plus className="w-4 h-4" />
              Nouvel article
            </Link>
          )}
        </header>

        <main className="px-8 py-7" data-ocid="admin.dashboard">
          {/* Stats cards — articles tab only */}
          {activeTab === "articles" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
              {[
                {
                  icon: FileText,
                  label: "Total",
                  value: articles.length,
                  cls: "text-primary bg-primary/10 border-primary/20",
                },
                {
                  icon: Eye,
                  label: "Publiés",
                  value: published,
                  cls: "text-emerald-400 bg-emerald-900/20 border-emerald-400/20",
                },
                {
                  icon: EyeOff,
                  label: "Brouillons",
                  value: drafts,
                  cls: "text-amber-400 bg-amber-900/20 border-amber-400/20",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="card-elevated p-5 flex items-center gap-4"
                  data-ocid={`admin.stat.${i + 1}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${stat.cls}`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-black text-foreground leading-none">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Articles panel */}
          {activeTab === "articles" && (
            <div
              className="card-elevated overflow-hidden"
              data-ocid="admin.articles_table"
            >
              <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground text-sm">
                  Liste des articles
                </h2>
              </div>

              {articlesLoading ? (
                <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                  {[1, 2, 3, 4].map((sk) => (
                    <div
                      key={sk}
                      className="h-16 bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : articles.length === 0 ? (
                <div
                  className="py-16 text-center"
                  data-ocid="admin.articles.empty_state"
                >
                  <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="font-display font-semibold text-foreground mb-1">
                    Aucun article pour l'instant
                  </p>
                  <p className="text-muted-foreground text-sm mb-5">
                    Commencez à créer du contenu pour votre site FEROW.
                  </p>
                  <Link
                    to="/admin/articles/new"
                    className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5"
                    data-ocid="admin.empty.create_button"
                  >
                    <Plus className="w-4 h-4" />
                    Créer le premier article
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border/20">
                  {articles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 hover:bg-foreground/3 transition-smooth"
                      data-ocid={`admin.article.item.${i + 1}`}
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-semibold text-foreground text-sm truncate">
                            {article.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="text-xs text-muted-foreground">
                              {new Date(article.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${
                                CATEGORY_COLORS[article.category] ||
                                "bg-muted text-muted-foreground border-border"
                              }`}
                            >
                              {CATEGORY_LABELS[article.category] ||
                                article.category}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${
                                article.published
                                  ? "bg-emerald-900/30 text-emerald-400 border-emerald-400/20"
                                  : "bg-amber-900/30 text-amber-400 border-amber-400/20"
                              }`}
                            >
                              {article.published ? "✓ Publié" : "Brouillon"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleTogglePublish(article.id, article.published)
                          }
                          disabled={togglingId === article.id}
                          title={
                            article.published
                              ? "Dépublier"
                              : "Publier l'article"
                          }
                          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-smooth text-muted-foreground hover:text-foreground disabled:opacity-40"
                          data-ocid={`admin.article.toggle.${i + 1}`}
                        >
                          {togglingId === article.id ? (
                            <span className="w-3 h-3 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                          ) : article.published ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <Link
                          to="/admin/articles/$id/edit"
                          params={{ id: article.id }}
                          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-smooth text-muted-foreground"
                          data-ocid={`admin.article.edit_button.${i + 1}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setArticleToDelete({
                              id: article.id,
                              title: article.title,
                            })
                          }
                          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-smooth text-muted-foreground"
                          data-ocid={`admin.article.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submissions panel */}
          {activeTab === "submissions" && (
            <div
              className="card-elevated overflow-hidden"
              data-ocid="admin.submissions_table"
            >
              <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground text-sm">
                  Demandes d'adhésion
                </h2>
              </div>

              {subsLoading ? (
                <div
                  className="p-6 space-y-3"
                  data-ocid="admin.subs.loading_state"
                >
                  {[1, 2, 3].map((sk) => (
                    <div
                      key={sk}
                      className="h-14 bg-muted rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                <div
                  className="py-16 text-center"
                  data-ocid="admin.submissions.empty_state"
                >
                  <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                  <p className="font-display font-semibold text-foreground mb-1">
                    Aucune soumission reçue
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Les demandes d'adhésion apparaîtront ici.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/20 bg-muted/30">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                          Téléphone
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                          Ville
                        </th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {submissions.map((sub, i) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="hover:bg-foreground/3 transition-smooth"
                          data-ocid={`admin.submission.item.${i + 1}`}
                        >
                          <td className="px-6 py-4 font-medium text-foreground">
                            {sub.name}
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">
                            {sub.email}
                          </td>
                          <td className="px-4 py-4 text-muted-foreground hidden md:table-cell">
                            {sub.phone}
                          </td>
                          <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">
                            {sub.city}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground text-right text-xs">
                            {new Date(
                              Number(sub.submitted_at) / 1_000_000,
                            ).toLocaleDateString("fr-FR")}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog.Root
        open={!!articleToDelete}
        onOpenChange={(open) => !open && setArticleToDelete(null)}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            data-ocid="admin.delete_dialog"
          />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border/40 rounded-2xl p-6 shadow-xl">
            <AlertDialog.Title className="font-display font-bold text-foreground text-lg mb-2">
              Supprimer l'article ?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-muted-foreground text-sm mb-6">
              Vous êtes sur le point de supprimer{" "}
              <span className="text-foreground font-medium">
                « {articleToDelete?.title} »
              </span>
              . Cette action est irréversible.
            </AlertDialog.Description>
            <div className="flex items-center gap-3 justify-end">
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground text-sm transition-smooth"
                  data-ocid="admin.delete_dialog.cancel_button"
                >
                  Annuler
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleteArticle.isPending}
                  className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-60 flex items-center gap-2"
                  data-ocid="admin.delete_dialog.confirm_button"
                >
                  {deleteArticle.isPending ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  Supprimer définitivement
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
