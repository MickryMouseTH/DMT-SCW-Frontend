// ---------------------------------------------------------------------------
// Menu tree adapter (v1.5.4)
//
// The 3-level semantic menu (G01..G08 → G0xxx → M0xxxxxxxxx) lives in
// `src/data/menu_tree_semantic.json`. That file only carries display
// labels for the GROUPS; leaf routes (`link`) live in the legacy
// `src/_navbar.js`, and leaf labels are supplied at login time by the
// backend in `localStorage.user_data.pms[].menuNameTh/En`.
//
// This module produces a single tree the AccordionMenu can render:
//
//   {
//     id, name, level: 1, expandable: true,
//     children: [
//       { id, name, level: 2, expandable: true,
//         children: [
//           { id, name, level: 3, expandable: false, link, ... },
//         ]
//       },
//     ]
//   }
//
// Permissions: a leaf is included only if its id is present in the user's
// `pms` array (same gate the legacy DefaultLayout already used). Empty
// L2/L1 groups are dropped so the user never sees a dead-end branch.
// ---------------------------------------------------------------------------

import semanticTree from "../../data/menu_tree_semantic.json";
import navbar from "../../_navbar";
import { _isEmpty } from "../../tools/util";

// Flatten the legacy _navbar.js to a lookup keyed by menuId → leaf metadata.
// Top-level items without subitems (e.g. the Dashboard "M00") are indexed
// by their own `id` too so the Dashboard still resolves.
const buildLeafIndex = () => {
  const index = {};
  navbar.forEach((group) => {
    if (Array.isArray(group.subitems) && group.subitems.length) {
      group.subitems.forEach((sub) => {
        if (sub.menuId) {
          index[sub.menuId] = {
            link: sub.link,
            menuId: sub.menuId,
            groupId: group.id,
          };
        }
      });
    } else if (group.id) {
      index[group.id] = {
        link: group.link,
        menuId: group.id,
        groupId: group.id,
      };
    }
  });
  return index;
};

const LEAF_INDEX = buildLeafIndex();

// Pull a leaf's display label from the user's permission record. Falls
// back to the label embedded in the semantic JSON (Thai-only) if the
// backend hasn't supplied one — that's fine for development.
const resolveLeafLabel = (leafId, semanticLabel, lng, pms) => {
  if (Array.isArray(pms)) {
    const entry = pms.find((p) => p.menuId === leafId);
    if (entry) {
      const key = lng === "en" ? "menuNameEn" : "menuNameTh";
      if (entry[key]) return entry[key];
    }
  }
  return semanticLabel;
};

// Synthetic Dashboard entry shown as the first L1 item. It has no
// children — the AccordionMenu renders it as a direct <Link> instead of
// an expandable group.
const DASHBOARD_ENTRY = {
  id: "M00",
  name: { th: "Dashboard", en: "Dashboard" },
  level: 1,
  expandable: false,
  link: "/dashboard",
  isLeaf: true,
};

// Build the renderable accordion tree for the current user/language.
// `lng` is one of "th" | "en"; `pms` is the user's permission array
// (already loaded from localStorage by the caller).
export const buildAccordionTree = (lng = "th", pms = []) => {
  const allowedIds = new Set((pms || []).map((p) => p.menuId));

  const groups = (semanticTree.menu || [])
    .map((g1) => {
      const children = (g1.children || [])
        .map((g2) => {
          const leaves = (g2.children || [])
            .filter((leaf) => allowedIds.size === 0 || allowedIds.has(leaf.id))
            .map((leaf) => {
              const ref = LEAF_INDEX[leaf.id];
              return {
                id: leaf.id,
                name: resolveLeafLabel(leaf.id, leaf.name, lng, pms),
                level: 3,
                expandable: false,
                link: ref ? ref.link : null,
                missingRoute: !ref,
              };
            })
            // Drop leaves with no resolvable route — the navbar.js doesn't
            // know them, so navigating would 404.
            .filter((leaf) => !!leaf.link);

          return {
            id: g2.id,
            name: g2.name,
            level: 2,
            expandable: true,
            children: leaves,
          };
        })
        .filter((g2) => g2.children.length > 0);

      return {
        id: g1.id,
        name: g1.name,
        level: 1,
        expandable: true,
        children,
      };
    })
    .filter((g1) => g1.children.length > 0);

  // Resolve the Dashboard label from the user's permission record if it
  // carries M00, falling back to the th/en label embedded above.
  const dashboard = {
    ...DASHBOARD_ENTRY,
    name: resolveLeafLabel(
      DASHBOARD_ENTRY.id,
      DASHBOARD_ENTRY.name[lng] || DASHBOARD_ENTRY.name.th,
      lng,
      pms
    ),
  };

  return [dashboard, ...groups];
};

// Locate the [L1, L2, L3] path for a given pathname, so the menu can
// auto-expand to reveal the active leaf on mount / on route change.
export const findActivePath = (tree, pathname) => {
  if (!pathname) return [null, null, null];
  for (const g1 of tree) {
    // Top-level leaves (like Dashboard) — no children, just a direct link.
    if (g1.expandable === false && g1.link === pathname) {
      return [g1.id, null, g1.id];
    }
    for (const g2 of g1.children || []) {
      for (const leaf of g2.children || []) {
        if (leaf.link === pathname) return [g1.id, g2.id, leaf.id];
      }
    }
  }
  return [null, null, null];
};

// Re-export for callers that want raw access (e.g. for tests / debugging).
export const _LEAF_INDEX = LEAF_INDEX;
export const _semanticTree = semanticTree;

// Tiny guard so the rest of the app's util check still works
export const isLeaf = (node) => !!node && !_isEmpty(node) && node.expandable === false;
