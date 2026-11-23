export type NavItem = {
  href: string;
  label: string;
  /** 3.4 키보드 조작의 `g → key` 단축키. v0.3에서 연결한다. */
  shortcut?: string;
};

// DESIGN.md 3.1 사이드바 순서
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "대시보드", shortcut: "d" },
  { href: "/review", label: "복기", shortcut: "r" },
  { href: "/watchlist", label: "관심종목", shortcut: "w" },
  { href: "/screener", label: "스크리너", shortcut: "s" },
  { href: "/backtest", label: "백테스트" },
  { href: "/news", label: "뉴스" },
  { href: "/system", label: "시스템" },
];

/** 현재 경로가 메뉴 항목에 속하는지. `/review/123`은 `/review`에 속한다. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
