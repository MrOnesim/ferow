import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { GalleryPhoto, GalleryPhotoFormData } from "../types";

type BackendPhoto = {
  id: bigint;
  image: ExternalBlob;
  category: string;
  caption: string;
  display_order: bigint;
  created_at: bigint;
};

function mapPhoto(p: BackendPhoto): GalleryPhoto {
  return {
    id: String(p.id),
    image: p.image,
    category: p.category,
    caption: p.caption,
    display_order: Number(p.display_order),
    created_at: p.created_at,
  };
}

type ActorWithGallery = {
  getPhotos(category: string): Promise<Array<BackendPhoto>>;
  createPhoto(
    imageBlob: ExternalBlob,
    category: string,
    caption: string,
    display_order: bigint,
  ): Promise<BackendPhoto>;
  deletePhoto(id: bigint): Promise<boolean>;
};

export function useGetPhotos(category?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryPhoto[]>({
    queryKey: ["gallery", "photos", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const photos = await (actor as unknown as ActorWithGallery).getPhotos(
          category ?? "all",
        );
        return photos.map(mapPhoto);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreatePhoto() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: GalleryPhotoFormData) => {
      if (!actor) throw new Error("Actor not ready");
      const imageBlob = ExternalBlob.fromURL(data.imageUrl ?? "");
      const photo = await (actor as unknown as ActorWithGallery).createPhoto(
        imageBlob,
        data.category,
        data.caption,
        BigInt(data.display_order),
      );
      return mapPhoto(photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      await (actor as unknown as ActorWithGallery).deletePhoto(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
