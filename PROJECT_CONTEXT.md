# DMT SCW Frontend — Project Context

> **Program Version: 1.5.4** — 3-level click-to-expand accordion
> sidebar menu (single-open per level, keyboard accessible, data-driven
> from `src/data/menu_tree_semantic.json`)

This document is the primary source of truth for the project. Read it before
making any change.

---

## 1. Project Overview

**Name:** `dmt-scw-frontend` (DMT — Don Muang Tollway Public Co., Ltd. — SCW
back-office web client)

**Purpose:** Operational back-office for tollway revenue / audit / maintenance
reporting, lane operations, and staff administration. Around ten functional
modules (M01–M10) plus a Dashboard, Login, Change-Password and Coming-Soon
pages.

**Primary user-base:** Internal DMT staff (Thai language, browser desktop
≥1024×788).

---

## 2. Tech Stack

| Layer            | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| UI framework     | React 16.13 (CRA 3.4.1 via CRACO 5.6)                   |
| Component lib    | Ant Design 4.3.x + `@ant-design/icons` 4.2              |
| Styling          | SCSS (node-sass 4.14) + LESS (`craco-less`, antd theme) |
| State            | Redux 4 + Redux-Thunk                                   |
| Routing          | React Router DOM 5.2 (HashRouter)                       |
| i18n             | i18next 19 + react-i18next 11                           |
| Charts           | `react-google-charts`, D3 (`d3-scale`, `d3-axis`)       |
| Tables / Excel   | antd Table, `exceljs`, `xlsx`, `file-saver`             |
| PDF / Print      | `jspdf-autotable`, `html2canvas`, `react-to-print`      |
| Notifications    | `sweetalert2`                                           |
| Auth             | `jsonwebtoken`, custom token in `localStorage`          |
| Fonts            | Kanit (self-hosted, Thai)                               |
| Bundler scripts  | CRACO (`yarn start`, `yarn build`, `yarn test`)         |
| Container runtime| Docker + Docker Compose (Node 18 + nginx 1.25 alpine)   |

---

## 3. Top-level Layout

```
dmt-scw-frontend/
├── PROJECT_CONTEXT.md            ← this file
├── package.json
├── craco.config.js               ← CRACO + LESS plugin (antd theme vars)
├── docker-compose.yaml           ← dev / build / test / serve services
├── Dockerfile                    ← multi-stage build + nginx runtime
├── docker/
│   ├── nginx.conf                ← SPA-friendly nginx config
│   └── healthcheck.sh            ← container HTTP healthcheck
├── Makefile                      ← `make dev|build|test|serve|stop`
├── public/
│   ├── index.html                ← contains pre-paint theme bootstrap
│   ├── assets/                   ← brand images, locales, runtime api config
│   └── manifest.json
└── src/
    ├── App.js                    ← Provider tree (Redux + Theme + Router)
    ├── index.js                  ← Mounts <App/>, imports global styles
    ├── _navbar.js                ← Menu structure (M01..M10)
    ├── i18next.js                ← i18n bootstrap
    ├── assets/
    │   ├── css/index.css
    │   ├── fonts/kanit/…
    │   ├── img/…
    │   ├── less/
    │   │   ├── theme.less        ← Antd LESS variables (compile time)
    │   │   └── variables.less    ← Imports antd + theme.less
    │   └── scss/
    │       ├── App.scss          ← entry
    │       ├── style.scss        ← imports partials below
    │       ├── _tokens.scss      ← (v1.5.0) CSS-variable semantic tokens
    │       ├── _theme_color.scss ← SCSS color aliases (now token-backed)
    │       ├── _theme_size.scss
    │       ├── _variables.scss
    │       ├── _custom_antd.scss
    │       ├── _custom_color.scss
    │       ├── _custom_style.scss
    │       ├── _default_layout.scss
    │       ├── _cutom_layout_style.scss
    │       ├── _dark_mode.scss   ← (v1.5.0) Dark-mode Antd overrides
    │       └── layout/…          ← Bootstrap-style utility classes
    ├── theme/                    ← (v1.5.0) Theme runtime
    │   ├── ThemeContext.js
    │   ├── ThemeProvider.js
    │   ├── useTheme.js
    │   ├── ThemeToggle.js
    │   └── themeBootstrap.js     ← inlined into public/index.html
    ├── components/               ← Reusable UI (button, chart, form, table…)
    ├── data/
    │   └── menu_tree_semantic.json   ← (v1.5.4) 3-level sidebar menu source
    ├── contrainers/DefaultLayout/← Authenticated app shell (sidebar+content)
    │   ├── DefaultLayout.js
    │   ├── DefaultMenu.js           ← sidebar shell (logo/user/toggle/logout)
    │   ├── AccordionMenu.js         ← (v1.5.4) 3-level accordion menu
    │   ├── accordion-menu.scss      ← (v1.5.4) accordion styles
    │   ├── menuTree.js              ← (v1.5.4) JSON→tree adapter + active path
    │   ├── HeadTitle.js
    │   └── Logout.js
    ├── views/                    ← M01..M10 + Dashboard + pages/
    ├── redux/                    ← store / actions / reducers
    ├── route/                    ← route registry per module
    ├── service/                  ← API service layer
    └── tools/                    ← misc utilities
```

