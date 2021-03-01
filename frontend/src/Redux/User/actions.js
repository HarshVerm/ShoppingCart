import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  USER_LOGOUT,
  SET_ERROR,
  SET_USER,
  SET_TOKEN,
} from "./actionTypes";
import axios from "axios";
import { getToken } from "../../Utils/localstorage";

export const fetchUserSuccess = () => {
  return {
    type: FETCH_USER_SUCCESS,
  };
};

export const fetchUserError = (payload) => {
  return {
    type: FETCH_USER_ERROR,
    payload,
  };
};

export const fetchUserLoading = () => {
  return {
    type: FETCH_USER_LOADING,
  };
};

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const fetchLoginSuccess = (payload) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload,
  };
};

export const setErrorFalse = () => {
  return {
    type: SET_ERROR,
  };
};
export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};

export const setTokenNull = () => {
  return {
    type: SET_TOKEN,
  };
};

export const userRegister = (paylaod) => (dispatch) => {
  dispatch(fetchUserLoading());

  var config = {
    method: "post",
    url: "https://shoppingcart991.herokuapp.com/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: paylaod,
  };

  axios(config)
    .then((res) => {
      // console.log(res);
      dispatch(fetchUserSuccess());
    })
    .catch((err) => {
      // console.log(err.response);
      dispatch(fetchUserError(err.response.data));
    });
};

export const loginUser = (paylaod) => (dispatch) => {
  dispatch(fetchUserLoading());
  // console.log(paylaod);
  var config = {
    method: "POST",
    url: "https://shoppingcart991.herokuapp.com/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: paylaod,
  };

  axios(config)
    .then((res) => {
      // console.log(res);

      dispatch(fetchLoginSuccess(res.data.accessToken));
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(fetchUserError(err.response));
    });
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
};

export const getActive = () => (dispatch) => {
  var config = {
    method: "get",
    url: "https://shoppingcart991.herokuapp.com/user",
    headers: {
      Authorization: `Bearer ${getToken("token")}`,
    },
  };

  axios(config)
    .then(function (response) {
      dispatch(setUser(response.data));
    })
    .catch(function (error) {
      dispatch(setTokenNull());
    });
};
