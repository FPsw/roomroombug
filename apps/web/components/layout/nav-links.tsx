"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, isActive } from "@/lib/nav";

// 데스크톱: 왼쪽 사이드바
export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="hidden w-36 shrink-0 flex-col gap-0.5 border-r border-border p-2 md:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
            isActive(pathname, item.href) && "bg-muted text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// 모바일: 하단 탭 (DESIGN.md 3.1)
export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 flex overflow-x-auto border-t border-border bg-background md:hidden">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex-1 whitespace-nowrap px-3 py-3 text-center text-xs text-muted-foreground",
            isActive(pathname, item.href) && "text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
