import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  Image,
  Lock,
  LogOut,
  Newspaper,
  Plus,
  Shield,
  Trash2,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddAssistantAdmin,
  useGetAdminList,
  useGetPresidentPrincipal,
  useRemoveAssistantAdmin,
} from "../hooks/useAdminAccess";
import {
  useDeleteArticle,
  useGetAllArticles,
  useTogglePublish,
} from "../hooks/useAdminArticles";
import { useGetJoinSubmissions } from "../hooks/useAdminArticles";
import {
  useCreatePhoto,
  useDeletePhoto,
  useGetPhotos,
} from "../hooks/useGallery";
import {
  useCreateMember,
  useDeleteMember,
  useGetMembers,
  useUpdateMember,
} from "../hooks/useMembers";
import type { GalleryPhoto, Member } from "../types";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  education: "Éducation",
  social: "Social",
  formation: "Formation",
  leadership: "Leadership",
};

const CATEGORY_COLORS: Record<string, string> = {
  education: "bg-primary/20 text-primary border-primary/30",
  social: "bg-emerald-900/30 text-emerald-400 border-emerald-400/20",
  formation: "bg-violet-900/30 text-violet-400 border-violet-400/20",
  leadership: "bg-amber-900/30 text-amber-400 border-amber-400/20",
};

const GALLERY_CATEGORIES = [
  { value: "evenements", label: "Événements" },
  { value: "formations", label: "Formations" },
  { value: "actions_sociales", label: "Actions Sociales" },
  { value: "leadership", label: "Leadership" },
];

const GALLERY_CATEGORY_COLORS: Record<string, string> = {
  evenements: "bg-primary/20 text-primary border-primary/30",
  formations: "bg-violet-900/30 text-violet-400 border-violet-400/20",
  actions_sociales: "bg-emerald-900/30 text-emerald-400 border-emerald-400/20",
  leadership: "bg-amber-900/30 text-amber-400 border-amber-400/20",
};

type AdminTab = "articles" | "submissions" | "membres" | "galerie" | "acces";

// ─── Shared inline form styles ────────────────────────────────────────────────

const inputCls =
  "w-full bg-secondary border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-smooth";
const labelCls =
  "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide";
const btnPrimary =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/80 transition-smooth disabled:opacity-60";
const btnSecondary =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground text-sm transition-smooth";
const btnDanger =
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-semibold transition-smooth";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── File Upload Button ───────────────────────────────────────────────────────

function FileUploadButton({
  label,
  preview,
  onChange,
  ocid,
}: {
  label: string;
  preview: string;
  onChange: (url: string) => void;
  ocid: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className={labelCls} htmlFor={ocid}>
        {label}
      </label>
      <div className="flex items-center gap-3">
        {preview && (
          <img
            src={preview}
            alt="Aperçu"
            className="w-14 h-14 object-cover rounded-lg border border-border/40"
          />
        )}
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border/60 hover:border-primary/60 text-muted-foreground hover:text-foreground text-xs transition-smooth"
          data-ocid={ocid}
        >
          <Upload className="w-3.5 h-3.5" />
          {preview ? "Changer la photo" : "Choisir une photo"}
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await fileToDataURL(file);
              onChange(url);
            }
          }}
        />
      </div>
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

function ConfirmDeleteDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  isPending,
  ocidPrefix,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  ocidPrefix: string;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          data-ocid={`${ocidPrefix}.dialog`}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border/40 rounded-2xl p-6 shadow-xl">
          <AlertDialog.Title className="font-display font-bold text-foreground text-lg mb-2">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-muted-foreground text-sm mb-6">
            {description}
          </AlertDialog.Description>
          <div className="flex items-center gap-3 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className={btnSecondary}
                data-ocid={`${ocidPrefix}.cancel_button`}
              >
                Annuler
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-smooth disabled:opacity-60 flex items-center gap-2"
                data-ocid={`${ocidPrefix}.confirm_button`}
              >
                {isPending ? (
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
  );
}

