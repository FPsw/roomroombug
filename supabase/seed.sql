-- 로컬 개발용 샘플 데이터. `supabase db reset` 때 마이그레이션 다음에 들어간다. 실제 DB에는 넣지 않는다.

insert into public.instruments (ticker, name, market, sector, listed_at) values
  ('005930', '삼성전자', 'KOSPI', '전기전자', '1975-06-11'),
  ('000660', 'SK하이닉스', 'KOSPI', '전기전자', '1996-12-26');

insert into public.job_runs (job, started_at, finished_at, status, row_count, duration_ms) values
  ('ping', now() - interval '1 day', now() - interval '1 day' + interval '2 seconds', 'success', 0, 2000),
  ('ping', now() - interval '10 minutes', now() - interval '10 minutes' + interval '1 second', 'success', 0, 1000);
