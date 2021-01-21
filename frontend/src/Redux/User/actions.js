import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./actionTypes";
import axios from "axios";

export const fetchUserSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchUserError = () => {
  return {
    type: FETCH_USER_ERROR,
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

export const userRegister = (paylaod) => (dispatch) => {
  dispatch(fetchUserLoading());

  var config = {
    method: "post",
    url: "http://localhost:5000/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: paylaod,
  };

  axios(config)
    .then((res) => {
      console.log(res);
      dispatch(fetchUserSuccess(true));
    })
    .catch((err) => dispatch(fetchUserError()));
};

export const loginUser = (paylaod) => (dispatch) => {
  dispatch(fetchUserLoading());
  console.log(paylaod);
  var config = {
    method: "POST",
    url: "http://localhost:5000/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: paylaod,
  };

  axios(config)
    .then((res) => dispatch(fetchLoginSuccess(res.data)))
    .catch((err) => dispatch(fetchUserError()));
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
};
