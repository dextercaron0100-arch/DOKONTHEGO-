import { createClient } from '@supabase/supabase-js';

export function getSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase browser settings are not configured yet.');
  return createClient(url, key);
}
