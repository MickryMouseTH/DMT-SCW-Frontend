// Shared theme constants. Keep in sync with public/index.html bootstrap.

export const THEME_STORAGE_KEY = "dmt-scw-theme";

export const THEME_MODES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
});

export const RESOLVED_THEMES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

export const DEFAULT_MODE = THEME_MODES.SYSTEM;

export function isValidMode(value) {
  return (
    value === THEME_MODES.LIGHT ||
    value === THEME_MODES.DARK ||
    value === THEME_MODES.SYSTEM
  );
}

export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return RESOLVED_THEMES.LIGHT;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? RESOLVED_THEMES.DARK
    : RESOLVED_THEMES.LIGHT;
}

export function resolveTheme(mode) {
  if (mode === THEME_MODES.SYSTEM) return getSystemTheme();
  if (mode === THEME_MODES.DARK) return RESOLVED_THEMES.DARK;
  return RESOLVED_THEMES.LIGHT;
}

export function readStoredMode() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidMode(stored) ? stored : DEFAULT_MODE;
  } catch (_e) {
    return DEFAULT_MODE;
  }
}

export function writeStoredMode(mode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (_e) {
    // ignore quota / privacy mode failures — non-fatal
  }
}

export function applyThemeAttribute(resolved) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
}
