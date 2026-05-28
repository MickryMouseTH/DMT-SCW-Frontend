import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'
import { mockdata } from '../../views/M09/M090000003/mockdata'


// import DATA_INFO_ManageUserGroup from '../../views/ManageUsers/add/usergroupdataInfo.json'

export const GET_DATA_INFO_ManageMenu = async (data, token) => {
    const res = await Fetch("POST", `${apiV1}/management/menu/search`, data, null, token.atoken);

    // const res = DATA_INFO_ManageMenu
    return res;
  }

export const ADD_DATA_INFO_ManageMenu = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/menu/add`, data, null, token.atoken);

  // const res = DATA_INFO_ManageMenu
  return res;
}

export const EDIT_DATA_INFO_ManageMenu = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/menu/edit`, data, null, token.atoken);

  // const res = DATA_INFO_ManageMenu
  return res;
}

export const DELETE_DATA_INFO_ManageMenu = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/menu/delete`, data, null, token.atoken);

  // const res = DATA_INFO_ManageMenu
  return res;
}

export const GET_DATA_INFO_CELENDAR_VIEW = async (data, token) => {
  // const res = await Fetch("POST", `${apiV1}/management/menu/delete`, data, null, token.atoken);

  const res = mockdata
  return res;
}

////////////////////////////////////USER GROUP///////////////////////////
