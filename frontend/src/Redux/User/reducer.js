import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./actionTypes";
const init = {
  user: {},
  isLoading: false,
  isError: false,
  register: false,
  isAuth: false,
};

export const authReducer = (state = init, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        register: payload,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        register: false,
      };
    case FETCH_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        register: false,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isAuth: true,
        user: payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};
