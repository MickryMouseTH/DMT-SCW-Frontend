import React from "react";
import {
  THEME_MODES,
  RESOLVED_THEMES,
  DEFAULT_MODE,
} from "./themeConstants";

// Default value matches what ThemeProvider gives — components that fall back
// to the default (e.g. testing in isolation) still receive a working API.
export const ThemeContext = React.createContext({
  mode: DEFAULT_MODE,
  resolvedTheme: RESOLVED_THEMES.LIGHT,
  setMode: () => {},
  toggle: () => {},
  MODES: THEME_MODES,
});
