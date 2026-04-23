export type ArticleCategory =
  | "education"
  | "social"
  | "formation"
  | "leadership"
  | "all";

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: ArticleCategory;
  createdAt: string;
  published: boolean;
  author?: string;
}

export interface JoinFormData {
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  message?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: ArticleCategory;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}
