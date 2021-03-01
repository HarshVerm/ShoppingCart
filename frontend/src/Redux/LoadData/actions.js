import { FETCH_ERROR, FETCH_LOADING, FETCH_SUCCESS } from "./actionTypes";
import axios from "axios";

export const fetchSuccess = (payload) => {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
};

export const fetchError = () => {
  return {
    type: FETCH_ERROR,
  };
};

export const fetchLoading = () => {
  return {
    type: FETCH_LOADING,
  };
};

export const loadData = (paylaod) => (dispatch) => {
  dispatch(fetchLoading());
  var config = {
    method: "get",
    url: "https://shoppingcart991.herokuapp.com/products",
    headers: {},
    data: paylaod,
  };

  return axios(config)
    .then((res) => {
      // console.log(res.data);
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => dispatch(fetchError()));
};
