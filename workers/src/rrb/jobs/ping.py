"""CLI와 CI가 제대로 연결됐는지 확인하는 빈 작업. 실제 작업이 생기면 지워도 된다."""

import datetime as dt


def run(date: dt.date) -> int:
    print(f"pong {date.isoformat()}")
    return 0
