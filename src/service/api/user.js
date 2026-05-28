import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'

// import DATA_INFO_ManageUser from '../../views/ManageUsers/add/userdataInfo.json'
// import DATA_INFO_ManageUserGroup from '../../views/ManageUsers/add/usergroupdataInfo.json'

export const GET_DATA_INFO_ManageUser = async (data, token) => {
    const res = await Fetch("POST", `${apiV1}/management/staff/search`, data, null, token.atoken);

    // const res = DATA_INFO_ManageUser
    return res;
  }

export const ADD_DATA_INFO_ManageUser = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staff/add`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}

export const EDIT_DATA_INFO_ManageUser = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staff/edit`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}

export const DELETE_DATA_INFO_ManageUser = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staff/delete`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}

export const RESET_PASSWORD_ManageUser = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staff/resetPassword`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}

////////////////////////////////////USER GROUP///////////////////////////

export const GET_DATA_INFO_ManageUserGroup = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staffGroup/search`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}
export const GET_DATA_LIST_UserGroup = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/staffGroupList`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const ADD_DATA_INFO_ManageUserGroup = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staffGroup/add`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const DELETE_DATA_INFO_ManageUserGroup = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staffGroup/delete`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const EDIT_DATA_INFO_ManageUserGroup = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/staffGroup/edit`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const GET_DATA_PERMISSION_MENU = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/permission/menu/search`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const EDIT_DATA_PERMISSION_MENU = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/permission/menu/save`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUserGroup   
  return res;
}

export const GET_DATA_INFO_ManageResetPasswordStaff = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/resetPasswordStaff/search`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}

export const RESET_PASSWORD_ManageResetPasswordStaff = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/resetPasswordStaff/resetPassword`, data, null, token.atoken);

  // const res = DATA_INFO_ManageUser
  return res;
}