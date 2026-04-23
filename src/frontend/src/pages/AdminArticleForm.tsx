import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Image, Save, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateArticle,
  useGetAllArticles,
  useUpdateArticle,
} from "../hooks/useAdminArticles";
import type { Article, ArticleCategory } from "../types";

// Dynamic import to avoid SSR issues
const ReactQuill = lazy(() => import("react-quill-new"));

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: "education", label: "Éducation" },
  { value: "social", label: "Social" },
  { value: "formation", label: "Formation" },
  { value: "leadership", label: "Leadership" },
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link", "image"],
    ["clean"],
  ],
};

type FormData = Omit<Article, "id" | "createdAt">;

export default function AdminArticleForm() {
  const params = useParams({ strict: false });
  const editId = (params as Record<string, string>).id;
  const isEditing = !!editId;
  const navigate = useNavigate();

  const { data: allArticles = [] } = useGetAllArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const [quillLoaded, setQuillLoaded] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "leadership",
      published: false,
      author: "Comité FEROW",
    },
  });

  useEffect(() => {
    if (isEditing && allArticles.length > 0) {
      const article = allArticles.find((a) => a.id === editId);
      if (article) {
        reset({
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          imageUrl: article.imageUrl,
          category: article.category,
          published: article.published,
          author: article.author || "Comité FEROW",
        });
        setImagePreview(article.imageUrl);
      }
    }
  }, [isEditing, editId, allArticles, reset]);

  useEffect(() => {
    import("react-quill-new/dist/quill.snow.css").then(() =>
      setQuillLoaded(true),
    );
  }, []);

  const imageUrl = watch("imageUrl");

  // Sync imagePreview from URL input
  useEffect(() => {
    if (imageUrl && imageUrl !== imagePreview) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, imagePreview]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setValue("imageUrl", localUrl);
  };

  const clearImage = () => {
    setImagePreview("");
    setValue("imageUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing) {
        await updateArticle.mutateAsync({ id: editId, data });
        toast.success("Article mis à jour avec succès !");
      } else {
        await createArticle.mutateAsync(data);
        toast.success("Article créé avec succès !");
      }
      navigate({ to: "/admin" });
    } catch {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/30 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors"
            data-ocid="admin.form.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-border/50">/</span>
          <span className="text-foreground font-medium text-sm">
            {isEditing ? "Modifier l'article" : "Nouvel article"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="px-4 py-2 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground text-sm transition-smooth hover:bg-foreground/5"
            data-ocid="admin.form.cancel_button"
          >
            Annuler
          </Link>
          <button
            type="submit"
            form="article-form"
            disabled={isSubmitting}
            className="btn-primary px-5 py-2 text-sm rounded-xl inline-flex items-center gap-2 disabled:opacity-60"
            data-ocid="admin.form.submit_button"
          >
            {isSubmitting ? (
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isEditing ? "Mettre à jour" : "Publier l'article"}
          </button>
        </div>
      </header>

      <div className="px-8 py-7 max-w-5xl mx-auto">
        <form
          id="article-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          data-ocid="admin.form"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Main content col */}
            <div className="lg:col-span-2 space-y-5">
              {/* Title */}
              <div className="card-elevated p-6 rounded-2xl space-y-5">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1.5"
                    htmlFor="title"
                  >
                    Titre <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title", {
                      required: "Le titre est requis",
                      minLength: { value: 5, message: "Minimum 5 caractères" },
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-base"
                    placeholder="Titre accrocheur de l'article..."
                    data-ocid="admin.form.title.input"
                  />
                  {errors.title && (
                    <p
                      className="text-destructive text-xs mt-1.5"
                      data-ocid="admin.form.title.field_error"
                    >
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1.5"
                    htmlFor="excerpt"
                  >
                    Résumé <span className="text-destructive">*</span>
                    <span className="text-muted-foreground font-normal ml-2 text-xs">
                      (affiché dans les cartes, max 300 chars)
                    </span>
                  </label>
                  <textarea
                    id="excerpt"
                    {...register("excerpt", {
                      required: "Le résumé est requis",
                      maxLength: {
                        value: 300,
                        message: "Maximum 300 caractères",
                      },
                    })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth resize-none text-sm"
                    placeholder="Résumé court et percutant de l'article..."
                    data-ocid="admin.form.excerpt.textarea"
                  />
                  {errors.excerpt && (
                    <p
                      className="text-destructive text-xs mt-1.5"
                      data-ocid="admin.form.excerpt.field_error"
                    >
                      {errors.excerpt.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Rich text editor */}
              <div className="card-elevated p-6 rounded-2xl">
                <p
                  className="block text-sm font-medium text-foreground mb-3"
                  id="content-label"
                >
                  Contenu de l'article{" "}
                  <span className="text-destructive">*</span>
                </p>
                <div
                  className="rounded-xl overflow-hidden border border-border/50"
                  data-ocid="admin.form.content.editor"
                >
                  {quillLoaded ? (
                    <Suspense
                      fallback={
                        <div className="h-64 bg-input flex items-center justify-center text-muted-foreground text-sm animate-pulse rounded-xl">
                          Chargement de l'éditeur...
                        </div>
                      }
                    >
                      <Controller
                        name="content"
                        control={control}
                        rules={{ required: "Le contenu est requis" }}
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            className="bg-input text-foreground"
                            modules={QUILL_MODULES}
                            style={{ minHeight: "300px" }}
                          />
                        )}
                      />
                    </Suspense>
                  ) : (
                    <div className="h-64 bg-input flex items-center justify-center text-muted-foreground text-sm animate-pulse rounded-xl">
                      Chargement de l'éditeur...
                    </div>
                  )}
                </div>
                {errors.content && (
                  <p
                    className="text-destructive text-xs mt-1.5"
                    data-ocid="admin.form.content.field_error"
                  >
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar col */}
            <div className="space-y-5">
              {/* Publication settings */}
              <div className="card-elevated p-5 rounded-2xl">
                <h2 className="font-display font-bold text-foreground text-sm mb-4">
                  Publication
                </h2>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Publier
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Rendre visible sur le site
                    </p>
                  </div>
                  <Controller
                    name="published"
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        id="published"
                        role="switch"
                        aria-checked={field.value}
                        onClick={() => field.onChange(!field.value)}
                        className={`relative w-12 h-6 rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                          field.value ? "bg-primary" : "bg-muted"
                        }`}
                        data-ocid="admin.form.published.switch"
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                            field.value ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    )}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-foreground mb-1.5"
                    htmlFor="category"
                  >
                    Catégorie
                  </label>
                  <select
                    id="category"
                    {...register("category")}
                    className="w-full px-3 py-2.5 rounded-xl bg-input border border-border/50 text-foreground focus:outline-none focus:border-primary transition-smooth text-sm appearance-none cursor-pointer"
                    data-ocid="admin.form.category.select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1.5"
                    htmlFor="author"
                  >
                    Auteur
                  </label>
                  <input
                    id="author"
                    type="text"
                    {...register("author")}
                    className="w-full px-3 py-2.5 rounded-xl bg-input border border-border/50 text-foreground focus:outline-none focus:border-primary transition-smooth text-sm"
                    data-ocid="admin.form.author.input"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div className="card-elevated p-5 rounded-2xl">
                <h2 className="font-display font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                  <Image className="w-4 h-4 text-primary" />
                  Image de couverture
                </h2>

                {/* Image preview */}
                {imagePreview && (
                  <div className="relative mb-3 rounded-xl overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="w-full h-36 object-cover"
                      onError={() => setImagePreview("")}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-smooth"
                      aria-label="Supprimer l'image"
                      data-ocid="admin.form.image.clear_button"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                )}

                {/* File upload button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  data-ocid="admin.form.image.file_input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mb-3 py-2.5 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground text-sm transition-smooth flex items-center justify-center gap-2 hover:bg-primary/5"
                  data-ocid="admin.form.image.upload_button"
                >
                  <Upload className="w-4 h-4" />
                  Choisir un fichier
                </button>

                {/* URL input */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5 text-center">
                    ou coller une URL d'image
                  </p>
                  <input
                    type="text"
                    {...register("imageUrl")}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth text-xs"
                    data-ocid="admin.form.image_url.input"
                  />
                </div>
              </div>

              {/* Submit mobile */}
              <div className="lg:hidden flex flex-col gap-2">
                <button
                  type="submit"
                  form="article-form"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
                  data-ocid="admin.form.submit_button_mobile"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isEditing ? "Mettre à jour" : "Publier l'article"}
                </button>
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
