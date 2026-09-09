import { createClient } from '@supabase/supabase-js';

function getServerEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function getSupabaseAdmin() {
  return createClient(
    getServerEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getServerEnv('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
