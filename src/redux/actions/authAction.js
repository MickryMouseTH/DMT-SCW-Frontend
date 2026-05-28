import {
  USER_LOGOUT,
  REFRESH_TOKEN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS
} from "./types";

import { _isEmpty } from '../../tools/util'
import { checkAndRenewToken } from './checktoken_action'
import { userLoginAPI, userLogoutAPI, refreshTokenAPI } from '../../service/api/auth'

export const userlogin = (userdata, callback) => async dispatch => {

  try {
    let token = await localStorage.getItem("user_token");
    let userData = await localStorage.getItem("user_data");

    if (token) {
      const access_user = {
        token: JSON.parse(token),
        userData: JSON.parse(userData)
      }

      await checkAndRenewToken(access_user, dispatch);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          token: JSON.parse(token),
          userData: JSON.parse(userData)
        }
      });
      callback("success");
    } else {
      let res_auth = await userLoginAPI(userdata);
      if (_isEmpty(res_auth.status)) {
        callback("fail", { message: "Server Error" });
        return
      }

      if (res_auth.status.code === "F205") {
        callback("password expired", { message: "password expired" });
        // window.location.replace("/#/changepassword");
        return
      }

      if (res_auth.status.code === 406 || res_auth.status.code === "406") {
        callback("server error", { message: "Server Error" });
        // window.location.replace("/#/changepassword");
        return
      }

      if (res_auth && res_auth.status.code === "S200") {
        const user_token = {
          atoken: res_auth.accessToken,
          rtoken: res_auth.refreshToken
        };
        if (!res_auth.permissionMenuList || _isEmpty(res_auth.permissionMenuList)) {
          callback("fail", { message: "You don't have permission" });
          return
        }
        const user_data = {
          staffId: res_auth.staffId,
          staffNameEn: res_auth.staffNameEn,
          staffNameTh: res_auth.staffNameTh,
          staffGroupId: res_auth.staffGroupId,
          staffGroupName: res_auth.staffGroupName,
          pms: res_auth.permissionMenuList
        };
        await localStorage.setItem("user_data", JSON.stringify(user_data));
        await localStorage.setItem("user_token", JSON.stringify(user_token));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            token: user_token,
            userData: user_data
          }
        });
        callback("success", res_auth);
      }
      else {
        dispatch({
          type: USER_LOGIN_FAIL
        });
        callback("fail", { message: res_auth.status.message });
      }
    }
  } catch (error) {
    console.log(error);
    callback("fail", { message: "Server Error" });
    dispatch({
      type: USER_LOGIN_FAIL
    });
  }
  return;
};

export const isLogin = callback => async dispatch => {
  try {
    let token = await localStorage.getItem("user_token");
    let userData = await localStorage.getItem("user_data");
    const access_user = {
      token: JSON.parse(token),
      userData: JSON.parse(userData)
    }
    if (token) {
      await checkAndRenewToken(access_user, dispatch);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          token: JSON.parse(token),
          userData: JSON.parse(userData)
        }
      });
      callback("success");
    } else {
      dispatch({
        type: USER_LOGIN_FAIL
      });
      callback("fail");
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL
    });
    callback("refresh");
  }
};

export const userLogout = (callback) => async dispatch => {
  try {
    let token = await localStorage.getItem("user_token");
    let userData = await localStorage.getItem("user_data");
    const access_user = {
      token: JSON.parse(token),
      userData: JSON.parse(userData)
    }
    const res_logout = await userLogoutAPI({ staffId: access_user.userData.staffId }, access_user.token)

    if (res_logout.status.code === "S200") {
      await localStorage.removeItem("user_token");
      await localStorage.removeItem("user_data");
      dispatch({
        type: USER_LOGOUT
      });
      callback("success");
      return;
    } else {
      await localStorage.removeItem("user_data");
      await localStorage.removeItem("user_token");
      dispatch({
        type: USER_LOGIN_FAIL
      });
      callback("fail", { message: res_logout.status.message });
    }
  } catch (exception) {
    dispatch({
      type: USER_LOGIN_FAIL
    });
    callback("fail");
    return;
  }
};

export const refreshToken = (callback) => async (dispatch) => {
  try {
    let token = await localStorage.getItem("user_token");
    let userData = await localStorage.getItem("user_data");
    const access_user = {
      token: JSON.parse(token),
      userData: JSON.parse(userData)
    }

    const res_refresh = await refreshTokenAPI({
      refreshToken: access_user.token.rtoken,
      staffId: access_user.userData.staffId
    })
    if (res_refresh.status.code === 'S200') {
      const newToken = {
        atoken: res_refresh.accessToken,
        rtoken: access_user.rtoken
      }
      await localStorage.setItem("user_token", JSON.stringify(newToken));
      dispatch({
        type: REFRESH_TOKEN,
        payload: {
          token: res_refresh.accessToken,
        }
      })
    }
    callback('success')
  } catch (error) {
    console.log(error)
  }
}