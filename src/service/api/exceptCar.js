import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'

export const GET_DATA_INFO_MANAGE_EXCEPT_CAR = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/exceptCar/search`, data, null, token.atoken);
  return res;
}

export const ADD_DATA_INFO_MANAGE_EXCEPT_CAR = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/exceptCar/add`, data, null, token.atoken);
  return res;
}

export const EDIT_DATA_INFO_MANAGE_EXCEPT_CAR = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/exceptCar/edit`, data, null, token.atoken);
  return res;
}

export const DELETE_DATA_INFO_MANAGE_EXCEPT_CAR = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/management/exceptCar/delete`, data, null, token.atoken);
  return res;
}
