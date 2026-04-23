import { ExternalBlob, UserRole, type Article, type JoinSubmission, type backendInterface } from "../backend";

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

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  _immutableObjectStorageBlobsAreLive: async (_blobs) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => undefined,
  _immutableObjectStorageCreateCertificate: async (_hash) => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info) => ({ success: undefined, topped_up_amount: undefined }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  assignCallerUserRole: async (_user, _role) => undefined,
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
};
