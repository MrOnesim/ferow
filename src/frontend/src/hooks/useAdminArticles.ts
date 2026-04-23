import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Article,
  ExternalBlob,
  type JoinSubmission,
  createActor,
} from "../backend";
import type { ArticleCategory, Article as FrontendArticle } from "../types";

function mapArticle(a: Article): FrontendArticle {
  return {
    id: String(a.id),
    title: a.title,
    content: a.content,
    excerpt: a.excerpt,
    imageUrl: a.image.getDirectURL(),
    category: a.category.toLowerCase() as ArticleCategory,
    createdAt: new Date(Number(a.created_at) / 1_000_000).toISOString(),
    published: a.published,
  };
}

export function useGetAllArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FrontendArticle[]>({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getAllArticles();
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useGetJoinSubmissions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<JoinSubmission[]>({
    queryKey: ["admin", "submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJoinSubmissions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: Omit<FrontendArticle, "id" | "createdAt">) => {
      if (!actor) throw new Error("Actor not ready");
      const imageBlob = ExternalBlob.fromURL(data.imageUrl ?? "");
      const article = await actor.createArticle(
        data.title,
        data.content,
        data.excerpt,
        imageBlob,
        data.category,
      );
      return mapArticle(article);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Partial<FrontendArticle> }) => {
      if (!actor) throw new Error("Actor not ready");
      const current = await actor.getArticleById(BigInt(id));
      if (!current) throw new Error("Article not found");
      const imageBlob = ExternalBlob.fromURL(
        data.imageUrl ?? current.image.getDirectURL(),
      );
      await actor.updateArticle(
        BigInt(id),
        data.title ?? current.title,
        data.content ?? current.content,
        data.excerpt ?? current.excerpt,
        imageBlob,
        data.category ?? current.category,
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteArticle(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useTogglePublish() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id }: { id: string; published: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.togglePublished(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
