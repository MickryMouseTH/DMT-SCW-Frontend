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

// Session keep-alive. heartbeat is polled on logged-in pages to read how much
// session time is left (remainingSeconds) and to detect expiry (F203/F204/401).
// version is a no-op call used as a "touch" to bump the server-side session
// timer when the user clicks "Stay logged in".
export const heartbeatAPI = async (token) => {
  const res = await Fetch("GET", `${apiV1}/heartbeat`, {}, null, token.atoken);
  return res;
}
export const versionAPI = async (token) => {
  const res = await Fetch("GET", `${apiV1}/version`, {}, null, token.atoken);
  return res;
}


