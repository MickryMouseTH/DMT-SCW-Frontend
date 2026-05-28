// ---------------------------------------------------------------------------
// TopHeader (v1.5.5 → v1.5.6)
//
// Full-viewport-width top header that hosts the page Mode (theme) selector
// pinned to the top-right corner. The main navigation lives in the left
// sidebar (`DefaultMenu` → `AccordionMenu`, vertical layout) — see §4.5 of
// PROJECT_CONTEXT.md.
// ---------------------------------------------------------------------------

import React from "react";
import ThemeToggle from "../../theme/ThemeToggle";
import "./top-header.scss";

const TopHeader = () => (
  <header className="top-header" role="banner">
    <div className="top-header__spacer" aria-hidden />
    <div className="top-header__actions">
      <ThemeToggle compact />
    </div>
  </header>
);

export default TopHeader;
