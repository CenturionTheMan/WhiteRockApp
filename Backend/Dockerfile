FROM python:3.12-slim AS base
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base AS dev
# code mounted via volume

FROM base AS prod
RUN pip install --no-cache-dir gunicorn
COPY Backend/ /app/
COPY shared/ /app/shared/
CMD ["gunicorn", "main:app", \
     "-w", "4", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:8000", \
     "--access-logfile", "-"]