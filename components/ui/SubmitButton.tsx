"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

/** Botón de envío que muestra el spinner mientras corre la acción del <form>. */
export function SubmitButton(props: Omit<ComponentProps<typeof Button>, "type" | "loading">) {
  const { pending } = useFormStatus();
  return <Button type="submit" loading={pending} {...props} />;
}
