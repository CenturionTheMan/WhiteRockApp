.PHONY: dev prod prod-build down logs ps

dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml --env-file .env up --build

dev-d:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml --env-file .env up --build -d

prod-build:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml --env-file .env build --no-cache

prod:
	docker compose -f docker-compose.yaml -f docker-compose.prod.yaml --env-file .env up -d

down:
	docker compose -f docker-compose.yaml down

logs:
	docker compose logs -f

ps:
	docker compose ps