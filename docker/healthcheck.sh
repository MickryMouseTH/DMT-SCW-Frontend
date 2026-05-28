#!/bin/sh
# Container healthcheck — succeeds when nginx is serving /healthz.
set -e
curl -fsS http://127.0.0.1/healthz > /dev/null
