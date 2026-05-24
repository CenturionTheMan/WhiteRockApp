FROM python:3.12-slim AS base
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY Scheduler/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base AS dev
# code mounted via volume

FROM base AS prod
COPY Scheduler/ /app/
COPY shared/ /app/shared/
CMD ["python", "scheduler.py"]