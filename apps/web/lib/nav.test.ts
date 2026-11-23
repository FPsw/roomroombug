import { describe, expect, it } from "vitest";
import { NAV_ITEMS, isActive } from "./nav";

describe("isActive", () => {
  it("대시보드는 정확히 / 일 때만 활성", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/review", "/")).toBe(false);
  });

  it("하위 경로도 상위 메뉴에 속한다", () => {
    expect(isActive("/review", "/review")).toBe(true);
    expect(isActive("/review/42", "/review")).toBe(true);
  });

  it("이름이 비슷한 다른 경로는 속하지 않는다", () => {
    expect(isActive("/reviews", "/review")).toBe(false);
  });
});

describe("NAV_ITEMS", () => {
  it("단축키가 겹치지 않는다", () => {
    const keys = NAV_ITEMS.flatMap((i) => (i.shortcut ? [i.shortcut] : []));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
