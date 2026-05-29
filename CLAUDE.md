# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintenance Rule (READ FIRST)

Every time any file in this repo is changed, you MUST:

1. Update **`scw-frontend-version.md`** (the project context & version log,
   formerly `PROJECT_CONTEXT.md`) — describe the change and append a row to
   its Version History table.
2. Update **this `CLAUDE.md`** to keep the Claude memory in sync.
3. **Bump the program version** in `src/contrainers/DefaultLayout/DefaultMenu.js`
   (sidebar footer) and in the `scw-frontend-version.md` banner.
4. **Put to git** — `make build` to verify, then commit **and push** to
   `origin/main`.

## Commands

```bash
# Development server
yarn start          # or: npm start

# Production build (allocates 6 GB heap — required)
yarn build          # or: npm run build

# Tests
yarn test           # interactive watch mode
yarn test --watchAll=false   # single run

# Docker deployment (after build)
make run            # start containers
make stop           # stop containers
```

All scripts go through **craco**, not react-scripts directly. Do not invoke `react-scripts` commands directly.

## Architecture Overview

**Stack:** React 16 · CRA + craco · Ant Design 4.x · SCSS/Less · Redux (thunk) · react-router-dom v5 · i18next · HashRouter

### Layout model

The app renders a fixed two-column layout inside `<BrowserView>`. Mobile screens (`<MobileView>`) are blocked with a "screen too small" message — there is no mobile-responsive layout.

```
App.js (HashRouter)
└── DefaultLayout          src/contrainers/DefaultLayout/DefaultLayout.js
    ├── DefaultMenu         sidebar (Col span=4)
    └── route <Switch>      main content (Col span=20)
```

> **Note:** The folder is intentionally named `contrainers` (not `containers`) — keep the typo to avoid breaking imports.

### Theme system

`useTheme()` (`src/hooks/useTheme.js`) sets `data-theme` on `<html>` and
persists the choice to `localStorage`. All colours are CSS custom properties
defined in `_variables.scss` (`:root` = light, `[data-theme="dark"]` = dark).
Ant Design dark overrides live in `_dark_theme.scss`. No runtime Less swap —
dark mode works through CSS rules only.

### Menu / permission pipeline

`_navbar.js` defines the raw menu tree (top-level items + one level of `subitems`). `DefaultLayout.js` filters it at runtime using `filterMenu()` / `filterRout()`:

1. **`filterMenu()`** reads `localStorage.user_data.pms` (the user's permission list), filters `_navbar` items to those the user has access to, strips inaccessible sub-items, then fills in `name.th` / `name.en` from the permission list (menu names are stored server-side, not in `_navbar.js`).
2. **`filterRout()`** applies the same permission list to the flat route array.
3. The filtered `navPms` array is passed to `<DefaultMenu>` as a prop.

`DefaultMenu.js` renders menus recursively via `MenuItemRecursive` (supports ≤3 levels). State is held in `useMenuState` (`openIds: Set`) — multiple branches can be open simultaneously. The sidebar itself slides in/out on mobile via the `.sidebar-body--mobile-open` CSS class. See `scw-frontend-version.md` (formerly `PROJECT_CONTEXT.md`) for the full interaction contract and the version history.

### Routing

Routes are split by module in `src/route/` (M01.js–M10.js + Main.js) and merged in `src/route/index.js`. Each route entry has an `id` field matching a `menuId` from `_navbar.js` — `DefaultLayout.renderHeader()` uses this to look up the page title.

### State management

Redux holds only `auth` state (token + user data). All report/form state is local to each view component. The store is configured in `src/redux/store/index.js` with redux-thunk and Redux DevTools support.

### Styling system

| File | Purpose |
|---|---|
| `src/assets/scss/_variables.scss` | SCSS tokens (`$primary_color: #91098f`, `$muted_color`, etc.) |
| `src/assets/less/variables.less` | Ant Design Less token overrides (same primary color) |
| `src/assets/less/theme.less` | Ant Design dist import |
| `src/assets/scss/_default_layout.scss` | Sidebar/menu styles |
| `src/assets/scss/style.scss` | Root SCSS entry — imports all partials + Kanit font faces |
| `src/assets/scss/App.scss` | App entry — imports `style.scss` |

craco + craco-less compiles both SCSS and Less in one pass. The primary purple `#91098f` must stay in sync across `_variables.scss` and `variables.less`.

### Runtime configuration

API URLs are **not** baked in at build time. The production build reads:

```js
window.environment.REACT_APP_API       // base API URL
window.environment.REACT_APP_API_V1    // API v1 prefix
```

These are injected via `public/assets/config/api.js`, which is loaded before the React bundle in `public/index.html`. Do not use `process.env.REACT_APP_*` for API URLs.

### Authentication

- JWT access + refresh tokens stored in `localStorage` (`user_token`, `user_data`).
- `isLogin()` action verifies the token on every route mount; expired tokens trigger `userLogout()` → redirect to `/login`.
- `user_data.pms` is the permission array that drives menu and route filtering.
- **Global session interceptor (v1.5.16):** the central `Fetch` wrapper
  (`src/tools/fecth.js`) is the single fetch choke-point — any response with
  HTTP **401** or status code **F203 / F204** clears the token and redirects
  to `/#/login` (loop-guarded; opt out with `checkCode = { F203: false }`).
- **Session heartbeat (v1.5.16):** `DefaultLayout` polls `GET /heartbeat`
  every 30 s; when `remainingSeconds < 300` it shows a Swal with a "Stay
  logged in" action that pings `GET /version` to bump the server timer
  (`heartbeatAPI` / `versionAPI` in `src/service/api/auth.js`).

### Fullscreen media previews (v1.5.12–1.5.17)

`src/components/imagePreview/` has two near-identical modals that replace the
old `window.open(url, '_blank', ...)` previews so they stay in-app, both
sized to **90% of a near-fullscreen popup**:

- `FullscreenImageModal` — single image preview.
- `FullscreenVideoModal` — NVR clip. The stream API (`/video_feed`) returns
  **MJPEG** (`multipart/x-mixed-replace`), which `<video>` cannot play, so it
  is rendered in an **`<img>`**. Do not switch this to `<video>`.

Both are wired into all 11 report views (M030000001/004/011, M050000003,
M060000006/011/013/016E, M080000004 + Page2, M080000018) with the same
4-edit pattern: import → `useState(null)` → handler calls the setter →
render `<…Modal src={…} onClose={…} />`.

### Internationalisation

i18next with browser language detector. Translation files live in `public/locales/{en,th}/`. The active locale key is `localStorage.getItem("i18nextLng")` — passed as `lng` prop to menu and header components.

### Key utilities (`src/tools/util.js`)

- `_isEmpty(data)` — null/undefined/empty-object guard used everywhere.
- `_isNull` / `_isZero` — format numbers with `Intl.NumberFormat` or return `""`.
- `_setYearThai` — converts Gregorian year to Buddhist Era (+543) for display.
- Excel export helpers are re-exported from `src/tools/excel/`.
