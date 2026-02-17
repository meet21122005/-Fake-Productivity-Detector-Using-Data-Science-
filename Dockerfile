# Dockerfile to run training in a reproducible container
FROM python:3.11-slim
WORKDIR /app
# system build deps for wheels
RUN apt-get update && \
    apt-get install -y build-essential gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app
WORKDIR /app/backend
# Default: run the official training entrypoint
CMD ["python", "-m", "app.ml.train_model"]
