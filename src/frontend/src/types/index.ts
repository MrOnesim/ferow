import type { Principal } from "@icp-sdk/core/principal";
import type { ExternalBlob } from "../backend";

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

export interface Member {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: ExternalBlob;
  display_order: number;
  created_at: bigint;
}

export type GalleryCategory =
  | "evenements"
  | "formations"
  | "actions_sociales"
  | "leadership"
  | "all";

export interface GalleryPhoto {
  id: string;
  image: ExternalBlob;
  category: string;
  caption: string;
  display_order: number;
  created_at: bigint;
}

export interface AdminEntry {
  principal: Principal;
  role: string;
}

export interface MemberFormData {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  display_order: number;
}

export interface GalleryPhotoFormData {
  imageUrl: string;
  category: string;
  caption: string;
  display_order: number;
}