---

## 4. Application Architecture

### 4.1 Routing
`App.js` mounts a `HashRouter`. Top-level routes: `/login`, `/comingsoon`,
`/changepassword`, and `/` → `DefaultLayout` which composes a sidebar
(`DefaultMenu`) and a content area rendering one of `route/Main.js`'s
module-keyed children based on user permissions.

### 4.5 Sidebar Menu (v1.5.4 — 3-level accordion)

The sidebar is the `<AccordionMenu>` component
(`src/contrainers/DefaultLayout/AccordionMenu.js`) rendered inside the
existing `<DefaultMenu>` shell. It replaces the legacy 2-level dropdown
with a 3-level click-to-expand tree.

**Data source.** `src/data/menu_tree_semantic.json` defines the tree:

```json
{
  "menu": [
    { "id": "G01", "name": "...",                    // Level 1 group
      "children": [
        { "id": "G0101", "name": "...",              // Level 2 subgroup
          "children": [
            { "id": "M010000001", "name": "..." }    // Level 3 leaf
          ]
        }
      ]
    }
  ]
}
```

Top-level entries are `G01..G08`, second-level entries are `G0xxx`,
leaves are the existing `M0xxxxxxx` ids. Leaves carry **only** an id +
display label in the JSON; their routes (`link`) are resolved at runtime
from the legacy `src/_navbar.js` via `menuTree.js#buildAccordionTree`,
and their final labels are pulled from `localStorage.user_data.pms[].
menuNameTh/En` so backend-supplied translations still win when present.

**Permissions.** A leaf is included only if its id appears in the
logged-in user's `pms` array. Empty L2/L1 branches are dropped so the
user never sees a dead-end group.

**Accordion behaviour.** Mutually exclusive within each level:

- Tapping a Level 1 group expands it and collapses any previously open
  Level 1 group (single-open per level).
- Tapping a Level 2 group expands it and collapses any previously open
  Level 2 group *within the same Level 1* (single-open per level).
- Tapping an already-open group toggles it closed.
- Tapping a Level 3 leaf navigates via `react-router-dom`. Re-tapping
  the active leaf triggers `window.location.reload()` (matches the
  legacy DefaultMenu behaviour the staff rely on).
- The menu auto-expands to reveal the active leaf when the route changes
  (e.g. deep-link or programmatic navigation), without auto-collapsing
  any group the user has chosen to keep open.

**Accessibility.** The list is `role="tree"`; groups are
`role="treeitem"` buttons with `aria-expanded` reflecting state and
`aria-controls` pointing at their child list (`role="group"`); leaves
are `role="treeitem"` with `aria-selected` on the active one. Enter and
Space toggle groups; arrow keys are intentionally not hijacked so the
sidebar coexists with route-level keyboard flows.

