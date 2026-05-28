// ---------------------------------------------------------------------------
// DefaultMenu (sidebar shell)
//
// v1.5.7 — The page Mode (theme) selector moved back into the sidebar,
// directly above the Logout button. The 3-level AccordionMenu (vertical)
// flex-grows to fill all the leftover vertical space, so it reaches down
// to just above the toggle.
//
// Sidebar stack (top → bottom):
//   logo → staff id → staff name → AccordionMenu (flex-grow) →
//   ThemeToggle wrapper → Logout → version footer
// ---------------------------------------------------------------------------

import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { userLogout } from "../../redux/actions/authAction";
import Logout from "./Logout";
import AccordionMenu from "./AccordionMenu";
import ThemeToggle from "../../theme/ThemeToggle";

const DefaultMenu = ({ lng }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user_data"));
      if (stored) setUserData(stored);
    } catch (_e) {
      // ignore corrupt user_data — falls back to empty menu
    }
  }, []);

  const pms = useMemo(() => (userData && userData.pms) || [], [userData]);

  return (
    <div className="sidebar-body">
      <div className="sidebar-logo shadow-sm logo-height d-flex justify-content-center align-items-center">
        <img src="/assets/img/brand/logo.jpg" alt="logo" className="h-100" />
      </div>
      <div className="user-data shadow-sm d-flex align-items-end text-left">
        {`รหัสพนักงาน : `}
        {`${userData.staffId ? userData.staffId : ""}`}
      </div>
      <div className="user-data shadow-sm d-flex align-items-end text-left">
        {`${userData.staffNameTh ? userData.staffNameTh : ""}`}
      </div>

      <div className="sidebar-menu-scroll">
        <AccordionMenu lng={lng} pms={pms} />
      </div>

      <div className="sidebar-theme-toggle-wrap d-flex justify-content-center">
        <ThemeToggle compact />
      </div>
      <Logout />
      <div className="version-footer shadow-sm d-flex align-items-end text-center">
        Version 1.5.11 (2026-05-28)
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultMenu);
