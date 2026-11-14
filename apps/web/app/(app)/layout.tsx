import { BottomTabs, Sidebar } from "@/components/layout/nav-links";
import { TopBar } from "@/components/layout/top-bar";

// 로그인 후 화면 공통 레이아웃 (DESIGN.md 3.1). (app)은 URL에 나타나지 않는 라우트 그룹이다.
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-dvh flex-col">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto p-4 pb-16 md:pb-4">{children}</main>
      </div>
      <BottomTabs />
    </div>
  );
}
