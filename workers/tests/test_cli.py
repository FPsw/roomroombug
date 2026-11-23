import datetime as dt

import pytest

from rrb.cli import build_parser, main


def test_run_ping_prints_date(capsys: pytest.CaptureFixture[str]) -> None:
    assert main(["run", "ping", "--date", "2026-11-13"]) == 0
    assert capsys.readouterr().out.strip() == "pong 2026-11-13"


def test_date_defaults_to_today() -> None:
    args = build_parser().parse_args(["run", "ping"])
    assert args.date == dt.date.today()


def test_unknown_job_is_rejected() -> None:
    with pytest.raises(SystemExit):
        main(["run", "no-such-job"])


def test_bad_date_is_rejected() -> None:
    with pytest.raises(SystemExit):
        main(["run", "ping", "--date", "2026-13-40"])
