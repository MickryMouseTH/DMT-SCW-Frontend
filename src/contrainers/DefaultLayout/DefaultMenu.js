// ---------------------------------------------------------------------------
// DefaultMenu (sidebar shell)
//
// v1.5.5 — slimmed down: the L1/L2/L3 accordion and the page Mode (theme)
// selector have moved to <TopHeader> (full-viewport-width). The sidebar
// now hosts only the brand + staff info + logout + version footer.
// ---------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userLogout } from "../../redux/actions/authAction";
import Logout from "./Logout";

const DefaultMenu = (/* lng intentionally unused after v1.5.5 split */) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user_data"));
      if (stored) setUserData(stored);
    } catch (_e) {
      // ignore corrupt user_data — falls back to empty sidebar
    }
  }, []);

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

      {/* Spacer pushes the footer to the bottom of the sidebar */}
      <div className="sidebar-menu-scroll" aria-hidden />

      <Logout />
      <div className="version-footer shadow-sm d-flex align-items-end text-center">
        Version 1.5.5 (2026-05-28)
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
