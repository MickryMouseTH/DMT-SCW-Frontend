# DMT SCW Frontend — Docker workflow shortcuts.

.PHONY: dev build test serve stop logs clean prune

dev:
	docker compose up -d frontend-dev
	@echo "Dev server starting on http://localhost:3000"

build:
	mkdir -p build dist logs
	docker compose run --rm frontend-build
	@echo "Build artifacts written to ./build and ./dist"

test:
	mkdir -p coverage logs
	docker compose run --rm frontend-test
	@echo "Coverage written to ./coverage"

serve:
	docker compose up -d frontend-serve
	@echo "App is being served on http://localhost:5000"

stop:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf build dist coverage logs

prune: stop clean
	docker volume rm -f dmt-scw-frontend_frontend_node_modules dmt-scw-frontend_frontend_yarn_cache || true
