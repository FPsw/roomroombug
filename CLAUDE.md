# CLAUDE.md

이 프로젝트의 기준 문서는 [docs/DESIGN.md](docs/DESIGN.md)다. 작업 전에 해당 장을 먼저 읽는다.

## 작업 규칙 (DESIGN.md 10장)

- 구조나 스택을 바꾸려면 먼저 제안하고 승인받는다.
- `workers/src/rrb/domain/`의 구현은 사용자가 직접 작성한다. 이 폴더는 요청 없이 수정하지 않는다. 리뷰 요청을 받으면 문제점만 지적하고 코드를 고쳐 쓰지 않는다.
- 성능 개선 작업도 사용자가 직접 한다. 측정 스크립트 작성과 결과 해석 보조만 한다.
- 스키마 변경은 반드시 `supabase/migrations/`의 SQL 파일로 한다.
- 워커의 DB 쓰기는 upsert로 작성한다.
- 새 수집원은 `sources/` 어댑터로 추가하고, 기존 어댑터와 같은 형태의 표를 반환한다.
- 비밀값은 코드에 쓰지 않는다. `.env`와 `data/`는 커밋하지 않는다.
- 커밋은 Conventional Commits (`feat:`, `fix:`, `chore:`, `perf:`, `docs:`). 기능마다 브랜치 → PR.
- 새 라이브러리를 추가할 때는 이유를 PR 설명에 적는다.
- v0.x에서는 최적화하지 않는다. 읽기 쉽고 정확한 코드를 우선한다.

## 명령어

```bash
# 웹 (apps/web)
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build

# 워커 (workers)
uv run rrb run ping
uv run ruff check . && uv run ruff format --check .
uv run pytest

# DB (레포 루트, Docker 필요)
npx supabase start
npx supabase db reset            # 마이그레이션 + seed.sql 다시 적용
npx supabase migration new <이름>
```

## 알아둘 것

- 웹은 Next.js 16이다. `middleware.ts`가 아니라 `proxy.ts`를 쓰고, `cacheComponents`가 켜져 있어서 쿠키·DB를 읽는 컴포넌트는 `<Suspense>` 안에 둬야 한다. 코드를 쓰기 전에 `apps/web/node_modules/next/dist/docs/`의 문서를 확인한다.
- shadcn/ui는 `base-nova` 스타일(Base UI 기반)이고 `cn`은 `cn` 패키지에서 온다.
- Windows Git Bash에서는 한글 경로 때문에 npm/npx가 실패할 수 있다. PowerShell에서 실행한다.
