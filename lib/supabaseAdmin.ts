// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE!;

// Client admin (service role) pour actions côté serveur uniquement
export const supabaseAdmin = createClient(url, serviceRole, {
    auth: { persistSession: false },
});
