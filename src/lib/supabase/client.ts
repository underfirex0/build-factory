import { createBrowserClient } from '@supabase/ssr';

/** Only call this when isSupabaseConfigured is true — it throws otherwise
 *  rather than silently returning a client pointed at nothing. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
