import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, createActor } from "../backend";
import type { Member, MemberFormData } from "../types";

function mapMember(m: {
  id: bigint;
  name: string;
  title: string;
  bio: string;
  photo: ExternalBlob;
  display_order: bigint;
  created_at: bigint;
}): Member {
  return {
    id: String(m.id),
    name: m.name,
    title: m.title,
    bio: m.bio,
    photo: m.photo,
    display_order: Number(m.display_order),
    created_at: m.created_at,
  };
}

export function useGetMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const members = await (
          actor as unknown as {
            getMembers(): Promise<
              Array<{
                id: bigint;
                name: string;
                title: string;
                bio: string;
                photo: ExternalBlob;
                display_order: bigint;
                created_at: bigint;
              }>
            >;
          }
        ).getMembers();
        return members.map(mapMember);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: MemberFormData) => {
      if (!actor) throw new Error("Actor not ready");
      const photoBlob = ExternalBlob.fromURL(data.photoUrl ?? "");
      const member = await (
        actor as unknown as {
          createMember(
            name: string,
            title: string,
            bio: string,
            photo: ExternalBlob,
            display_order: bigint,
          ): Promise<{
            id: bigint;
            name: string;
            title: string;
            bio: string;
            photo: ExternalBlob;
            display_order: bigint;
            created_at: bigint;
          }>;
        }
      ).createMember(
        data.name,
        data.title,
        data.bio,
        photoBlob,
        BigInt(data.display_order),
      );
      return mapMember(member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<MemberFormData>;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const photoBlob = data.photoUrl
        ? ExternalBlob.fromURL(data.photoUrl)
        : undefined;
      await (
        actor as unknown as {
          updateMember(
            id: bigint,
            name: string,
            title: string,
            bio: string,
            photo: ExternalBlob | undefined,
            display_order: bigint,
          ): Promise<boolean>;
        }
      ).updateMember(
        BigInt(id),
        data.name ?? "",
        data.title ?? "",
        data.bio ?? "",
        photoBlob,
        BigInt(data.display_order ?? 0),
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      await (
        actor as unknown as { deleteMember(id: bigint): Promise<boolean> }
      ).deleteMember(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