// ─── Member Form ──────────────────────────────────────────────────────────────

function MemberForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  ocidPrefix,
}: {
  initial?: Partial<{
    name: string;
    title: string;
    bio: string;
    photoUrl: string;
  }>;
  onSubmit: (data: {
    name: string;
    title: string;
    bio: string;
    photoUrl: string;
  }) => void;
  onCancel: () => void;
  isPending: boolean;
  ocidPrefix: string;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl ?? "");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-secondary/60 border border-border/40 rounded-xl p-5 space-y-4"
      data-ocid={`${ocidPrefix}.form`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor={`${ocidPrefix}.name_input`}>
            Nom *
          </label>
          <input
            id={`${ocidPrefix}.name_input`}
            type="text"
            className={inputCls}
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-ocid={`${ocidPrefix}.name_input`}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor={`${ocidPrefix}.title_input`}>
            Titre / Fonction *
          </label>
          <input
            id={`${ocidPrefix}.title_input`}
            type="text"
            className={inputCls}
            placeholder="Ex: Président national"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid={`${ocidPrefix}.title_input`}
          />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor={`${ocidPrefix}.bio_textarea`}>
          Biographie (max 500 caractères)
        </label>
        <textarea
          id={`${ocidPrefix}.bio_textarea`}
          className={`${inputCls} resize-none`}
          rows={3}
          maxLength={500}
          placeholder="Courte biographie du membre..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          data-ocid={`${ocidPrefix}.bio_textarea`}
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {bio.length}/500
        </p>
      </div>
      <FileUploadButton
        label="Photo"
        preview={photoUrl}
        onChange={setPhotoUrl}
        ocid={`${ocidPrefix}.photo_upload`}
      />
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className={btnSecondary}
          data-ocid={`${ocidPrefix}.cancel_button`}
        >
          <X className="w-3.5 h-3.5" />
          Annuler
        </button>
        <button
          type="button"
          disabled={!name.trim() || !title.trim() || isPending}
          onClick={() => onSubmit({ name, title, bio, photoUrl })}
          className={btnPrimary}
          data-ocid={`${ocidPrefix}.submit_button`}
        >
          {isPending ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
          {initial?.name ? "Enregistrer" : "Ajouter le membre"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Membres Tab ──────────────────────────────────────────────────────────────

function MembresTab() {
  const { data: members = [], isLoading } = useGetMembers();
  const createMember = useCreateMember();
  const updateMember = useUpdateMember();
  const deleteMember = useDeleteMember();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleAdd = async (data: {
    name: string;
    title: string;
    bio: string;
    photoUrl: string;
  }) => {
    try {
      await createMember.mutateAsync({
        name: data.name,
        title: data.title,
        bio: data.bio,
        photoUrl: data.photoUrl,
        display_order: members.length,
      });
      toast.success("Membre ajouté avec succès");
      setShowAddForm(false);
    } catch {
      toast.error("Erreur lors de l'ajout du membre");
    }
  };

  const handleUpdate = async (
    id: string,
    data: { name: string; title: string; bio: string; photoUrl: string },
  ) => {
    try {
      await updateMember.mutateAsync({
        id,
        data: {
          name: data.name,
          title: data.title,
          bio: data.bio,
          photoUrl: data.photoUrl,
          display_order: 0,
        },
      });
      toast.success("Membre mis à jour");
      setEditingId(null);
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMember.mutateAsync(deleteTarget.id);
      toast.success("Membre supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-5" data-ocid="admin.membres.panel">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Annuaire des membres
          </h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            {members.length} membre{members.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!showAddForm && (
          <button
            type="button"
            onClick={() => {
              setShowAddForm(true);
              setEditingId(null);
            }}
            className={btnPrimary}
            data-ocid="admin.membres.add_button"
          >
            <Plus className="w-4 h-4" />
            Ajouter un membre
          </button>
        )}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <MemberForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            isPending={createMember.isPending}
            ocidPrefix="admin.membres.add"
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.membres.loading_state">
          {[1, 2, 3].map((sk) => (
            <div key={sk} className="h-20 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : members.length === 0 && !showAddForm ? (
        <div
          className="py-16 text-center card-elevated"
          data-ocid="admin.membres.empty_state"
        >
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <p className="font-display font-semibold text-foreground mb-1">
            Aucun membre enregistré
          </p>
          <p className="text-muted-foreground text-sm">
            Ajoutez les membres et dirigeants de Pantheon.
          </p>
        </div>
      ) : (
        <div className="card-elevated overflow-hidden divide-y divide-border/20">
          {members.map((member: Member, i: number) => (
            <div key={member.id} data-ocid={`admin.membres.item.${i + 1}`}>
              {editingId === member.id ? (
                <div className="p-4">
                  <MemberForm
                    initial={{
                      name: member.name,
                      title: member.title,
                      bio: member.bio,
                      photoUrl: member.photo?.getDirectURL() ?? "",
                    }}
                    onSubmit={(data) => handleUpdate(member.id, data)}
                    onCancel={() => setEditingId(null)}
                    isPending={updateMember.isPending}
                    ocidPrefix={`admin.membres.edit.${i + 1}`}
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-foreground/3 transition-smooth"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted border border-border/30">
                    {member.photo?.getDirectURL() ? (
                      <img
                        src={member.photo.getDirectURL()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm truncate">
                      {member.name}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                      {member.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(member.id);
                        setShowAddForm(false);
                      }}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-smooth text-muted-foreground"
                      title="Modifier"
                      data-ocid={`admin.membres.edit_button.${i + 1}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({ id: member.id, name: member.name })
                      }
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-smooth text-muted-foreground"
                      title="Supprimer"
                      data-ocid={`admin.membres.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Supprimer le membre ?"
        description={`Vous êtes sur le point de supprimer « ${deleteTarget?.name} ». Cette action est irréversible.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deleteMember.isPending}
        ocidPrefix="admin.membres.delete"
      />
    </div>
  );
}

// ─── Gallery Form ─────────────────────────────────────────────────────────────

function GalleryUploadForm({
  onSubmit,
  onCancel,
  isPending,
}: {
  onSubmit: (data: {
    imageUrl: string;
    category: string;
    caption: string;
  }) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("evenements");
  const [caption, setCaption] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-secondary/60 border border-border/40 rounded-xl p-5 space-y-4"
      data-ocid="admin.galerie.upload_form"
    >
      <FileUploadButton
        label="Photo *"
        preview={imageUrl}
        onChange={setImageUrl}
        ocid="admin.galerie.photo_upload"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="admin.galerie.category_select">
            Catégorie
          </label>
          <select
            id="admin.galerie.category_select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputCls}
            data-ocid="admin.galerie.category_select"
          >
            {GALLERY_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="admin.galerie.caption_input">
            Légende (max 200 caractères)
          </label>
          <input
            id="admin.galerie.caption_input"
            type="text"
            className={inputCls}
            placeholder="Courte description de la photo..."
            maxLength={200}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            data-ocid="admin.galerie.caption_input"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className={btnSecondary}
          data-ocid="admin.galerie.cancel_button"
        >
          <X className="w-3.5 h-3.5" />
          Annuler
        </button>
        <button
          type="button"
          disabled={!imageUrl || isPending}
          onClick={() => onSubmit({ imageUrl, category, caption })}
          className={btnPrimary}
          data-ocid="admin.galerie.submit_button"
        >
          {isPending ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          Uploader la photo
        </button>
      </div>
    </motion.div>
  );
}

// ─── Galerie Tab ──────────────────────────────────────────────────────────────

function GalerieTab() {
  const { data: photos = [], isLoading } = useGetPhotos();
  const createPhoto = useCreatePhoto();
  const deletePhoto = useDeletePhoto();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null);

  const handleUpload = async (data: {
    imageUrl: string;
    category: string;
    caption: string;
  }) => {
    try {
      await createPhoto.mutateAsync({
        imageUrl: data.imageUrl,
        category: data.category,
        caption: data.caption,
        display_order: photos.length,
      });
      toast.success("Photo ajoutée à la galerie");
      setShowUploadForm(false);
    } catch {
      toast.error("Erreur lors de l'upload");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deletePhoto.mutateAsync(deleteTarget.id);
      toast.success("Photo supprimée");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-5" data-ocid="admin.galerie.panel">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
            <Image className="w-4 h-4 text-primary" />
            Galerie photos
          </h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            {photos.length} photo{photos.length !== 1 ? "s" : ""}
          </p>
        </div>
        {!showUploadForm && (
          <button
            type="button"
            onClick={() => setShowUploadForm(true)}
            className={btnPrimary}
            data-ocid="admin.galerie.add_button"
          >
            <Upload className="w-4 h-4" />
            Ajouter une photo
          </button>
        )}
      </div>

      <AnimatePresence>
        {showUploadForm && (
          <GalleryUploadForm
            onSubmit={handleUpload}
            onCancel={() => setShowUploadForm(false)}
            isPending={createPhoto.isPending}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="admin.galerie.loading_state"
        >
          {[1, 2, 3, 4].map((sk) => (
            <div
              key={sk}
              className="aspect-square bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : photos.length === 0 && !showUploadForm ? (
        <div
          className="py-16 text-center card-elevated"
          data-ocid="admin.galerie.empty_state"
        >
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <p className="font-display font-semibold text-foreground mb-1">
            Galerie vide
          </p>
          <p className="text-muted-foreground text-sm">
            Uploadez les premières photos de Pantheon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo: GalleryPhoto, i: number) => {
            const catLabel =
              GALLERY_CATEGORIES.find((c) => c.value === photo.category)
                ?.label ?? photo.category;
            const catColor =
              GALLERY_CATEGORY_COLORS[photo.category] ??
              "bg-muted text-muted-foreground border-border";
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border/30"
                data-ocid={`admin.galerie.item.${i + 1}`}
              >
                <img
                  src={photo.image?.getDirectURL() ?? ""}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-between p-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${catColor}`}
                    >
                      {catLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget({ id: photo.id })}
                      className="w-7 h-7 rounded-lg bg-destructive/80 flex items-center justify-center hover:bg-destructive transition-smooth flex-shrink-0"
                      title="Supprimer"
                      data-ocid={`admin.galerie.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                  {photo.caption && (
                    <p className="text-xs text-white/90 line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Supprimer la photo ?"
        description="Cette photo sera définitivement supprimée de la galerie. Cette action est irréversible."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isPending={deletePhoto.isPending}
        ocidPrefix="admin.galerie.delete"
      />
    </div>
  );
}

// ─── Accès Tab ────────────────────────────────────────────────────────────────

function AccesTab() {
  const { data: adminList = [], isLoading: listLoading } = useGetAdminList();
  const { data: presidentPrincipal } = useGetPresidentPrincipal();
  const addAssistant = useAddAssistantAdmin();
  const removeAssistant = useRemoveAssistantAdmin();
  const { identity } = useInternetIdentity();

  const [newPrincipalStr, setNewPrincipalStr] = useState("");
  const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
  const [addError, setAddError] = useState("");

  const currentPrincipalStr = identity?.getPrincipal().toString();
  const presidentStr = presidentPrincipal?.toString();

  const handleAddAssistant = async () => {
    setAddError("");
    let principal: Principal;
    try {
      principal = Principal.fromText(newPrincipalStr.trim());
    } catch {
      setAddError(
        "Identifiant principal ICP invalide. Vérifiez la valeur saisie.",
      );
      return;
    }
    try {
      await addAssistant.mutateAsync(principal);
      toast.success("Accès accordé avec succès");
      setNewPrincipalStr("");
    } catch {
      toast.error("Erreur lors de l'attribution de l'accès");
    }
  };

  const handleRevoke = async () => {
    if (!revokeTarget) return;
    let principal: Principal;
    try {
      principal = Principal.fromText(revokeTarget);
    } catch {
      toast.error("Impossible de révoquer : identifiant invalide");
      setRevokeTarget(null);
      return;
    }
    try {
      await removeAssistant.mutateAsync(principal);
      toast.success("Accès révoqué");
    } catch {
      toast.error("Erreur lors de la révocation de l'accès");
    } finally {
      setRevokeTarget(null);
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin.acces.panel">
      {/* Explanation banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
        <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground text-sm mb-1">
            Authentification via Internet Identity (ICP)
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Sur cette plateforme, l'authentification se fait via{" "}
            <strong className="text-foreground">Internet Identity (ICP)</strong>{" "}
            — il n'y a pas de mot de passe. L'accès admin est accordé ou révoqué
            par{" "}
            <strong className="text-foreground">
              identifiant principal ICP
            </strong>
            . Le président peut ajouter ou retirer l'accès de son assistant à
            tout moment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current admins */}
        <div className="card-elevated overflow-hidden">
          <div className="px-5 py-4 border-b border-border/30 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Comptes admin actuels
            </h2>
          </div>

          {listLoading ? (
            <div
              className="p-5 space-y-3"
              data-ocid="admin.acces.loading_state"
            >
              {[1, 2].map((sk) => (
                <div
                  key={sk}
                  className="h-14 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : adminList.length === 0 ? (
            <div
              className="py-10 text-center"
              data-ocid="admin.acces.empty_state"
            >
              <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
              <p className="text-muted-foreground text-sm">
                Aucun admin enregistré.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {adminList.map((entry, i) => {
                const pStr = entry.principal.toString();
                const isPresident = pStr === presidentStr;
                const isSelf = pStr === currentPrincipalStr;
                return (
                  <div
                    key={pStr}
                    className="flex items-center gap-3 px-5 py-3.5"
                    data-ocid={`admin.acces.item.${i + 1}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-mono text-xs text-foreground truncate"
                        title={pStr}
                      >
                        {pStr.length > 24
                          ? `${pStr.slice(0, 12)}...${pStr.slice(-8)}`
                          : pStr}
                        {isSelf && (
                          <span className="ml-1.5 text-primary/80">(vous)</span>
                        )}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {isPresident ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-400 border border-amber-400/20">
                            Président
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                            Assistant
                          </span>
                        )}
                      </div>
                    </div>
                    {!isPresident && (
                      <button
                        type="button"
                        onClick={() => setRevokeTarget(pStr)}
                        className={btnDanger}
                        data-ocid={`admin.acces.revoke_button.${i + 1}`}
                      >
                        <X className="w-3 h-3" />
                        Révoquer l'accès
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add assistant form */}
        <div className="card-elevated overflow-hidden">
          <div className="px-5 py-4 border-b border-border/30 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Accorder l'accès assistant
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Entrez l'identifiant principal ICP de la personne à qui vous
              souhaitez accorder les droits d'administration. Elle devra se
              connecter avec Internet Identity pour accéder au panel.
            </p>
            <div>
              <label className={labelCls} htmlFor="admin.acces.principal_input">
                Identifiant Principal ICP
              </label>
              <input
                id="admin.acces.principal_input"
                type="text"
                className={`${inputCls} font-mono text-xs`}
                placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                value={newPrincipalStr}
                onChange={(e) => {
                  setNewPrincipalStr(e.target.value);
                  setAddError("");
                }}
                data-ocid="admin.acces.principal_input"
              />
              {addError && (
                <p
                  className="text-destructive text-xs mt-1.5"
                  data-ocid="admin.acces.error_state"
                >
                  {addError}
                </p>
              )}
            </div>
            <button
              type="button"
              disabled={!newPrincipalStr.trim() || addAssistant.isPending}
              onClick={handleAddAssistant}
              className={`${btnPrimary} w-full justify-center`}
              data-ocid="admin.acces.add_button"
            >
              {addAssistant.isPending ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <UserCheck className="w-4 h-4" />
              )}
              Accorder l'accès
            </button>

            {addAssistant.isSuccess && (
              <p
                className="text-emerald-400 text-xs text-center"
                data-ocid="admin.acces.success_state"
              >
                ✓ Accès accordé avec succès
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Revoke confirmation */}
      <ConfirmDeleteDialog
        open={!!revokeTarget}
        title="Révoquer l'accès ?"
        description={`L'assistant avec l'identifiant « ${revokeTarget ? `${revokeTarget.slice(0, 16)}...` : ""} » perdra l'accès au panel d'administration.`}
        onConfirm={handleRevoke}
        onCancel={() => setRevokeTarget(null)}
        isPending={removeAssistant.isPending}
        ocidPrefix="admin.acces.revoke"
      />
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

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

  const headerTitle: Record<AdminTab, string> = {
    articles: "Gestion des articles",
    submissions: "Soumissions membres",
    membres: "Annuaire des membres",
    galerie: "Galerie photos",
    acces: "Gestion des accès",
  };

  const navItems: {
    tab: AdminTab;
    icon: React.ElementType;
    label: string;
    count?: number;
  }[] = [
    {
      tab: "articles",
      icon: Newspaper,
      label: "Articles",
      count: articles.length,
    },
    {
      tab: "submissions",
      icon: Users,
      label: "Soumissions",
      count: submissions.length,
    },
    { tab: "membres", icon: UserCheck, label: "Membres" },
    { tab: "galerie", icon: Image, label: "Galerie" },
    { tab: "acces", icon: Lock, label: "Accès" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-card border-r border-border/30 flex flex-col min-h-screen sticky top-0 h-screen">
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
                Pantheon
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">Admin</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ tab, icon: Icon, label, count }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth text-left ${
                activeTab === tab
                  ? "bg-primary/20 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
              data-ocid={`admin.sidebar.${tab}_tab`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {count !== undefined && (
                <span className="ml-auto text-xs bg-muted rounded-full px-1.5 py-0.5">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

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
        <header className="bg-card border-b border-border/30 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-display font-black text-foreground leading-tight">
              {headerTitle[activeTab]}
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              {activeTab === "articles" &&
                `${articles.length} article${articles.length !== 1 ? "s" : ""} au total`}
              {activeTab === "submissions" &&
                `${submissions.length} soumission${submissions.length !== 1 ? "s" : ""} reçue${submissions.length !== 1 ? "s" : ""}`}
              {activeTab === "membres" &&
                "Gérez les membres et dirigeants Pantheon"}
              {activeTab === "galerie" && "Gérez la galerie photos de Pantheon"}
              {activeTab === "acces" &&
                "Contrôlez l'accès au panel d'administration"}
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
          {/* Stats — articles only */}
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
                    Commencez à créer du contenu pour votre site Pantheon.
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
                              className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[article.category] || "bg-muted text-muted-foreground border-border"}`}
                            >
                              {CATEGORY_LABELS[article.category] ||
                                article.category}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${article.published ? "bg-emerald-900/30 text-emerald-400 border-emerald-400/20" : "bg-amber-900/30 text-amber-400 border-amber-400/20"}`}
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

          {activeTab === "membres" && <MembresTab />}
          {activeTab === "galerie" && <GalerieTab />}
          {activeTab === "acces" && <AccesTab />}
        </main>
      </div>

      {/* Article delete dialog */}
      <ConfirmDeleteDialog
        open={!!articleToDelete}
        title="Supprimer l'article ?"
        description={`Vous êtes sur le point de supprimer « ${articleToDelete?.title} ». Cette action est irréversible.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setArticleToDelete(null)}
        isPending={deleteArticle.isPending}
        ocidPrefix="admin.delete"
      />
    </div>
  );
}
