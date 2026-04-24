export type GalleryCategory =
  | "evenements"
  | "formations"
  | "actions-sociales"
  | "leadership";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  date: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Événements
  {
    id: "g1",
    title: "Conférence nationale de la jeunesse FEROW",
    description:
      "Plus de 300 jeunes réunis à Cotonou pour débattre des défis de la génération africaine et tracer une feuille de route pour l'avenir.",
    imageUrl: "https://picsum.photos/seed/ferow1/800/600",
    category: "evenements",
    date: "20 mars 2025",
  },
  {
    id: "g2",
    title: "Cérémonie d'inauguration du siège de FEROW",
    description:
      "Inauguration officielle du nouveau siège national de FEROW à Cotonou, en présence de représentants politiques et de membres fondateurs.",
    imageUrl: "https://picsum.photos/seed/ferow2/800/600",
    category: "evenements",
    date: "14 février 2025",
  },
  {
    id: "g3",
    title: "Forum régional des leaders à Porto-Novo",
    description:
      "Rencontre régionale réunissant les délégués départementaux pour harmoniser les stratégies d'action locale et renforcer la cohésion du mouvement.",
    imageUrl: "https://picsum.photos/seed/ferow3/800/600",
    category: "evenements",
    date: "8 janvier 2025",
  },

  // Formations
  {
    id: "g4",
    title: "Atelier d'entrepreneuriat jeunesse",
    description:
      "80 jeunes entrepreneurs formés aux fondamentaux du business plan, du financement et de la gestion d'entreprise par des experts reconnus.",
    imageUrl: "https://picsum.photos/seed/ferow4/800/600",
    category: "formations",
    date: "15 mars 2025",
  },
  {
    id: "g5",
    title: "Formation en compétences numériques",
    description:
      "Initiation au marketing digital, à la création de contenu et aux outils collaboratifs pour 60 jeunes issus de communautés sous-desservies.",
    imageUrl: "https://picsum.photos/seed/ferow5/800/600",
    category: "formations",
    date: "22 février 2025",
  },
  {
    id: "g6",
    title: "Séminaire de développement personnel",
    description:
      "Deux jours de formation intensive sur la communication, la gestion du temps et le développement du leadership pour 50 jeunes membres de FEROW.",
    imageUrl: "https://picsum.photos/seed/ferow6/800/600",
    category: "formations",
    date: "10 décembre 2024",
  },

  // Actions sociales
  {
    id: "g7",
    title: "Distribution de kits scolaires à Cotonou",
    description:
      "200 enfants défavorisés ont reçu des kits scolaires complets grâce à la mobilisation de 50 bénévoles engagés de FEROW dans les quartiers défavorisés.",
    imageUrl: "https://picsum.photos/seed/ferow7/800/600",
    category: "actions-sociales",
    date: "5 mars 2025",
  },
  {
    id: "g8",
    title: "Campagne de don de sang",
    description:
      "Mobilisation citoyenne avec plus de 100 donneurs de sang réunis lors d'une journée de solidarité organisée en partenariat avec la Croix-Rouge du Bénin.",
    imageUrl: "https://picsum.photos/seed/ferow8/800/600",
    category: "actions-sociales",
    date: "18 janvier 2025",
  },
  {
    id: "g9",
    title: "Aide alimentaire dans les quartiers précaires",
    description:
      "Distribution de paniers alimentaires à 150 familles dans le besoin à Parakou, témoignant de l'ancrage social de FEROW auprès des plus vulnérables.",
    imageUrl: "https://picsum.photos/seed/ferow9/800/600",
    category: "actions-sociales",
    date: "24 novembre 2024",
  },

  // Leadership
  {
    id: "g10",
    title: "Masterclass avec Romuald Wadagni",
    description:
      "Séance exclusive d'échanges et de mentorat avec Romuald Wadagni sur la vision économique du Bénin et le rôle des jeunes dans le développement national.",
    imageUrl: "https://picsum.photos/seed/ferow10/800/600",
    category: "leadership",
    date: "10 mars 2025",
  },
  {
    id: "g11",
    title: "Programme FEROW Leaders 2025",
    description:
      "Lancement du programme annuel de formation des leaders locaux, sélectionnant 30 jeunes talents pour un parcours intensif de 6 mois sur le terrain.",
    imageUrl: "https://picsum.photos/seed/ferow11/800/600",
    category: "leadership",
    date: "1er février 2025",
  },
  {
    id: "g12",
    title: "Table ronde : Gouvernance et jeunesse africaine",
    description:
      "Discussion de haut niveau réunissant des experts en gouvernance, des élus locaux et des jeunes leaders pour co-construire l'avenir politique du Bénin.",
    imageUrl: "https://picsum.photos/seed/ferow12/800/600",
    category: "leadership",
    date: "5 décembre 2024",
  },
];

export const GALLERY_CATEGORIES: {
  value: GalleryCategory | "all";
  label: string;
}[] = [
  { value: "all", label: "Tous" },
  { value: "evenements", label: "Événements" },
  { value: "formations", label: "Formations" },
  { value: "actions-sociales", label: "Actions Sociales" },
  { value: "leadership", label: "Leadership" },
];
