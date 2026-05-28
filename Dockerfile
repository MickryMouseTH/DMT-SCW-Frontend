# syntax=docker/dockerfile:1.6
#
# DMT SCW Frontend — multi-stage build.
#
# Stages:
#   deps   → install node_modules (cacheable)
#   build  → produce production /app/build via CRACO
#   test   → run the test suite (one-shot)
#   dev    → hot-reload dev server (target for docker-compose)
#   serve  → tiny nginx image serving the built bundle (default runtime)
#
# Node 14 (Debian Buster) is pinned because react-scripts 3.4.1 + node-sass
# 4.14 only ship prebuilt bindings up to Node 12 and compile reliably under
# Node 14. node-sass 4 also depends on Python 2 at install time, which has
# been dropped from current Alpine and Bullseye repos but is still present
# in Buster. Upgrade these dependencies before bumping the base image.
# ---------------------------------------------------------------------------

ARG NODE_IMAGE=node:14-buster-slim
ARG NGINX_IMAGE=nginx:1.25-alpine

# ---------------------------------------------------------------------------
# 1) Dependencies — installs node_modules once for reuse by every other stage
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app

# Debian Buster moved to archive — repoint apt and skip Valid-Until checks.
RUN sed -i 's|deb.debian.org|archive.debian.org|g; s|security.debian.org|archive.debian.org|g; /buster-updates/d' /etc/apt/sources.list \
  && apt-get -o Acquire::Check-Valid-Until=false update \
  && apt-get install -y --no-install-recommends python2 build-essential git ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && ln -sf /usr/bin/python2 /usr/local/bin/python \
  && npm config set python /usr/bin/python2

# Lockfile-first layer caching.
# Note: not using --frozen-lockfile because the committed yarn.lock has
# drifted from package.json. Pinned versions still come from yarn.lock,
# but yarn is allowed to update it on install. Re-pin the lockfile via
# `yarn install` locally and commit the result to tighten this back up.
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000

# ---------------------------------------------------------------------------
# 2) Production build — emits /app/build (and a mirrored /app/dist)
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS build
WORKDIR /app

RUN sed -i 's|deb.debian.org|archive.debian.org|g; s|security.debian.org|archive.debian.org|g; /buster-updates/d' /etc/apt/sources.list \
  && apt-get -o Acquire::Check-Valid-Until=false update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096
ENV CI=true
ENV GENERATE_SOURCEMAP=false

# Invoke react-scripts directly (bypassing the package.json `build` script's
# hard-coded --max_old_space_size=6144 which exceeds typical Docker Desktop
# VM RAM and triggers a host-level OOM kill during webpack emit).
RUN node ./node_modules/@craco/craco/bin/craco.js build && cp -r build dist

# ---------------------------------------------------------------------------
# 3) Test runner — one-shot Jest with coverage
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS test
WORKDIR /app

RUN sed -i 's|deb.debian.org|archive.debian.org|g; s|security.debian.org|archive.debian.org|g; /buster-updates/d' /etc/apt/sources.list \
  && apt-get -o Acquire::Check-Valid-Until=false update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV CI=true
CMD ["yarn", "test", "--watchAll=false", "--coverage"]

# ---------------------------------------------------------------------------
# 4) Hot-reload dev server — primary target for `make dev`
# ---------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS dev
WORKDIR /app

RUN sed -i 's|deb.debian.org|archive.debian.org|g; s|security.debian.org|archive.debian.org|g; /buster-updates/d' /etc/apt/sources.list \
  && apt-get -o Acquire::Check-Valid-Until=false update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV CHOKIDAR_USEPOLLING=true
ENV WDS_SOCKET_HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]

# ---------------------------------------------------------------------------
# 5) Production runtime — nginx serving /usr/share/nginx/html
# ---------------------------------------------------------------------------
FROM ${NGINX_IMAGE} AS serve

RUN apk add --no-cache curl

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/healthcheck.sh /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/healthcheck.sh

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD /usr/local/bin/healthcheck.sh

CMD ["nginx", "-g", "daemon off;"]
