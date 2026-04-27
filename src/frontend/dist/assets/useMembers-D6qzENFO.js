import { r as reactExports, c as useQueryClient } from "./index-CFjb6K-E.js";
import { u as useActor, b as useQuery, E as ExternalBlob, a as createActor } from "./backend-DZFzHFEp.js";
import { u as useMutation } from "./useMutation-LtZF5aIj.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
function mapMember(m) {
  return {
    id: String(m.id),
    name: m.name,
    title: m.title,
    bio: m.bio,
    photo: m.photo,
    display_order: Number(m.display_order),
    created_at: m.created_at
  };
}
function useGetMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const members = await actor.getMembers();
        return members.map(mapMember);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
function useCreateMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const photoBlob = ExternalBlob.fromURL(data.photoUrl ?? "");
      const member = await actor.createMember(
        data.name,
        data.title,
        data.bio,
        photoBlob,
        BigInt(data.display_order)
      );
      return mapMember(member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });
}
function useUpdateMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const photoBlob = data.photoUrl ? ExternalBlob.fromURL(data.photoUrl) : void 0;
      await actor.updateMember(
        BigInt(id),
        data.name ?? "",
        data.title ?? "",
        data.bio ?? "",
        photoBlob,
        BigInt(data.display_order ?? 0)
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });
}
function useDeleteMember() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteMember(BigInt(id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });
}
export {
  useGetMembers as a,
  useCreateMember as b,
  composeRefs as c,
  useUpdateMember as d,
  useDeleteMember as e,
  useComposedRefs as u
};
