import { c as createLucideIcon, u as useActor, b as useQuery, E as ExternalBlob, a as createActor } from "./backend-DoU0t11f.js";
import { c as useQueryClient } from "./index-Cu0pNX-b.js";
import { u as useMutation } from "./useMutation-C9s4NLTr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function mapArticle(a) {
  return {
    id: String(a.id),
    title: a.title,
    content: a.content,
    excerpt: a.excerpt,
    imageUrl: a.image.getDirectURL(),
    category: a.category.toLowerCase(),
    createdAt: new Date(Number(a.created_at) / 1e6).toISOString(),
    published: a.published
  };
}
function useGetAllArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "articles"],
    queryFn: async () => {
      if (!actor) return [];
      const articles = await actor.getAllArticles();
      return articles.map(mapArticle);
    },
    enabled: !!actor && !isFetching,
    staleTime: 0
  });
}
function useGetJoinSubmissions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJoinSubmissions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0
  });
}
function useCreateArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const imageBlob = ExternalBlob.fromURL(data.imageUrl ?? "");
      const article = await actor.createArticle(
        data.title,
        data.content,
        data.excerpt,
        imageBlob,
        data.category
      );
      return mapArticle(article);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
  });
}
function useUpdateArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const current = await actor.getArticleById(BigInt(id));
      if (!current) throw new Error("Article not found");
      const imageBlob = ExternalBlob.fromURL(
        data.imageUrl ?? current.image.getDirectURL()
      );
      await actor.updateArticle(
        BigInt(id),
        data.title ?? current.title,
        data.content ?? current.content,
        data.excerpt ?? current.excerpt,
        imageBlob,
        data.category ?? current.category
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
  });
}
function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteArticle(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
  });
}
function useTogglePublish() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.togglePublished(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
  });
}
export {
  Image as I,
  Upload as U,
  useGetJoinSubmissions as a,
  useDeleteArticle as b,
  useTogglePublish as c,
  useCreateArticle as d,
  useUpdateArticle as e,
  useGetAllArticles as u
};
