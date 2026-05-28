// import React from "react";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { USER_LOGOUT } from "./types";
// import { refreshTokenAPI } from '../../service/api/auth'

export const getUserID = token => {
  const payload = jwt.decode(token.atoken);
  return payload;
};

export const checkAndRenewToken = async (access_user, dispatch) => {
  const payload = jwt.decode(access_user.token.atoken);
  const now_date = new Date().getTime() / 1000;

  if (now_date > (payload.exp + (5 * 60 * 1000))) {
    refreshToken(access_user)(dispatch)
  }

  if (now_date > payload.exp) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "User ของคุณหมดอายุแล้ว",
    }).then(async res => {
      if (!res) return;
      try {
        await localStorage.removeItem("user_token");
        await localStorage.removeItem("user_data");
        dispatch({
          type: USER_LOGOUT
        });
        window.location.replace("/#/login");
        return;
      } catch (exception) {
        console.log(exception);
        return;
      }
    });
  }
};

export const refreshToken = (access_user) => async (dispatch) => {
  try {
    // const res_re = await refreshTokenAPI({
    //   refreshToken: access_user.token,
    //   staffId: access_user.userData.staffId
    // })
  } catch (error) {
    console.log(error);
    return;
  }

}

