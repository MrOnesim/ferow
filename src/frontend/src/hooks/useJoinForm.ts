import { useActor } from "@caffeineai/core-infrastructure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createActor } from "../backend";
import type { JoinFormData } from "../types";

export type JoinFormState = "idle" | "submitting" | "success" | "error";

export function useJoinForm() {
  const [formState, setFormState] = useState<JoinFormState>("idle");
  const { actor } = useActor(createActor);

  const form = useForm<JoinFormData>({
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      ville: "",
      message: "",
    },
  });

  const onSubmit = async (data: JoinFormData) => {
    setFormState("submitting");
    try {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitJoinForm(
        data.nom,
        data.email,
        data.telephone,
        data.ville,
      );
      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    }
  };

  const reset = () => {
    setFormState("idle");
    form.reset();
  };

  return { form, onSubmit: form.handleSubmit(onSubmit), formState, reset };
}
