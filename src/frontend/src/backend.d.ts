import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface JoinSubmission {
    id: bigint;
    city: string;
    name: string;
    email: string;
    phone: string;
    submitted_at: bigint;
}
export interface Article {
    id: bigint;
    title: string;
    content: string;
    published: boolean;
    created_at: bigint;
    excerpt: string;
    category: string;
    image: ExternalBlob;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(title: string, content: string, excerpt: string, image: ExternalBlob, category: string): Promise<Article>;
    deleteArticle(id: bigint): Promise<boolean>;
    getAllArticles(): Promise<Array<Article>>;
    getArticleById(id: bigint): Promise<Article | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJoinSubmissions(): Promise<Array<JoinSubmission>>;
    getPublishedArticles(): Promise<Array<Article>>;
    getRecentArticles(limit: bigint): Promise<Array<Article>>;
    isCallerAdmin(): Promise<boolean>;
    submitJoinForm(name: string, email: string, phone: string, city: string): Promise<void>;
    togglePublished(id: bigint): Promise<boolean>;
    updateArticle(id: bigint, title: string, content: string, excerpt: string, image: ExternalBlob, category: string): Promise<boolean>;
}
