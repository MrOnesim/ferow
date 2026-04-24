import { ExternalBlob, UserRole, type Article, type JoinSubmission, type backendInterface } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleArticles: Article[] = [
  {
    id: BigInt(1),
    title: "Distribution de kits scolaires à Cotonou",
    content: "<p>FEROW a organisé une distribution de kits scolaires pour plus de 200 enfants dans les quartiers défavorisés de Cotonou. Cette initiative s'inscrit dans notre engagement pour l'éducation des jeunes.</p>",
    excerpt: "Plus de 200 enfants ont bénéficié de kits scolaires lors de cette journée de solidarité organisée par FEROW à Cotonou.",
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"),
    category: "Éducation",
    published: true,
    created_at: BigInt((Date.now() - 7 * 24 * 60 * 60 * 1000) * 1_000_000),
  },
  {
    id: BigInt(2),
    title: "Conférence sur le leadership des jeunes",
    content: "<p>FEROW a organisé une grande conférence réunissant plus de 300 jeunes leaders de tout le Bénin pour discuter des défis et opportunités du continent africain.</p>",
    excerpt: "300 jeunes leaders réunis pour une conférence sur l'avenir de l'Afrique organisée par FEROW à Parakou.",
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"),
    category: "Leadership",
    published: true,
    created_at: BigInt((Date.now() - 14 * 24 * 60 * 60 * 1000) * 1_000_000),
  },
  {
    id: BigInt(3),
    title: "Programme de formation professionnelle",
    content: "<p>FEROW lance un programme de formation professionnelle pour 150 jeunes, couvrant des compétences en informatique, entrepreneuriat et développement personnel.</p>",
    excerpt: "150 jeunes bénéficient d'un programme de formation professionnelle en partenariat avec des entreprises locales.",
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"),
    category: "Formation",
    published: true,
    created_at: BigInt((Date.now() - 21 * 24 * 60 * 60 * 1000) * 1_000_000),
  },
];

const sampleSubmissions: JoinSubmission[] = [
  {
    id: BigInt(1),
    name: "Kofi Mensah",
    email: "kofi@example.com",
    phone: "+229 97 00 00 01",
    city: "Cotonou",
    submitted_at: BigInt(Date.now() * 1_000_000),
  },
];

type BackendMember = {
  id: bigint;
  name: string;
  title: string;
  bio: string;
  photo: ExternalBlob;
  display_order: bigint;
  created_at: bigint;
};

type BackendPhoto = {
  id: bigint;
  image: ExternalBlob;
  category: string;
  caption: string;
  display_order: bigint;
  created_at: bigint;
};

const sampleMembers: BackendMember[] = [
  {
    id: BigInt(1),
    name: "Romuald Wadagni",
    title: "Président National FEROW",
    bio: "Leader visionnaire et engagé pour le développement de l'Afrique, Romuald Wadagni dirige FEROW depuis sa fondation avec détermination et passion.",
    photo: ExternalBlob.fromURL("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"),
    display_order: BigInt(0),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(2),
    name: "Aminata Diallo",
    title: "Secrétaire Générale",
    bio: "Juriste de formation, Aminata coordonne les activités administratives de FEROW et supervise la mise en œuvre des programmes nationaux.",
    photo: ExternalBlob.fromURL("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"),
    display_order: BigInt(1),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(3),
    name: "Koffi Agbayissah",
    title: "Directeur Communication",
    bio: "Expert en communication digitale, Koffi dirige la stratégie de communication de FEROW pour renforcer sa présence sur le plan national et international.",
    photo: ExternalBlob.fromURL("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"),
    display_order: BigInt(2),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(4),
    name: "Fatoumata Konaré",
    title: "Responsable Jeunesse",
    bio: "Militante pour les droits des jeunes, Fatoumata anime les programmes de développement personnel et professionnel dédiés à la jeunesse africaine.",
    photo: ExternalBlob.fromURL("https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400"),
    display_order: BigInt(3),
    created_at: BigInt(Date.now() * 1_000_000),
  },
];