**Styling.** `accordion-menu.scss` lives next to the component. All
colours are CSS custom properties from the semantic token layer
(`_tokens.scss`), so the menu follows the active theme automatically.
Expand/collapse uses a max-height transition (no JS measurement).
Long menus scroll via the `.sidebar-menu-scroll` wrapper so the logo /
user info / theme toggle / logout / version footer stay anchored.

### 4.2 State
`redux/store/index.js` builds a single store with thunk middleware. Only
auth state is persisted in `localStorage` (token + user data + i18n
language preference + **theme preference**).

### 4.3 Permissions
A logged-in user's `pms` array (menu ID whitelist) is read from
`localStorage` and used to filter both menu items and React Router routes.

### 4.4 Internationalisation
i18next with browser-language detector. Translation JSON lives under
`public/locales/{th,en}/…`. Module names are also fed by the backend via
`user_data.pms[].menuNameTh/En`.

---

## 5. Theme System (v1.5.0)

### 5.1 Goals
1. Support **Light**, **Dark**, and **System** modes.
2. Detect OS preference via `prefers-color-scheme`.
3. Persist user override in `localStorage` under key `dmt-scw-theme`.
4. Centralise colors as semantic CSS variables — **no new hardcoded
   colors** in components.
5. Avoid white-flash by applying the theme **before first paint**.

### 5.2 Token layer (`src/assets/scss/_tokens.scss`)

Two CSS variable sets are emitted on `:root`:

| Token                            | Light                      | Dark                       |
| -------------------------------- | -------------------------- | -------------------------- |
| `--color-brand`                  | `#91098f`                  | `#b536b3`                  |
| `--color-brand-contrast`         | `#ffffff`                  | `#ffffff`                  |
| `--color-bg-app`                 | `#f7f7f7`                  | `#0f1115`                  |
| `--color-bg-surface`             | `#ffffff`                  | `#1a1d24`                  |
| `--color-bg-surface-elevated`    | `#ffffff`                  | `#22262f`                  |
| `--color-bg-muted`               | `#fafafa`                  | `#2a2f3a`                  |
| `--color-text-primary`           | `rgba(0,0,0,.85)`          | `rgba(255,255,255,.92)`    |
| `--color-text-secondary`         | `rgba(0,0,0,.65)`          | `rgba(255,255,255,.72)`    |
| `--color-text-muted`             | `#6c757d`                  | `#9aa3b2`                  |
| `--color-text-inverse`           | `#ffffff`                  | `#0f1115`                  |
| `--color-border`                 | `#d9d9d9`                  | `#3a4051`                  |
| `--color-border-strong`          | `#bfbfbf`                  | `#525a6e`                  |
| `--color-success`                | `#52c41a`                  | `#73d13d`                  |
| `--color-warning`                | `#faad14`                  | `#fadb14`                  |
| `--color-error`                  | `#f5222d`                  | `#ff4d4f`                  |
| `--color-info`                   | `#722ed1`                  | `#9254de`                  |
| `--color-shadow-sm`              | `rgba(0,0,0,.075)`         | `rgba(0,0,0,.6)`           |
| `--color-shadow-md`              | `rgba(0,0,0,.15)`          | `rgba(0,0,0,.7)`           |
| `--color-overlay`                | `rgba(0,0,0,.45)`          | `rgba(0,0,0,.7)`           |
| `--color-scrollbar-track`        | `#f0f0f0`                  | `#1a1d24`                  |
| `--color-scrollbar-thumb`        | `#bfbfbf`                  | `#3a4051`                  |

Theme selection is keyed by `<html data-theme="light|dark">`. Light is the
default; the dark block re-defines the same custom properties under
`[data-theme="dark"]`. No SCSS recompile needed to switch modes — switching
is purely a runtime DOM attribute flip.

### 5.3 Pre-paint bootstrap (`src/theme/themeBootstrap.js`)

This module exports a self-contained IIFE string that is inlined into
`public/index.html` (`<script>` in `<head>`). It:

