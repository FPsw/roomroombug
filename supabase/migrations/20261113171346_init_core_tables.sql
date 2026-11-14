-- v0.1 첫 마이그레이션: 작업 실행 기록(job_runs)과 종목 목록(instruments).
-- 규칙 (DESIGN.md 6장): 가격은 numeric, 시각은 timestamptz. 화면에서만 KST로 바꾼다.

-- 종목 목록. 워커가 수집원에서 받아 upsert한다.
create table public.instruments (
  ticker      text primary key,              -- 종목 코드, 예: '005930'
  name        text not null,
  market      text not null,                 -- KOSPI, KOSDAQ, KONEX
  sector      text,
  listed_at   date,
  delisted_at date                           -- 상장폐지 종목도 지우지 않는다 (생존 편향 방지)
);

-- 작업 실행 기록. 모든 워커 작업이 시작·종료·행 수·소요 시간·에러를 남긴다.
-- duration_ms와 row_count는 나중에 성능 추이 그래프의 원자료가 된다 (DESIGN.md 7.4).
create table public.job_runs (
  id          bigint generated always as identity primary key,
  job         text not null,                 -- 예: 'daily-bars'
  started_at  timestamptz not null default now(),
  finished_at timestamptz,
  status      text not null default 'running'
              check (status in ('running', 'success', 'failed')),
  row_count   integer,
  duration_ms integer,
  error       text
);

-- RLS: 로그인한 사용자(= 나 하나, 회원가입은 막아 둠)만 읽을 수 있다.
-- 워커는 service_role 키로 접속하므로 RLS를 우회해서 쓴다. 브라우저의 anon 키로는 아무것도 못 읽는다.
alter table public.instruments enable row level security;
alter table public.job_runs enable row level security;

create policy "로그인 사용자 읽기" on public.instruments
  for select to authenticated using (true);

create policy "로그인 사용자 읽기" on public.job_runs
  for select to authenticated using (true);
