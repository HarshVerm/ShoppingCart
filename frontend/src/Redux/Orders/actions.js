import { ALL_ORDER_BY_USER, EMPTY_ORDER_LIST } from "./actionTypes";
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

export const getOrders = (payload) => (dispatch) => {
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
      console.log(JSON.stringify(response.data));
      dispatch(getAllOrders(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
