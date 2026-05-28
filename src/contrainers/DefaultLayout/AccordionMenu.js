// ---------------------------------------------------------------------------
// AccordionMenu (v1.5.4)
//
// Click-to-expand 3-level sidebar menu, fully data-driven from the tree
// produced by ./menuTree.js#buildAccordionTree.
//
// Behaviour:
//   - Tap a Level 1 group  → expands its Level 2 subgroups; previously
//     open L1 collapses (single-open per level).
//   - Tap a Level 2 group  → expands its Level 3 leaves; previously
//     open L2 (within this L1) collapses.
//   - Tap a Level 3 leaf   → navigates via react-router-dom.
//   - Tap an already-open group toggles it closed.
//   - Auto-expands to reveal the active leaf on mount / route change.
//
// Accessibility:
//   - Groups are buttons with role="treeitem", aria-expanded reflects state.
//   - Leaves are role="treeitem" with aria-selected on the active one.
//   - Enter / Space toggle groups; arrow keys are intentionally NOT
//     hijacked (the sidebar coexists with a route-level keyboard flow).
//
// Styling: SCSS class names live in `accordion-menu.scss`; all colours
// come from the semantic token layer so the component is theme-aware.
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

import { buildAccordionTree, findActivePath } from "./menuTree";
import "./accordion-menu.scss";

const AccordionMenu = ({ lng = "th", pms = [], onLeafSelect }) => {
  const location = useLocation();

  // Build the tree once per (lng, pms) change. `pms` is a stable
  // localStorage-derived array per session, so this rarely re-runs.
  const tree = useMemo(() => buildAccordionTree(lng, pms), [lng, pms]);

  // Active route → which [L1, L2, L3] is current.
  const activePath = useMemo(
    () => findActivePath(tree, location.pathname),
    [tree, location.pathname]
  );
  const [activeL1, activeL2, activeLeaf] = activePath;

  // Single-open accordion state.
  // - `openL1` is the id of the currently expanded L1 group (or null).
  // - `openL2` is keyed by L1 id → currently expanded L2 child (or null),
  //   so each L1 remembers its last open L2 when re-expanded.
  const [openL1, setOpenL1] = useState(activeL1);
  const [openL2, setOpenL2] = useState(activeL2 ? { [activeL1]: activeL2 } : {});

  // Sync open state when the route changes (e.g. user clicked a deep link
  // somewhere else, or programmatic navigation). Only widens openings —
  // it never auto-collapses a group the user has chosen to keep open.
  useEffect(() => {
    if (activeL1 && activeL1 !== openL1) setOpenL1(activeL1);
    if (activeL1 && activeL2 && openL2[activeL1] !== activeL2) {
      setOpenL2((prev) => ({ ...prev, [activeL1]: activeL2 }));
    }
    // openL1/openL2 intentionally excluded — we only react to route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeL1, activeL2]);

  const toggleL1 = useCallback((id) => {
    setOpenL1((current) => (current === id ? null : id));
  }, []);

  const toggleL2 = useCallback((l1Id, l2Id) => {
    setOpenL2((prev) => ({
      ...prev,
      [l1Id]: prev[l1Id] === l2Id ? null : l2Id,
    }));
  }, []);

  const handleKey = useCallback((event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  }, []);

  const handleLeafClick = useCallback(
    (leaf) => {
      if (typeof onLeafSelect === "function") onLeafSelect(leaf);
      if (leaf.link === location.pathname) {
        // Re-clicking the active leaf reloads the page (matches the legacy
        // DefaultMenu behaviour, which staff rely on to refresh report data).
        window.location.reload();
      }
    },
    [location.pathname, onLeafSelect]
  );

  if (!tree.length) {
    return (
      <div className="accordion-menu accordion-menu--empty">
        <span>ไม่มีเมนูที่ใช้งานได้</span>
      </div>
    );
  }

  return (
    <ul className="accordion-menu" role="tree" aria-label="Sidebar navigation">
      {tree.map((g1) => {
        const g1Expanded = openL1 === g1.id;
        const g1Active = activeL1 === g1.id;
        return (
          <li
            key={g1.id}
            className={`accordion-menu__item accordion-menu__item--l1 ${
              g1Active ? "is-active" : ""
            } ${g1Expanded ? "is-open" : ""}`}
            role="none"
          >
            <button
              type="button"
              className="accordion-menu__row accordion-menu__row--l1"
              role="treeitem"
              aria-expanded={g1Expanded}
              aria-controls={`acc-${g1.id}`}
              onClick={() => toggleL1(g1.id)}
              onKeyDown={(e) => handleKey(e, () => toggleL1(g1.id))}
            >
              <span className="accordion-menu__label">{g1.name}</span>
              <RightOutlined
                className={`accordion-menu__chevron ${
                  g1Expanded ? "is-open" : ""
                }`}
                aria-hidden
              />
            </button>

            <ul
              id={`acc-${g1.id}`}
              className={`accordion-menu__children accordion-menu__children--l2 ${
                g1Expanded ? "is-open" : ""
              }`}
              role="group"
            >
              {g1.children.map((g2) => {
                const g2Expanded = openL2[g1.id] === g2.id;
                const g2Active = activeL2 === g2.id;
                return (
                  <li
                    key={g2.id}
                    className={`accordion-menu__item accordion-menu__item--l2 ${
                      g2Active ? "is-active" : ""
                    } ${g2Expanded ? "is-open" : ""}`}
                    role="none"
                  >
                    <button
                      type="button"
                      className="accordion-menu__row accordion-menu__row--l2"
                      role="treeitem"
                      aria-expanded={g2Expanded}
                      aria-controls={`acc-${g2.id}`}
                      onClick={() => toggleL2(g1.id, g2.id)}
                      onKeyDown={(e) =>
                        handleKey(e, () => toggleL2(g1.id, g2.id))
                      }
                    >
                      <span className="accordion-menu__label">{g2.name}</span>
                      <RightOutlined
                        className={`accordion-menu__chevron ${
                          g2Expanded ? "is-open" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <ul
                      id={`acc-${g2.id}`}
                      className={`accordion-menu__children accordion-menu__children--l3 ${
                        g2Expanded ? "is-open" : ""
                      }`}
                      role="group"
                    >
                      {g2.children.map((leaf) => {
                        const isActive = activeLeaf === leaf.id;
                        return (
                          <li
                            key={leaf.id}
                            className={`accordion-menu__item accordion-menu__item--l3 ${
                              isActive ? "is-active" : ""
                            }`}
                            role="none"
                          >
                            <Link
                              to={leaf.link}
                              className="accordion-menu__row accordion-menu__row--l3"
                              role="treeitem"
                              aria-selected={isActive}
                              onClick={() => handleLeafClick(leaf)}
                              title={leaf.name}
                            >
                              <span className="accordion-menu__label">
                                {leaf.name}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default AccordionMenu;
