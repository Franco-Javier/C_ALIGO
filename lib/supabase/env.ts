export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Fase 0: sin proyecto de Supabase configurado se usan los datos de lib/mock. */
export const isMockMode = SUPABASE_URL === "";

// En Vercel nunca se usa el modo mock: con él cualquier visitante navegaría como
// MOCK_USUARIO (presidente). Si faltan las variables, el build falla aquí.
// (VERCEL no es NEXT_PUBLIC: en el navegador es undefined y esto no corre.)
if (process.env.VERCEL && isMockMode) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en Vercel (Settings › Environment Variables).",
  );
}
