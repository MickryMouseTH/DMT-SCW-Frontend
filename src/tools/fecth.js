import { apiURL } from "../config/ApiServer";
import * as btoa from 'btoa'
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
    const datas = await res.json();

    if (checkCode.F203 && datas.status.code === "F203") {
      await localStorage.removeItem("user_token");
      await localStorage.removeItem("user_data");
      window.location.assign("/#/login")
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
