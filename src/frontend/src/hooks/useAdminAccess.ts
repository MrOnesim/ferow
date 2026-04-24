import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRole, createActor } from "../backend";
import type { AdminEntry } from "../types";

type ActorWithAdminAccess = {
  getAdminList(): Promise<Array<[Principal, string]>>;
  addAssistantAdmin(principal: Principal): Promise<void>;
  removeAssistantAdmin(principal: Principal): Promise<void>;
  getPresidentPrincipal(): Promise<Principal | null>;
};

export function useGetAdminList() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdminEntry[]>({
    queryKey: ["admin", "access", "list"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const list = await (
          actor as unknown as ActorWithAdminAccess
        ).getAdminList();
        return list.map(([principal, role]) => ({ principal, role }));
      } catch {
        // Fallback: use assignCallerUserRole-based approach
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useGetPresidentPrincipal() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Principal | null>({
    queryKey: ["admin", "access", "president"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await (
          actor as unknown as ActorWithAdminAccess
        ).getPresidentPrincipal();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddAssistantAdmin() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        await (actor as unknown as ActorWithAdminAccess).addAssistantAdmin(
          principal,
        );
      } catch {
        // Fallback to assignCallerUserRole if addAssistantAdmin not available
        await actor.assignCallerUserRole(principal, UserRole.admin);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "access"] });
    },
  });
}

export function useRemoveAssistantAdmin() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (principal: Principal) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        await (actor as unknown as ActorWithAdminAccess).removeAssistantAdmin(
          principal,
        );
      } catch {
        // Fallback: demote to user role
        await actor.assignCallerUserRole(principal, UserRole.user);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "access"] });
    },
  });
}
