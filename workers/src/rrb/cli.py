"""rrb 명령줄 진입점.

사용 예:
    rrb run ping
    rrb run daily-bars --date 2026-11-13   (v0.3에서 추가)
"""

import argparse
import datetime as dt
from collections.abc import Callable

from rrb.jobs import ping

# 작업 이름 → 실행 함수. 새 작업은 jobs/에 만들고 여기에 등록한다.
JOBS: dict[str, Callable[[dt.date], int]] = {
    "ping": ping.run,
}


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="rrb", description="roomroombug 워커")
    sub = parser.add_subparsers(dest="command", required=True)

    run = sub.add_parser("run", help="작업 하나를 실행한다")
    run.add_argument("job", choices=sorted(JOBS), help="실행할 작업 이름")
    run.add_argument(
        "--date",
        type=dt.date.fromisoformat,
        default=dt.date.today(),
        help="기준 날짜 YYYY-MM-DD (기본: 오늘)",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.command == "run":
        return JOBS[args.job](args.date)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
