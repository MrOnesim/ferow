import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { type Article, createActor } from "../backend";
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

export function useGetPublishedArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FrontendArticle[]>({
    queryKey: ["articles", "published"],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getPublishedArticles();
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetRecentArticles(limit = 3) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FrontendArticle[]>({
    queryKey: ["articles", "recent", limit],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getRecentArticles(BigInt(limit));
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetArticleById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FrontendArticle | undefined>({
    queryKey: ["articles", id],
    queryFn: async () => {
      if (!actor) return undefined;
      const article = await actor.getArticleById(BigInt(id));
      return article ? mapArticle(article) : undefined;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 5 * 60 * 1000,
  });
}
