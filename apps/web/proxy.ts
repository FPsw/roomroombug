import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16부터 middleware.ts가 proxy.ts로 이름이 바뀌었다. 페이지 렌더링 전에 실행된다.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // 정적 파일과 이미지에는 인증 검사를 하지 않는다.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
