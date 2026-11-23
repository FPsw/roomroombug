# roomroombug

personal stock analysis machine for who do not want to get out from room

매일 자동으로 데이터를 모으고, 내 매매를 복기하고, 내 조건에 맞는 종목을 찾아주는 개인용 투자 단말기.
설계는 [docs/DESIGN.md](docs/DESIGN.md), 설계 결정 기록은 [docs/adr/](docs/adr/).

## 구성

| 폴더 | 내용 | 스택 |
| --- | --- | --- |
| `apps/web` | 웹 화면 | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui |
| `workers` | 수집·계산 워커 | Python 3.12, uv |
| `supabase` | DB 스키마(마이그레이션) | Supabase Postgres |

## 로컬에서 띄우기

필요한 것: Node.js 24, [uv](https://docs.astral.sh/uv/), Docker Desktop

```bash
# 1. DB
npx supabase start               # 처음엔 이미지 다운로드로 오래 걸린다
npx supabase db reset            # 마이그레이션 + 샘플 데이터
# Studio(http://127.0.0.1:54323) > Authentication > Add user 로 내 계정을 만든다 (회원가입은 막혀 있다)

# 2. 웹
cp .env.example apps/web/.env.local   # supabase start 출력의 URL·publishable 키로 채운다
cd apps/web && npm install && npm run dev

# 3. 워커
cd workers && uv sync && uv run rrb run ping
```

## 로드맵

| 버전 | 내용 |
| --- | --- |
| v0.1 | 뼈대: 모노레포, CI, 로그인, 빈 대시보드 배포 |
| v0.2 | 매매 복기 |
| v0.3 | 파이프라인·차트 |
| v0.4 | 스크리너·알림 |
| v0.5 | 백테스트·뉴스 |
| v1.0 | 전 종목 + 성능 트랙 |
