.PHONY: dev prod prod-build down logs ps

dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml --env-file .env.dev up --build

dev-d:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml --env-file .env.dev up --build -d

prod-build:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml --env-file .env.prod build --no-cache

prod:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml --env-file .env.prod up -d

down:
	docker compose -f docker-compose.yaml down

logs:
	docker compose logs -f

ps:
	docker compose ps