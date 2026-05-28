import React from 'react'
// import i18next from 'i18next';
// import { useTranslation } from "react-i18next";
// import { _isEmpty } from '../../tools/util'
const HeadTitle = ({ lng, headTitle, ...props }) => {
  // const { t } = useTranslation('menus')
  // const t_en = i18next.getFixedT('en', 'menus');

  // const renderName = () => !_isEmpty(props.parentName) && props.parentName.length > 1
  //   ? props.parentName[props.parentName.length - 1]
  //   : props.name
  // const renderParentName = () => !_isEmpty(props.parentName) && props.parentName.length > 1
  //   ? props.parentName[props.parentName.length - 2]
  //   : props.parentName

  return (
    <div className="d-flex justify-content-end flex-column h-100">
      <h2 className="mb-20">{headTitle.name[lng]}</h2>
      {/* <p>{headTitle.name['en']}</p> */}
      {/* <h2 className="m-0">{
        t(`sideMenu.${renderParentName()}.subMenu.${renderName()}`)}</h2>
      <p>{t_en(`sideMenu.${renderParentName()}.subMenu.${renderName()}`)}</p> */}
    </div>
  )
}

export default HeadTitle
