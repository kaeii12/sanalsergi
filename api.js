import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(SUPABASE_URL.trim()) && !SUPABASE_URL.includes("PROJEKODU") && SUPABASE_KEY.startsWith("sb_publishable_") || (/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(SUPABASE_URL.trim()) && SUPABASE_KEY.startsWith("eyJ"));
export const sb = createClient(configured ? SUPABASE_URL.trim() : "https://example.supabase.co", configured ? SUPABASE_KEY.trim() : "placeholder");
export const photoUrl = p => sb.storage.from("photos").getPublicUrl(p).data.publicUrl;
export const logoUrl = p => p ? sb.storage.from("branding").getPublicUrl(p).data.publicUrl : "";
export async function getData() {
  if (!configured) throw new Error("config.js içine okulunuzun Supabase URL ve publishable/anon anahtarını yazın.");
  const [c, p, s] = await Promise.all([
    sb.from("categories").select("*").order("sort"),
    sb.from("photos").select("*"),
    sb.from("site_settings").select("*").eq("id", 1).single()
  ]);
  if (c.error || p.error || s.error) throw (c.error || p.error || s.error);
  return { cats: c.data, photos: p.data, settings: s.data };
}
