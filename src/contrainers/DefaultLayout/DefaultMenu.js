import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { connect } from 'react-redux'
import { userLogout } from '../../redux/actions/authAction'
import { _isEmpty } from '../../tools/util'
import Logout from './Logout'
import ThemeToggle from '../../theme/ThemeToggle'

const DefaultMenu = ({ lng, ...props }) => {
  // const { t, i18n } = useTranslation('menus')
  // const handleClick = (lang) => { i18n.changeLanguage(lang) }
  let location = useLocation();
  const [userData, setUserData] = useState({})

  const checkMenuActive = (link) => (link === location.pathname) ? "sidebar-active shadow-sm" : "sidebar-li"
  const checkItemMenuActive = (itemlink) => (itemlink === location.pathname) ? "sidebar-li-item-active" : "sidebar-li-item"
  const checkParentMenuActive = (menuid) => (menuid.some(item => item.link === location.pathname)) ? "sidebar-active shadow-sm" : "sidebar-li"
  const handleReload = (link) => {
    if (link === location.pathname) {
      window.location.reload()
    }
  }

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    setUserData(user_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sidebar-body ">
      <div className="sidebar-logo shadow-sm logo-height d-flex justify-content-center align-items-center">
        <img src="/assets/img/brand/logo.jpg" alt="logo" className="h-100" />
      </div>
      <div className="user-data shadow-sm d-flex align-items-end text-left">{`รหัสพนักงาน : `}{`${userData.staffId ? userData.staffId : ""}`}</div>
      <div className="user-data shadow-sm d-flex align-items-end text-left">{`${userData.staffNameTh ? userData.staffNameTh : ""}`}</div>
      <ul className="sidebar-ul">
        {props.navPms.map((menu, index) =>
          _isEmpty(menu.subitems) ? (
            <Link to={menu.link} key={menu.id} >
              <li key={index} className={`${checkMenuActive(menu.link)} ${index < (props.navPms.length - 1) ? "shadow-sm" : null} `}>
                <div className="pl-10">{menu.name[lng]}</div></li>
              {/* <div className="pl-10">{t(`sideMenu.${menu.id}.name`)}</div></li> */}
            </Link>
          ) : (
            <li className={`${checkParentMenuActive(menu.subitems)} sidebar-dropdown`} key={menu.id}>
              <div className="pl-10">{menu.name[lng]}</div>
              {/* <div className="pl-10">{t(`sideMenu.${menu.id}.name`)}</div> */}
              <ul className="sidebar-dropdown-content radius10tr radius10bl radius10br shadow-sm p-0 sidebar-ml-350">
                {menu.subitems.map((item, index) => (
                  <Link to={item.link} className="text-white" key={item.menuId} onClick={() => handleReload(item.link)}>
                    <li className={
                      `${checkItemMenuActive(item.link)}  
                    ${index === 0 ? "radius10tr" : null} 
                    ${menu.subitems.length === 1 ? "radius10bl radius10br" : null} 
                    ${index === (menu.subitems.length - 1) ? "radius10bl radius10br" : null}
                    `}
                    >
                      <div className="pl-10">{item.name[lng]}</div>
                      {/* <div className="pl-10">{t(`sideMenu.${menu.id}.subMenu.${item.menuId}`)}</div> */}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
          )

        )}
      </ul>
      {/* <button onClick={() => handleClick('th')}>TH</button>
      <button onClick={() => handleClick('en')}>EN</button> */}
      <div className="sidebar-theme-toggle-wrap d-flex justify-content-center">
        <ThemeToggle compact />
      </div>
      <Logout />
      <div className="version-footer shadow-sm d-flex align-items-end text-center">Version 1.5.2 (2026-05-28)</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultMenu)
// export default DefaultMenu
