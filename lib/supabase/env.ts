export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Fase 0: sin proyecto de Supabase configurado se usan los datos de lib/mock. */
export const isMockMode = SUPABASE_URL === "";
