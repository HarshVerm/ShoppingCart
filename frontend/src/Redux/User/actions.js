import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  USER_LOGOUT,
  SET_ERROR,
} from "./actionTypes";
import axios from "axios";

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
      dispatch(fetchUserSuccess());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(fetchUserError(err.response.data));
    });
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
    .catch((err) => dispatch(fetchUserError(err.response.data)));
};

export const userLogout = () => (dispatch) => {
  dispatch(logout());
};