1. Reads `localStorage['dmt-scw-theme']` (`light` / `dark` / `system`).
2. Falls back to `system`.
3. If `system`, resolves with `window.matchMedia('(prefers-color-scheme: dark)')`.
4. Sets `<html data-theme="…">` before React mounts → **no FOUC**.

### 5.4 Runtime (`src/theme/ThemeProvider.js`, `useTheme.js`)

The provider:

- Mirrors the bootstrap logic in React state.
- Subscribes to the OS media-query change event when mode is `system`.
- Exposes `{ mode, resolvedTheme, setMode }` via `useTheme()`.
- Writes `<html data-theme>` and persists to localStorage on every change.

`App.js` wraps the router with `<ThemeProvider>` so any component can call
`useTheme()` to read or change the theme.

### 5.5 Toggle (`src/theme/ThemeToggle.js`)

Three-segment control (Sun / Moon / Monitor) rendered in the sidebar (above
the logout button) and on the Login page. Selecting `system` re-syncs to OS
preference.

### 5.6 Antd integration (`src/assets/scss/_dark_mode.scss`)

Antd 4 ships compiled CSS with hardcoded colors. We re-skin its visible
surfaces under `[data-theme="dark"]` using semantic tokens — Layout, Card,
Modal, Drawer, Table (head/body/hover/expanded/summary/fixed-columns),
Select dropdown, Pagination, Input, Picker (date/time), Menu, Tabs,
Tooltip/Popover, Notification, Message, Skeleton, Steps, Divider, Tag,
Alert, Image preview, Spin, and SweetAlert2. Brand-coloured surfaces
(primary buttons, active menu pill) intentionally remain brand-coloured
in both themes.

#### Defensive inline-style overrides (v1.5.2)

The legacy view code (M01–M10) uses several thousand inline
`style={{ color: 'black' | 'gray' | 'rgba(0, 0, 0, 0.45)' | ... }}` and
`style={{ background: 'white' | '#fff' | '#fafafa' }}` patterns scattered
across ~500 files. Rewriting each call-site is impractical and would
churn unrelated code.

Instead, `_dark_mode.scss` carries a block of **global CSS attribute
selectors** under `[data-theme="dark"]` that match the serialised React
style attribute and rewrite the bad value to the right semantic token:

| Inline value                              | Rewritten to                |
| ----------------------------------------- | --------------------------- |
| `color: black` / `#000` / `rgb(0,0,0)`    | `var(--color-text-primary)` |
| `color: rgba(0,0,0,.85)` / `.65`          | `var(--color-text-primary)` |
| `color: rgba(0,0,0,.45)` / `.25`          | `var(--color-text-muted)`   |
| `color: gray|grey|#333..#999`             | `var(--color-text-muted)`   |
| `background: white|#fff|rgb(255,...)`     | `var(--color-bg-surface)`   |
| `background: #fafafa|#f7f7f7`             | `var(--color-bg-muted)`     |

Light mode is unaffected — these selectors only apply when
`[data-theme="dark"]` is on `<html>`. New code should still avoid
hardcoded colors; the defensive layer is for legacy reach-back, not a
license to add more inline color literals.

### 5.7 Scrollbars & form controls

Custom scrollbar styling uses tokenised colors (WebKit + Firefox). Native
`select`, `input`, and `textarea` inherit `color-scheme` from `<html>` so
the browser renders dropdown chrome / picker UI in the correct theme.

---

## 6. Docker Environment (v1.5.0)

### 6.1 Dockerfile

Five stages — `node:14-buster-slim` for build, `nginx:1.25-alpine` for runtime:

| Stage   | Purpose                                              | Output                       |
| ------- | ---------------------------------------------------- | ---------------------------- |
| `deps`  | `yarn install` → `/app/node_modules`                 | Cached layer for other stages |
| `build` | Packaged image; runs `craco build` at container time | `./build` + `./dist` on host |
| `test`  | One-shot Jest with `--coverage`                      | `./coverage` on host         |
| `dev`   | `yarn start` (CRACO dev server)                      | Hot-reload on :3000          |
| `serve` | nginx serving `/usr/share/nginx/html`                | Production runtime container |

