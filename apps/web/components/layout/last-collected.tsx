import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const KST_TIME = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// 상단 바의 "마지막 수집" 표시. 가장 최근 job_runs 한 건을 읽는다. 실패면 빨간색.
export async function LastCollected() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("job_runs")
    .select("status, finished_at, started_at")
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) {
    return <span className="text-muted-foreground">마지막 수집 없음</span>;
  }

  const failed = data.status === "failed";
  const at = data.finished_at ?? data.started_at;
  return (
    <span className={cn("flex items-center gap-1.5", failed && "text-destructive")}>
      마지막 수집 {KST_TIME.format(new Date(at))}
      <span
        className={cn("size-2 rounded-full", failed ? "bg-destructive" : "bg-emerald-500")}
      />
    </span>
  );
}
