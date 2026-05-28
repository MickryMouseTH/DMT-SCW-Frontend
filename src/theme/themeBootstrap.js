// ---------------------------------------------------------------------------
// Theme bootstrap — runs before React mounts to avoid FOUC.
//
// The same logic is inlined inside public/index.html as a synchronous <script>
// in <head>. This module exists so the logic is reviewable in source form and
// the storage key can be re-exported as a constant. If you change anything
// here, also update the inlined version in public/index.html.
// ---------------------------------------------------------------------------

import { THEME_STORAGE_KEY } from "./themeConstants";

export const BOOTSTRAP_SOURCE = `
(function () {
  try {
    var KEY = '${THEME_STORAGE_KEY}';
    var stored = null;
    try { stored = window.localStorage.getItem(KEY); } catch (e) {}
    var mode = (stored === 'light' || stored === 'dark' || stored === 'system')
      ? stored
      : 'system';
    var resolved = mode;
    if (mode === 'system') {
      resolved = (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;
