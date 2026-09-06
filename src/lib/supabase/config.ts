/**
 * The whole app runs in one of two modes:
 *
 * - Mock mode (no Supabase env vars set): every page works against
 *   src/lib/mock-data.ts, no auth is enforced. This is what you get out of
 *   the box, and what's been running in every screenshot so far.
 * - Connected mode (env vars set): db.ts reads/writes real Supabase tables,
 *   and middleware.ts enforces login on the CRM.
 *
 * This flag is the single switch between them — nothing else should check
 * `process.env` directly for this.
 */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
