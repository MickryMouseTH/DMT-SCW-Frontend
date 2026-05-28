import {
  USER_LOGOUT,
  REFRESH_TOKEN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../actions/types"
const initState = {
  token: {
    atoken: "",
    rtoken: ""
  },
  userData: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userData: action.payload.userData
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        token: {
          atoken: "",
          rtoken: ""
        },
        userData: {}
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        token: {
          ...state.token,
          atoken: action.payload.token,
        },
        userData: {}
      };
    case USER_LOGOUT:
      return {
        token: '',
        userData: ''
      };
    default:
      return state;
  }
};
