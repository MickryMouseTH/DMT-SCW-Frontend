# DMT SCW Frontend — Docker workflow shortcuts.

.PHONY: dev build test serve stop logs clean clean-all prune

# Full clean: host artifacts + Docker images + node_modules/yarn volumes.
# Prereq for build/test so every one-shot run starts from scratch.
clean-all:
	rm -rf build dist coverage logs
	-docker image rm -f dmt-scw-frontend:build dmt-scw-frontend:test 2>/dev/null
	-docker volume rm -f dmt-scw-frontend_frontend_node_modules dmt-scw-frontend_frontend_yarn_cache 2>/dev/null

dev:
	docker compose up -d frontend-dev
	@echo "Dev server starting on http://localhost:3000"

build: clean-all
	mkdir -p build dist logs
	docker compose build --no-cache frontend-build
	docker compose run --rm frontend-build
	docker compose down --remove-orphans
	@echo "Build artifacts written to ./build and ./dist"

test: clean-all
	mkdir -p coverage logs
	docker compose build --no-cache frontend-test
	docker compose run --rm frontend-test
	docker compose down --remove-orphans
	@echo "Coverage written to ./coverage"

serve:
	docker compose up -d frontend-serve
	@echo "App is being served on http://localhost:8080"

stop:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf build dist coverage logs

prune: stop clean
	docker volume rm -f dmt-scw-frontend_frontend_node_modules dmt-scw-frontend_frontend_yarn_cache || true