**Base image rationale.** The stack is pinned to `node:14-buster-slim`
because `react-scripts@3.4.1` plus `node-sass@4.14` only ship prebuilt
bindings up to Node 12, compile cleanly on Node 14, and require Python 2
at install time. Python 2 has been dropped from current Alpine and Bullseye
repos but is still installable on Buster (via `archive.debian.org`, which
the Dockerfile is already configured to use). Upgrade these two npm
dependencies before bumping the base image.

Layer-caching is preserved by copying `package.json` + `yarn.lock` first,
so source-only changes do not invalidate `yarn install`.

The `build` stage invokes `node ./node_modules/@craco/craco/bin/craco.js
build` directly instead of `yarn build` to override the
`--max_old_space_size=6144` in `package.json` (which exceeds typical Docker
Desktop VM RAM and triggers a BuildKit-level OOM). The container heap is
capped via `NODE_OPTIONS=--max_old_space_size=4096`.

> **Memory requirement.** The production bundle needs roughly 4 GiB of
> headroom during webpack emit. The default Docker Desktop allocation
> (4 GiB) is borderline; **6 GiB or more is recommended** (Docker Desktop
> → Settings → Resources → Memory) — otherwise the build can be OOM-killed
> at the BuildKit level with `ResourceExhausted: cannot allocate memory`.

### 6.2 docker-compose.yaml services

| Service          | Purpose                          | Ports     | Volumes mapped to host                |
| ---------------- | -------------------------------- | --------- | ------------------------------------- |
| `frontend-dev`   | Hot-reload dev server (CRACO)    | 3000      | `./src`, `./public`, named `node_modules` |
| `frontend-test`  | One-shot test runner             | —         | `./coverage`, `./logs`                |
| `frontend-build` | One-shot production build        | —         | `./build`, `./dist`, `./logs`         |
| `frontend-serve` | Nginx serving built `./build`    | 8080:80   | `./build` (read-only)                 |

Shared resources:

- Named volume `frontend_node_modules` — keeps host `node_modules` clean and
  lets the dev container own them (cache optimisation).
- User network `dmt-scw-net` (bridge) for inter-service comms.
- `.env` is loaded by every service; only `REACT_APP_*` vars are exposed to
  the bundle.
- `frontend-serve` declares a `healthcheck` against `/` over HTTP.

### 6.3 Host-visible build artifacts

After `make build` / `docker compose run --rm frontend-build`:

- `./build/` — production CRA bundle (HTML/JS/CSS/assets).
- `./dist/` — copy of `./build/` (legacy alias, kept in sync).
- `./coverage/` — Jest coverage output (after `make test`).
- `./logs/` — captured CRACO / nginx logs.

Volumes are bind-mounted to these host paths so artifacts survive container
removal and are directly inspectable from macOS.

### 6.4 Makefile shortcuts

```
make dev       # docker compose up frontend-dev (hot reload on :3000)
make build     # one-shot production build → ./build
make test      # one-shot test run with coverage → ./coverage
make serve     # nginx serving ./build on :8080
make stop      # docker compose down
make clean     # remove build/dist/coverage/logs
```

---

## 7. Build / Run Instructions

### 7.1 Local (host node)

```bash
yarn install
yarn start            # dev server :3000
yarn build            # production bundle into ./build
yarn test --watchAll=false
```

### 7.2 Docker (recommended for CI / parity)

```bash
make dev              # http://localhost:3000
make build            # ./build populated on host
make test             # ./coverage populated on host
make serve            # http://localhost:8080 (nginx)
```

---

## 8. Dark-Mode Coverage Notes

Confirmed working surfaces:

- Authenticated shell (`DefaultLayout`, sidebar, head title, content card).
- Login & Change-Password & Coming-Soon pages.
- All `antd` components used in the app: Card, Table, Modal, Drawer, Form,
  Input, Select, DatePicker, Radio, Checkbox, Pagination, Menu, Tabs, Tooltip,
  Notification, Message, Skeleton.
