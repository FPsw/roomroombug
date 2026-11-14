# workers

roomroombug의 Python 워커. 수집 → 정규화 → 계산 결과를 DB에 쓴다.

```bash
uv sync                          # 의존성 설치 (.venv 생성)
uv run rrb run ping              # CLI 동작 확인
uv run ruff check . && uv run ruff format --check .
uv run pytest
```
