import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const TIME_ZONE = "America/Panama";

/** "24 oct 2026" */
export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("es-PA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(value));
}

/** "2:00 p. m." */
export function formatTime(value: string | Date) {
  return new Intl.DateTimeFormat("es-PA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(value));
}

/** Partes para el bloque de fecha de una tarjeta de evento: { dia: "24", mes: "OCT", semana: "JUE" } */
export function dateParts(value: string | Date) {
  const date = new Date(value);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("es-PA", { ...options, timeZone: TIME_ZONE })
      .format(date)
      .replace(".", "")
      .toUpperCase();
  return {
    dia: part({ day: "2-digit" }),
    mes: part({ month: "short" }),
    semana: part({ weekday: "short" }),
  };
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

/** Nombre de archivo para Storage: {uuid}-{nombre-limpio} */
export function storageFileName(originalName: string) {
  const clean = originalName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${crypto.randomUUID()}-${clean}`;
}
