import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import {
  THEME_MODES,
  RESOLVED_THEMES,
  applyThemeAttribute,
  getSystemTheme,
  isValidMode,
  readStoredMode,
  resolveTheme,
  writeStoredMode,
} from "./themeConstants";

const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

const ThemeProvider = ({ children }) => {
  const [mode, setModeState] = useState(() => readStoredMode());
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    resolveTheme(readStoredMode())
  );

  // Keep <html data-theme> + localStorage in sync with mode changes.
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setResolvedTheme(resolved);
    applyThemeAttribute(resolved);
    writeStoredMode(mode);
  }, [mode]);

  // While in `system` mode, react to OS-level theme changes live.
  useEffect(() => {
    if (mode !== THEME_MODES.SYSTEM) return undefined;
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mq = window.matchMedia(SYSTEM_QUERY);
    const onChange = () => {
      const next = getSystemTheme();
      setResolvedTheme(next);
      applyThemeAttribute(next);
    };

    // Safari < 14 still uses addListener / removeListener
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [mode]);

  const setMode = useCallback((next) => {
    if (!isValidMode(next)) return;
    setModeState(next);
  }, []);

  // Convenience: rotate light → dark → system → light
  const toggle = useCallback(() => {
    setModeState((current) => {
      if (current === THEME_MODES.LIGHT) return THEME_MODES.DARK;
      if (current === THEME_MODES.DARK) return THEME_MODES.SYSTEM;
      return THEME_MODES.LIGHT;
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      isDark: resolvedTheme === RESOLVED_THEMES.DARK,
      setMode,
      toggle,
      MODES: THEME_MODES,
    }),
    [mode, resolvedTheme, setMode, toggle]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
