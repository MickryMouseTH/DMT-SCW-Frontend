import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'

export const userLoginAPI = async (data) => {
  const res = await Fetch("POST", `${apiV1}/login`, data, 'Basic', null);
  return res;
}
export const userLogoutAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/logout`, data, null, token.atoken);
  return res;
}
export const refreshTokenAPI = async (data) => {
  const res = await Fetch("POST", `${apiV1}/refreshToken`, data, 'Basic', null);
  return res;
}
export const chngePasswordAPI = async (data, token) => {
  const checkCode = { F203: false }
  const res = await Fetch("POST", `${apiV1}/changePassword`, data, 'Basic', token.atoken, checkCode);
  return res;
}


