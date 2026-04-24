const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CPtPZ_B9.js","assets/index-Cu0pNX-b.js","assets/index-3Zilgu8T.css","assets/quill-DK9h7TRp.css"])))=>i.map(i=>d[i]);
import { u as useParams, f as useNavigate, r as reactExports, _ as __vitePreload, j as jsxRuntimeExports, L as Link, e as ue } from "./index-Cu0pNX-b.js";
import { u as useForm, C as Controller } from "./index.esm-BfgVxPZY.js";
import { u as useGetAllArticles, d as useCreateArticle, e as useUpdateArticle, I as Image, U as Upload } from "./useAdminArticles-CrxXIg_z.js";
import { A as ArrowLeft } from "./arrow-left-CCGmeogB.js";
import { c as createLucideIcon, m as motion, X } from "./backend-DoU0t11f.js";
import "./useMutation-C9s4NLTr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const ReactQuill = reactExports.lazy(() => __vitePreload(() => import("./index-CPtPZ_B9.js"), true ? __vite__mapDeps([0,1,2]) : void 0));
const CATEGORIES = [
  { value: "education", label: "Éducation" },
  { value: "social", label: "Social" },
  { value: "formation", label: "Formation" },
  { value: "leadership", label: "Leadership" }
];
const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link", "image"],
    ["clean"]
  ]
};
function AdminArticleForm() {
  const params = useParams({ strict: false });
  const editId = params.id;
  const isEditing = !!editId;
  const navigate = useNavigate();
  const { data: allArticles = [] } = useGetAllArticles();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const [quillLoaded, setQuillLoaded] = reactExports.useState(false);
  const [imagePreview, setImagePreview] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "leadership",
      published: false,
      author: "Comité FEROW"
    }
  });
  reactExports.useEffect(() => {
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
          author: article.author || "Comité FEROW"
        });
        setImagePreview(article.imageUrl);
      }
    }
  }, [isEditing, editId, allArticles, reset]);
  reactExports.useEffect(() => {
    __vitePreload(() => Promise.resolve({}), true ? __vite__mapDeps([3]) : void 0).then(
      () => setQuillLoaded(true)
    );
  }, []);
  const imageUrl = watch("imageUrl");
  reactExports.useEffect(() => {
    if (imageUrl && imageUrl !== imagePreview) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, imagePreview]);
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
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
  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateArticle.mutateAsync({ id: editId, data });
        ue.success("Article mis à jour avec succès !");
      } else {
        await createArticle.mutateAsync(data);
        ue.success("Article créé avec succès !");
      }
      navigate({ to: "/admin" });
    } catch {
      ue.error("Une erreur s'est produite. Veuillez réessayer.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border/30 px-8 py-4 flex items-center justify-between sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/admin",
            className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors",
            "data-ocid": "admin.form.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Dashboard"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/50", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium text-sm", children: isEditing ? "Modifier l'article" : "Nouvel article" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/admin",
            className: "px-4 py-2 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground text-sm transition-smooth hover:bg-foreground/5",
            "data-ocid": "admin.form.cancel_button",
            children: "Annuler"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            form: "article-form",
            disabled: isSubmitting,
            className: "btn-primary px-5 py-2 text-sm rounded-xl inline-flex items-center gap-2 disabled:opacity-60",
            "data-ocid": "admin.form.submit_button",
            children: [
              isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              isEditing ? "Mettre à jour" : "Publier l'article"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-8 py-7 max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "form",
      {
        id: "article-form",
        onSubmit: handleSubmit(onSubmit),
        noValidate: true,
        "data-ocid": "admin.form",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            className: "grid lg:grid-cols-3 gap-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 rounded-2xl space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        htmlFor: "title",
                        children: [
                          "Titre ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "title",
                        type: "text",
                        ...register("title", {
                          required: "Le titre est requis",
                          minLength: { value: 5, message: "Minimum 5 caractères" }
                        }),
                        className: "w-full px-4 py-3 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-base",
                        placeholder: "Titre accrocheur de l'article...",
                        "data-ocid": "admin.form.title.input"
                      }
                    ),
                    errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs mt-1.5",
                        "data-ocid": "admin.form.title.field_error",
                        children: errors.title.message
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        htmlFor: "excerpt",
                        children: [
                          "Résumé ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-2 text-xs", children: "(affiché dans les cartes, max 300 chars)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "excerpt",
                        ...register("excerpt", {
                          required: "Le résumé est requis",
                          maxLength: {
                            value: 300,
                            message: "Maximum 300 caractères"
                          }
                        }),
                        rows: 3,
                        className: "w-full px-4 py-3 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth resize-none text-sm",
                        placeholder: "Résumé court et percutant de l'article...",
                        "data-ocid": "admin.form.excerpt.textarea"
                      }
                    ),
                    errors.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-destructive text-xs mt-1.5",
                        "data-ocid": "admin.form.excerpt.field_error",
                        children: errors.excerpt.message
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 rounded-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "block text-sm font-medium text-foreground mb-3",
                      id: "content-label",
                      children: [
                        "Contenu de l'article",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-xl overflow-hidden border border-border/50",
                      "data-ocid": "admin.form.content.editor",
                      children: quillLoaded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        reactExports.Suspense,
                        {
                          fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-input flex items-center justify-center text-muted-foreground text-sm animate-pulse rounded-xl", children: "Chargement de l'éditeur..." }),
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Controller,
                            {
                              name: "content",
                              control,
                              rules: { required: "Le contenu est requis" },
                              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ReactQuill,
                                {
                                  theme: "snow",
                                  value: field.value,
                                  onChange: field.onChange,
                                  className: "bg-input text-foreground",
                                  modules: QUILL_MODULES,
                                  style: { minHeight: "300px" }
                                }
                              )
                            }
                          )
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 bg-input flex items-center justify-center text-muted-foreground text-sm animate-pulse rounded-xl", children: "Chargement de l'éditeur..." })
                    }
                  ),
                  errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-xs mt-1.5",
                      "data-ocid": "admin.form.content.field_error",
                      children: errors.content.message
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 rounded-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-sm mb-4", children: "Publication" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 pb-4 border-b border-border/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Publier" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Rendre visible sur le site" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Controller,
                      {
                        name: "published",
                        control,
                        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            id: "published",
                            role: "switch",
                            "aria-checked": field.value,
                            onClick: () => field.onChange(!field.value),
                            className: `relative w-12 h-6 rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/40 ${field.value ? "bg-primary" : "bg-muted"}`,
                            "data-ocid": "admin.form.published.switch",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${field.value ? "left-7" : "left-1"}`
                              }
                            )
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        htmlFor: "category",
                        children: "Catégorie"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "select",
                      {
                        id: "category",
                        ...register("category"),
                        className: "w-full px-3 py-2.5 rounded-xl bg-input border border-border/50 text-foreground focus:outline-none focus:border-primary transition-smooth text-sm appearance-none cursor-pointer",
                        "data-ocid": "admin.form.category.select",
                        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.value, children: cat.label }, cat.value))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        htmlFor: "author",
                        children: "Auteur"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "author",
                        type: "text",
                        ...register("author"),
                        className: "w-full px-3 py-2.5 rounded-xl bg-input border border-border/50 text-foreground focus:outline-none focus:border-primary transition-smooth text-sm",
                        "data-ocid": "admin.form.author.input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 rounded-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground text-sm mb-4 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-primary" }),
                    "Image de couverture"
                  ] }),
                  imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3 rounded-xl overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imagePreview,
                        alt: "Prévisualisation",
                        className: "w-full h-36 object-cover",
                        onError: () => setImagePreview("")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: clearImage,
                        className: "absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-smooth",
                        "aria-label": "Supprimer l'image",
                        "data-ocid": "admin.form.image.clear_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-white" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      accept: "image/*",
                      className: "hidden",
                      onChange: handleFileChange,
                      "data-ocid": "admin.form.image.file_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                      },
                      className: "w-full mb-3 py-2.5 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground text-sm transition-smooth flex items-center justify-center gap-2 hover:bg-primary/5",
                      "data-ocid": "admin.form.image.upload_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                        "Choisir un fichier"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5 text-center", children: "ou coller une URL d'image" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        ...register("imageUrl"),
                        placeholder: "https://...",
                        className: "w-full px-3 py-2 rounded-xl bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth text-xs",
                        "data-ocid": "admin.form.image_url.input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    form: "article-form",
                    disabled: isSubmitting,
                    className: "w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl",
                    "data-ocid": "admin.form.submit_button_mobile",
                    children: [
                      isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                      isEditing ? "Mettre à jour" : "Publier l'article"
                    ]
                  }
                ) })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
}
export {
  AdminArticleForm as default
};
