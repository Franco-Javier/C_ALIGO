// Lectura y validación de FormData para las Server Actions.
// Cada lector lanza FormError con un mensaje para el usuario; la acción lo
// convierte en { ok: false, error } con `formError()`.

export class FormError extends Error {}

type TextOptions = { label: string; required?: boolean; max?: number };

/** Texto recortado; "" se convierte en null si el campo es opcional. */
export function readText(form: FormData, name: string, opts: TextOptions & { required: true }): string;
export function readText(form: FormData, name: string, opts: TextOptions): string | null;
export function readText(form: FormData, name: string, { label, required, max = 500 }: TextOptions) {
  const value = String(form.get(name) ?? "").trim();
  if (!value) {
    if (required) throw new FormError(`${label} es obligatorio`);
    return null;
  }
  if (value.length > max) throw new FormError(`${label} admite hasta ${max} caracteres`);
  return value;
}

/** Valor que debe ser una de las claves de un diccionario de etiquetas (enum del SQL). */
export function readEnum<T extends string>(
  form: FormData,
  name: string,
  labels: Record<T, string>,
  { label, required }: { label: string; required?: boolean },
): T | null {
  const value = String(form.get(name) ?? "");
  if (!value) {
    if (required) throw new FormError(`${label} es obligatorio`);
    return null;
  }
  if (!(value in labels)) throw new FormError(`${label} no es válido`);
  return value as T;
}

export function readUrl(form: FormData, name: string, opts: TextOptions) {
  const value = readText(form, name, { max: 1000, ...opts });
  if (value && !/^https?:\/\/\S+$/i.test(value) && !value.startsWith("/")) {
    throw new FormError(`${opts.label} debe ser un enlace http(s)`);
  }
  return value;
}

/** datetime-local ("2026-10-22T14:00") interpretado en hora de Panamá (UTC-5, sin horario de verano). */
export function readDateTime(form: FormData, name: string, opts: { label: string; required?: boolean }) {
  const value = String(form.get(name) ?? "");
  if (!value) {
    if (opts.required) throw new FormError(`${opts.label} es obligatoria`);
    return null;
  }
  const date = new Date(`${value}:00-05:00`);
  if (Number.isNaN(date.getTime())) throw new FormError(`${opts.label} no es válida`);
  return date.toISOString();
}

export function readCheckbox(form: FormData, name: string) {
  return form.get(name) === "on";
}

export function formError(error: unknown) {
  if (error instanceof FormError) return { ok: false as const, error: error.message };
  throw error;
}
