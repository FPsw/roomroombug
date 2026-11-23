import { createBrowserClient } from "@supabase/ssr";

// 브라우저(Client Component)에서 쓰는 클라이언트. publishable 키만 쓰고, 권한은 RLS가 막는다.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
