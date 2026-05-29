import React, { useEffect, useState, useRef } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import Swal from "sweetalert2";

import DefaultMenu from "./DefaultMenu";
import HeadTitle from "./HeadTitle";
// import Hidden from "../../components/grid/Hidden";
import { isLogin, userLogout } from "../../redux/actions/authAction";
import { heartbeatAPI, versionAPI } from "../../service/api/auth";
import { BrowserView, MobileView } from "react-device-detect";
import _navbar from "../../_navbar";
import _route from "../../route/";
import { _isEmpty } from "../../tools/util";
import Skeleton from "../../components/loading/Loading"

let _navPmsMenu = [];
let _routePms = [];

// --- Session heartbeat config ---
const HEARTBEAT_INTERVAL_MS = 30000; // poll every 30s
const SESSION_WARN_SECONDS = 300;    // warn when < 5 min left

const DefaultLayout = (props) => {
  const lng = localStorage.getItem("i18nextLng");
  const [loading, setLoading] = useState(false);

  // Always read the freshest token inside the interval (avoids a stale closure
  // after a token refresh). warnedRef makes the "about to expire" popup show
  // once per threshold-crossing instead of on every 30s tick.
  const tokenRef = useRef(props.auth.token);
  const warnedRef = useRef(false);
  useEffect(() => {
    tokenRef.current = props.auth.token;
  });

  useEffect(() => {
    _navPmsMenu = filterMenu();
    _routePms = filterRout();
  }, []);

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll /heartbeat on logged-in pages. The Fetch wrapper already bounces the
  // user to login on 401/F203/F204; here we additionally warn before expiry.
  useEffect(() => {
    const tick = async () => {
      const token = tokenRef.current;
      if (_isEmpty(token) || _isEmpty(token.atoken)) return;

      const res = await heartbeatAPI(token);
      const code = res && res.status ? res.status.code : undefined;
      // Session already gone — the wrapper handles the redirect; stop here.
      if (code === "F203" || code === "F204") return;

      // remainingSeconds may sit at the top level or under `data`.
      let remaining = res && res.remainingSeconds;
      if (remaining === undefined && res && res.data) remaining = res.data.remainingSeconds;
      if (typeof remaining !== "number") return;

      if (remaining < SESSION_WARN_SECONDS) {
        if (!warnedRef.current) {
          warnedRef.current = true;
          showSessionWarning();
        }
      } else {
        warnedRef.current = false; // timer was renewed — re-arm the warning
      }
    };

    const id = setInterval(tick, HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSessionWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "เซสชันกำลังจะหมดอายุ",
      text: "เซสชันของคุณกำลังจะหมดอายุ ต้องการใช้งานต่อหรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ใช้งานต่อ",
      cancelButtonText: "ออกจากระบบ",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await versionAPI(tokenRef.current); // touch the server to bump the timer
        warnedRef.current = false;
      } else {
        props.userLogout(() => props.history.push("/login"));
      }
    });
  };

  const checkLogin = () => {
    setLoading(true);
    try {
      props.isLogin(async (res) => {
        if (res !== "success") {
          await props.userLogout((res) => {
            props.history.push("/login");
            setLoading(false);
          });
        }
        setLoading(false);
      });
    } catch (error) {
      props.userLogout((res) => {
        if (res === "success") {
          props.history.push("/login");
          setLoading(false);
        }
      });
      props.history.push("/login");
      setLoading(false);
    }
  };
  const renderHeader = (navPmsMenu = [], route) => {
    const findRoute = navPmsMenu.find((menu) => {
      if (menu.subitems)
        return menu.subitems.find((sub) => sub.menuId === route.id);
      else return menu.id === route.id;
    });
    return findRoute.subitems
      ? findRoute.subitems.find((sub) => sub.menuId === route.id)
      : findRoute;
  };

  return (
    <Skeleton loading={loading} active>
      <BrowserView>
        {/* v1.5.7 — TopHeader removed; the page Mode (theme) selector
            lives in the sidebar directly above the Logout button. */}
        <Row justify="center">
          <Col span={4}>
            <DefaultMenu navPms={_navPmsMenu} lng={lng} />
          </Col>
          <Col className="flex-grow-1" span={20}>
            <Row justify="center">
              <Switch>
                {_routePms.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => {
                        return (
                          <Col span={23}>
                            <div className="title-height d-flex justify-content-end flex-column">
                              <HeadTitle
                                {...route}
                                headTitle={renderHeader(_navPmsMenu, route)}
                                lng={lng}
                              />
                            </div>
                            <div className="min-vh-50 bg_content radius10 shadow-sm p-20 mb-15">
                              <route.component {...props} />
                            </div>
                          </Col>
                        );
                      }}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" exact={true} />
              </Switch>
            </Row>
          </Col>
        </Row>
        {/* </Hidden> */}
      </BrowserView>
      {/* <div className="d-none_max991"> */}
      <MobileView>
        <div className="vw-100 vh-100 d-flex justify-content-center flex-column align-items-center">
          <div> ขนาดหน้าจอไม่รองรับ </div>
          <div> แนะนำขนาด 1024px X 788px ขึ้นไป</div>
        </div>
      </MobileView>
      {/* </div> */}
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  isLogin,
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);

const filterMenu = () => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const pms = _isEmpty(user_data)
    ? []
    : _isEmpty(user_data.pms)
    ? []
    : user_data.pms;
  const filterMenuPMS = (menu) => {
    if (menu.id === "M00") return true;
    // if (menu.id === "M10") return true
    if (_isEmpty(menu.subitems))
      return pms.some((pMenu) => pMenu.menuId === menu.menuId);
    return menu.subitems.some((itemMenu) =>
      pms.some((pMenu) => pMenu.menuId === itemMenu.menuId)
    );
  };
  const filterSubMenuPMS = (menu) => {
    if (menu.id === "M00") return menu;
    // if (menu.id === "M10") return menu
    if (_isEmpty(menu.subitems))
      return pms.some((pMenu) => pMenu.menuId === menu.menuId) && menu;
    else
      menu.subitems = menu.subitems.filter((sub) =>
        pms.some((pMenu) => pMenu.menuId === sub.menuId)
      );
    return menu;
  };
  const mapNameMenu = (menu) => {
    if (!_isEmpty(menu.subitems)) {
      menu.subitems.map((item) => {
        if (_isEmpty(item.name)) item.name = {};
        item["name"]["th"] = !_isEmpty(
          pms.find((pmsItem) => pmsItem.menuId === item.menuId)
        )
          ? pms.find((pmsItem) => pmsItem.menuId === item.menuId)["menuNameTh"]
          : "";
        item["name"]["en"] = !_isEmpty(
          pms.find((pmsItem) => pmsItem.menuId === item.menuId)
        )
          ? pms.find((pmsItem) => pmsItem.menuId === item.menuId)["menuNameEn"]
          : "";
        return item;
      });
    }
    return menu;
  };
  const _navPms = _navbar
    .filter(filterMenuPMS) //filter main menu pms
    .map(filterSubMenuPMS) //filter main sub menu pms
    .map(mapNameMenu); //chang name menu
  return _navPms;
};

const filterRout = () => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const pms = _isEmpty(user_data)
    ? []
    : _isEmpty(user_data.pms)
    ? []
    : user_data.pms;
  const _navPms = _route.filter(
    (item) =>
      pms.some((pMenu) => pMenu.menuId === item.id) ||
      item.id === "M00" ||
      item.id === "M10"
  );
  return _navPms;
};
