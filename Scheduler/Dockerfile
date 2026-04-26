FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "scheduler.py"]