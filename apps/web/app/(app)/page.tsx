import { Panel } from "@/components/layout/panel";

// DESIGN.md 3.3 대시보드. v0.1은 빈 패널 배치만 한다.
export default function DashboardPage() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Panel title="오늘의 신호" className="min-h-40">
        <Empty version="v0.4" />
      </Panel>
      <Panel title="관심종목 요약" className="min-h-40">
        <Empty version="v0.3" />
      </Panel>
      <Panel title="보유 중인 라운드" className="min-h-40">
        <Empty version="v0.2" />
      </Panel>
      <Panel title="공시 · 뉴스 최신" className="min-h-40">
        <Empty version="v0.5" />
      </Panel>
      <Panel title="복기 대기" className="md:col-span-2">
        <Empty version="v0.2" />
      </Panel>
    </div>
  );
}

function Empty({ version }: { version: string }) {
  return <p className="text-muted-foreground">아직 데이터 없음 ({version})</p>;
}
