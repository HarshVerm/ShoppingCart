import {
  ALL_ORDER_BY_USER,
  EMPTY_ORDER_LIST,
  NO_OF_ORDER,
  ORDER_LIST_LOADING,
} from "./actionTypes";
import axios from "axios";

export const getAllOrders = (payload) => {
  return {
    type: ALL_ORDER_BY_USER,
    payload,
  };
};

export const emptyOrder = () => {
  return {
    type: EMPTY_ORDER_LIST,
  };
};

export const orderLoading = () => {
  return {
    type: ORDER_LIST_LOADING,
  };
};

export const no_of_order = (payload) => {
  return {
    type: NO_OF_ORDER,
    payload,
  };
};

export const getOrders = (payload) => (dispatch) => {
  dispatch(orderLoading());
  var config = {
    method: "post",
    url: "https://shoppingcart991.herokuapp.com/get-all-orders",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      // console.log(response.data);
      dispatch(getAllOrders(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getNo = (payload) => (dispatch) => {
  dispatch(orderLoading());
  var config = {
    method: "post",
    url: "http://localhost:5000/get-order-length",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      dispatch(no_of_order(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
