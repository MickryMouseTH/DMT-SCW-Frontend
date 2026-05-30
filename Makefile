# DMT SCW Frontend — Docker workflow shortcuts.

.PHONY: dev build rebuild test serve stop logs clean clean-all prune

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

# Fast rebuild (~30 s) — reuse the EXISTING build image + node_modules/yarn
# cache volumes and only re-run the CRACO build. Use this when only ./src or
# ./public changed (the common case while developing). The source is bind-
# mounted at runtime, so no image rebuild / yarn install is needed.
#
# First run on a clean machine auto-builds the image with layer cache (still
# fast on re-runs). Use the full `make build` when package.json / yarn.lock /
# Dockerfile change, or for a guaranteed-clean release build.
rebuild:
	mkdir -p build dist logs
	docker compose run --rm frontend-build
	docker compose down --remove-orphans
	@echo "Fast build → ./build and ./dist (use 'make build' if deps/Dockerfile changed)"

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
