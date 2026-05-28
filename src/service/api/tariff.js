import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'

export const GET_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/search`, data, null, token.atoken);
  return res;
}

export const NEW_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/new`, data, null, token.atoken);
  return res;
}

export const RELEASE_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/release`, data, null, token.atoken);
  return res;
}

export const ADD_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/add`, data, null, token.atoken);
  return res;
}

export const EDIT_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/edit`, data, null, token.atoken);
  return res;
}

export const DELETE_DATA_INFO_MANAGE_TARIFF = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/tariff/delete`, data, null, token.atoken);
  return res;
}
