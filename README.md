# DMT SCW Frontend

DMT — Don Muang Tollway Public Co., Ltd. — back-office web client.

> See [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) for the authoritative
> architecture, tech-stack, and theme-system reference.

## Quick start (Docker — recommended)

```bash
make dev      # http://localhost:3000  (hot-reload dev server)
make build    # ./build  + ./dist     (production bundle on host)
make test     # ./coverage             (Jest with coverage on host)
make serve    # http://localhost:5000  (nginx serving ./build)
make stop     # tear everything down
make clean    # remove build/dist/coverage/logs
```

## Quick start (host node — legacy)

Requires Node 14 + Yarn 1.22.

```bash
yarn install
yarn start
yarn build
yarn test --watchAll=false
```

## Dark mode

The app supports **Light**, **Dark**, and **System** modes. Use the toggle
in the sidebar (or the top-right of the Login page) to switch. The selection
is persisted to `localStorage` under `dmt-scw-theme`. With no override, the
app follows the operating-system color scheme.
