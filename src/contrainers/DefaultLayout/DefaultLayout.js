import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import DefaultMenu from "./DefaultMenu";
import HeadTitle from "./HeadTitle";
import TopHeader from "./TopHeader";
// import Hidden from "../../components/grid/Hidden";
import { isLogin, userLogout } from "../../redux/actions/authAction";
import { BrowserView, MobileView } from "react-device-detect";
import _navbar from "../../_navbar";
import _route from "../../route/";
import { _isEmpty } from "../../tools/util";
import Skeleton from "../../components/loading/Loading"

let _navPmsMenu = [];
let _routePms = [];

const DefaultLayout = (props) => {
  const lng = localStorage.getItem("i18nextLng");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _navPmsMenu = filterMenu();
    _routePms = filterRout();
  }, []);

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Pull current user's permission whitelist for the horizontal L1 menu.
  // Falls back to an empty array (no permissions); buildAccordionTree
  // then renders everything, useful in dev where pms isn't seeded.
  let _pms = [];
  try {
    const u = JSON.parse(localStorage.getItem("user_data"));
    if (u && Array.isArray(u.pms)) _pms = u.pms;
  } catch (_e) {
    /* ignore */
  }

  return (
    <Skeleton loading={loading} active>
      <BrowserView>
        {/* v1.5.5 — full-viewport top header with horizontal L1 menu +
            top-right Mode (theme) selector. Sits above the sidebar +
            content row so it always spans 100% of the viewport. */}
        <TopHeader lng={lng} pms={_pms} />

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
