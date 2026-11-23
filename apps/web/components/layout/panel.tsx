import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// 단말기 스타일의 기본 패널. 제목 줄 + 본문.
export function Panel({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("flex flex-col rounded-md border border-border", className)}>
      <h2 className="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
        {title}
      </h2>
      <div className="flex-1 p-3 text-sm">{children}</div>
    </section>
  );
}

export function Placeholder({ title, version }: { title: string; version: string }) {
  return (
    <Panel title={title}>
      <p className="text-muted-foreground">{version}에서 만든다.</p>
    </Panel>
  );
}