- Charts: `react-google-charts` receives an `options.backgroundColor` /
  `options.colors` derived from the current theme via `useTheme()`.
- SweetAlert2 dialogs (custom CSS class).
- Native scrollbars (WebKit + Firefox).

### Known limitations

- Print stylesheets (`@media print`) intentionally force a **light** color
  scheme so printed reports stay legible on paper.
- Some legacy modules that render fixed-color SVG / `html2canvas` snapshots
  for PDF export use light tokens regardless of UI theme (so exports look
  unchanged).
- Antd 4 has no first-class dark-theme bundle in this version; the dark
  styling is an override layer rather than a recompiled theme. If antd is
  upgraded, consider switching to `antd/dist/antd.dark.css` and removing
  the override file.
- `react-google-charts` widgets in M07 report screens still render with a
  fixed `backgroundColor: '#FFFFFF'`. Those views are primarily used for
  the print/PDF export flow, so they intentionally stay light. New chart
  screens should derive `backgroundColor` from `useTheme()`.

### Docker build verification

`docker build --target build` was executed during the v1.5.0 work. The
build reached the webpack-emit stage successfully after eight+ minutes —
proving that the SCSS / LESS token refactor, antd dark overrides, theme
runtime, and every imported view compile cleanly under react-scripts. The
final bundle write was OOM-killed on the developer machine because Docker
Desktop only had ~4 GiB of headroom; raising the VM allocation to 6 GiB
or running `make build` on a host with more RAM lets the bundle emit
finish. See the **Memory requirement** call-out in §6.1.

---

## 9. Coding Conventions

- **Never hardcode colors in JS/SCSS.** Use a semantic token or a class
  that resolves to one.
- Reach for `var(--color-*)` over LESS variables for anything that needs
  to be theme-aware at runtime (LESS variables are evaluated at compile time).
- Component-level styling goes in SCSS partials, not inline `style={{…}}`,
  except for dynamic values (chart series colors etc.).
- Keep new module folders under `src/views/M??/…` consistent with the
  existing pattern (one folder per screen, route registered in
  `src/route/M??.js`).

---

## 10. Version History

| Version | Date       | Highlights                                                              |
| ------- | ---------- | ----------------------------------------------------------------------- |
| 1.4.93  | 2025-11-04 | Last pre-darkmode version (string still rendered in sidebar footer).    |
| 1.5.0   | 2026-05-28 | Dark Mode + semantic-token design system + dockerized build environment.|
| 1.5.1   | 2026-05-28 | Dark Mode polish — fix white table-summary cells / fixed columns, tone down dark brand from neon to subdued purple, theme image preview + spin overlays. |
| 1.5.2   | 2026-05-28 | Dark Mode total audit — global defensive overrides catch inline `color: 'black'` / `rgba(0,0,0,*)` / `gray` / hardcoded white backgrounds across all 500+ legacy spots; stronger antd Card body / Typography / link semantics in dark mode. |
| 1.5.3   | 2026-05-28 | Force-dark `html/body/#root` bg with !important (a stale cache or antd's compiled body rule was still showing white). Full DatePicker/TimePicker re-skin — input text, suffix/separator/clear icons, popup container, header strip, weekday row, date/month/year/decade cells, today/selected/disabled/range, time-panel columns + cells, footer "Now" link, range active bar/arrow. Sidebar version footer corrected. |
| 1.5.4   | 2026-05-28 | 3-level click-to-expand accordion sidebar. New `src/data/menu_tree_semantic.json` (G01..G08 → G0xxx → M0xxxxxxx) drives rendering; legacy `_navbar.js` only supplies leaf routes. `AccordionMenu` + `menuTree` adapter + dedicated SCSS. Single-open per level, ARIA tree semantics, smooth expand/collapse, theme-aware via existing tokens. Existing routing / permissions / HeadTitle untouched. |
