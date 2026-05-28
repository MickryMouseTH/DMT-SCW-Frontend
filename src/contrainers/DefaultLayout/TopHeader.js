// ---------------------------------------------------------------------------
// TopHeader (v1.5.5)
//
// Full-viewport-width top header that holds:
//   - The Level 1 menu (horizontal accordion). L2/L3 expand in a dropdown
//     panel directly below the active L1.
//   - The page Mode selector (ThemeToggle) anchored to the top-right.
//
// Lives above the existing sidebar + content row, so it always spans
// 100% of the viewport.
// ---------------------------------------------------------------------------

import React from "react";
import AccordionMenu from "./AccordionMenu";
import ThemeToggle from "../../theme/ThemeToggle";
import "./top-header.scss";

const TopHeader = ({ lng, pms }) => (
  <header className="top-header" role="banner">
    <div className="top-header__menu-wrap">
      <AccordionMenu lng={lng} pms={pms} layout="horizontal" />
    </div>
    <div className="top-header__actions">
      <ThemeToggle compact />
    </div>
  </header>
);

export default TopHeader;
