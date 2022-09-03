# Docker
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

# コンテナ操作
next:
	docker exec -it next bash
strapi:
	docker exec -it strapi bash

# yarn
yarn-ci:
	docker compose run --rm next yarn install --immutable --immutable-cache --check-cache

# 環境構築
init:
	@make copy-env
	@make build
	@make yarn-ci
	@make up
copy-env:
	cp ./client/.env.example ./client/.env