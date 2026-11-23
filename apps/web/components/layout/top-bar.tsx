import { Suspense } from "react";
import Link from "next/link";
import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { LastCollected } from "./last-collected";

export function TopBar() {
  return (
    <header className="flex h-11 shrink-0 items-center gap-4 border-b border-border px-3 text-sm">
      <Link href="/" className="font-mono font-semibold">
        roomroombug
      </Link>
      {/* 커맨드 팔레트(F6)는 v0.3에서 연결한다. 지금은 자리만 잡아 둔다. */}
      <div className="hidden flex-1 rounded-md border border-border px-3 py-1 text-muted-foreground sm:block">
        Ctrl+K 종목·명령 검색
      </div>
      <div className="ml-auto flex items-center gap-3 font-mono text-xs">
        {/* DB를 읽는 부분은 요청 시점에 실행되므로 Suspense로 감싼다 (cacheComponents 규칙). */}
        <Suspense fallback={<span className="text-muted-foreground">마지막 수집 …</span>}>
          <LastCollected />
        </Suspense>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="xs">
            로그아웃
          </Button>
        </form>
      </div>
    </header>
  );
}
