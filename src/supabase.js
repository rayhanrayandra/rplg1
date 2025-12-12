import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing!");
    console.log("VITE_SUPABASE_URL:", supabaseUrl ? "Set" : "Missing");
    console.log("VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "Set" : "Missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
});