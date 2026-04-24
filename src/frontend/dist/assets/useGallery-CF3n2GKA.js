import { c as useQueryClient } from "./index-Cu0pNX-b.js";
import { u as useActor, b as useQuery, E as ExternalBlob, a as createActor } from "./backend-DoU0t11f.js";
import { u as useMutation } from "./useMutation-C9s4NLTr.js";
function mapPhoto(p) {
  return {
    id: String(p.id),
    image: p.image,
    category: p.category,
    caption: p.caption,
    display_order: Number(p.display_order),
    created_at: p.created_at
  };
}
function useGetPhotos(category) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["gallery", "photos", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const photos = await actor.getPhotos(
          category ?? "all"
        );
        return photos.map(mapPhoto);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
function useCreatePhoto() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const imageBlob = ExternalBlob.fromURL(data.imageUrl ?? "");
      const photo = await actor.createPhoto(
        imageBlob,
        data.category,
        data.caption,
        BigInt(data.display_order)
      );
      return mapPhoto(photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
function useDeletePhoto() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deletePhoto(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
export {
  useCreatePhoto as a,
  useDeletePhoto as b,
  useGetPhotos as u
};
