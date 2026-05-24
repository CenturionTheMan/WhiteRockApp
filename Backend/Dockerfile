# ── base: shared deps ────────────────────────────────────────────────────────
FROM python:3.12-slim AS base
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── dev: code is mounted via volume ──────────────────────────────────────────
FROM base AS dev
# No COPY needed — volume mount provides the code at runtime

# ── prod: code baked in, gunicorn for concurrency ────────────────────────────
FROM base AS prod
RUN pip install --no-cache-dir gunicorn
COPY . /app
CMD ["gunicorn", "main:app", \
     "-w", "4", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:8000", \
     "--access-logfile", "-"]