const samplePhotos: BackendPhoto[] = [
  {
    id: BigInt(1),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"),
    category: "evenements",
    caption: "Grande conférence nationale FEROW — Cotonou",
    display_order: BigInt(0),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(2),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"),
    category: "formations",
    caption: "Atelier de formation en leadership — Parakou",
    display_order: BigInt(1),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(3),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"),
    category: "actions_sociales",
    caption: "Distribution de kits scolaires — quartiers défavorisés",
    display_order: BigInt(2),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(4),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"),
    category: "leadership",
    caption: "Session de mentorat pour jeunes leaders FEROW",
    display_order: BigInt(3),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(5),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800"),
    category: "evenements",
    caption: "Assemblée générale annuelle du mouvement FEROW",
    display_order: BigInt(4),
    created_at: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(6),
    image: ExternalBlob.fromURL("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800"),
    category: "actions_sociales",
    caption: "Campagne de sensibilisation dans les écoles",
    display_order: BigInt(5),
    created_at: BigInt(Date.now() * 1_000_000),
  },
];

// Extended actor methods used by hooks (beyond standard backendInterface)
type ExtendedActor = {
  getMembers(): Promise<BackendMember[]>;
  createMember(name: string, title: string, bio: string, photo: ExternalBlob, display_order: bigint): Promise<BackendMember>;
  updateMember(id: bigint, name: string, title: string, bio: string, photo: ExternalBlob | undefined, display_order: bigint): Promise<boolean>;
  deleteMember(id: bigint): Promise<boolean>;
  getPhotos(category: string): Promise<BackendPhoto[]>;
  createPhoto(imageBlob: ExternalBlob, category: string, caption: string, display_order: bigint): Promise<BackendPhoto>;
  deletePhoto(id: bigint): Promise<boolean>;
  getAdminList(): Promise<Array<{ principal: Principal; role: string }>>;
  addAssistantAdmin(principal: Principal): Promise<void>;
  removeAssistantAdmin(principal: Principal): Promise<void>;
  getPresidentPrincipal(): Promise<Principal | null>;
};

export const mockBackend: backendInterface & ExtendedActor = {
  _initializeAccessControl: async () => undefined,
  _immutableObjectStorageBlobsAreLive: async (_blobs) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_hash) => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info) => ({ success: undefined, topped_up_amount: undefined }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _registerAsPresident: async () => undefined,
  addAssistantAdmin: async (_target) => undefined,
  assignCallerUserRole: async (_user, _role) => undefined,
  getAdminList: async () => [],
  getPresidentPrincipal: async () => null,
  removeAssistantAdmin: async (_target) => undefined,
  createArticle: async (title, content, excerpt, image, category): Promise<Article> => ({
    id: BigInt(Date.now()),
    title,
    content,
    excerpt,
    image,
    category,
    published: false,
    created_at: BigInt(Date.now() * 1_000_000),
  }),
  deleteArticle: async (_id) => true,
  getAllArticles: async () => sampleArticles,
  getArticleById: async (id) => sampleArticles.find((a) => a.id === id) ?? null,
  getCallerUserRole: async () => UserRole.admin,
  getJoinSubmissions: async () => sampleSubmissions,
  getPublishedArticles: async () => sampleArticles.filter((a) => a.published),
  getRecentArticles: async (limit) => sampleArticles.slice(0, Number(limit)),
  isCallerAdmin: async () => true,
  submitJoinForm: async (_name, _email, _phone, _city) => undefined,
  togglePublished: async (_id) => true,
  updateArticle: async (_id, _title, _content, _excerpt, _image, _category) => true,

  // Extended: Members
  getMembers: async () => sampleMembers,
  createMember: async (name, title, bio, photo, display_order): Promise<BackendMember> => ({
    id: BigInt(Date.now()),
    name,
    title,
    bio,
    photo,
    display_order,
    created_at: BigInt(Date.now() * 1_000_000),
  }),
  updateMember: async (_id, _name, _title, _bio, _photo, _display_order) => true,
  deleteMember: async (_id) => true,

  // Extended: Gallery
  getPhotos: async (category: string) =>
    category === "all" ? samplePhotos : samplePhotos.filter((p) => p.category === category),
  createPhoto: async (imageBlob, category, caption, display_order): Promise<BackendPhoto> => ({
    id: BigInt(Date.now()),
    image: imageBlob,
    category,
    caption,
    display_order,
    created_at: BigInt(Date.now() * 1_000_000),
  }),
  deletePhoto: async (_id) => true,
};
