import { apiURL } from "../config/ApiServer";
import * as btoa from 'btoa'

// Global session-expiry handler. The app uses native fetch (no axios), so
// this wrapper is the single choke-point every API call passes through — it
// doubles as the "fetch interceptor" that catches an invalid/expired session
// (HTTP 401, or backend status codes F203/F204) on ANY request, clears the
// stored token and bounces the user back to login. Guarded against redirect
// loops when we're already on the login page.
const handleSessionExpired = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_data");
  if (!String(window.location.hash || "").startsWith("#/login")) {
    window.location.assign("/#/login");
  }
};

export const Fetch = async (method = "POST", path, data = {}, Basic = null, token, checkCode = { F203: true }) => {
  try {
    const url = `${apiURL}${path}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: token !== "" ? "Bearer " + token : ""
        Authorization: Basic ? 'Basic ' + btoa('DMTUSER:DMTPASS') : token !== "" ? "Bearer " + token : ""
        // Authorization: 'Basic ' + btoa('DMTUSER:DMTPASS')
      },
      method: method || "POST",
      body: method === "POST" ? JSON.stringify(data) : null
    });

    // Parse defensively — a 401 may come back with an empty / non-JSON body.
    let datas;
    try {
      datas = await res.json();
    } catch (e) {
      datas = {};
    }

    // Session invalid if the transport says 401 or the body carries F203/F204.
    const code = datas && datas.status ? datas.status.code : undefined;
    const sessionInvalid = res.status === 401 || code === "F203" || code === "F204";
    if (checkCode.F203 && sessionInvalid) {
      handleSessionExpired();
    }

    return datas;
  } catch (err) {
    return err;
  }
};

export const FetchFormData = async (
  method = "POST",
  path,
  data = {},
  token
) => {
  try {
    const url = `${apiURL}${path}`;
    const res = await fetch(url, {
      headers: {
        Authorization: token !== "" ? "Bearer " + token : ""
      },
      method: method || "POST",
      body: method === "POST" ? data : null
    });
    const datas = await res.json();
    return datas;
  } catch (err) {
    return err;
  }
};

// export const convertSearchParams = (param = {}) => {
//   const newParam = new URLSearchParams(Object.entries(param)).toString();
//   return "?" + newParam;
// };
