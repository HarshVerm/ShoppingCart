import {
  FETCH_CART_ERROR,
  FETCH_CART_SUCCEESS,
  FETCH_CART_LOADING,
  SET_ADDTOCART_FALSE,
  SET_ADDTOCART_TRUE,
} from "./actionTypes";
import axios from "axios";
// import { fetchSuccess } from "../LoadData/actions";

export const addSuccess = (payload) => {
  return {
    type: FETCH_CART_SUCCEESS,
    payload,
  };
};

export const setAddToCartFalse = () => {
  return {
    type: SET_ADDTOCART_FALSE,
  };
};
export const setAddToCartTrue = () => {
  return {
    type: SET_ADDTOCART_TRUE,
  };
};

export const fetchError = () => {
  return {
    type: FETCH_CART_ERROR,
  };
};

export const fetchLoading = () => {
  return {
    type: FETCH_CART_LOADING,
  };
};

export const getCartData = (payload) => (dispatch) => {
  dispatch(fetchLoading());

  var config = {
    method: "get",
    url: `http://localhost:5000/cart/${payload}`,
    headers: {},
  };

  axios(config)
    .then((res) => {
      dispatch(addSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchError());
    });
};

export const addToCart = (payload) => (dispatch) => {
  dispatch(fetchLoading());
  var config = {
    method: "post",
    url: `http://localhost:5000/addToCart`,
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(() => {
      dispatch(setAddToCartTrue());
    })
    .catch(() => {
      dispatch(fetchError());
    });
};

export const removeProductById = (payload) => (dispatch) => {
  dispatch(fetchLoading());
  var config = {
    method: "delete",
    url: `http://localhost:5000/removeProduct/${payload}`,
    headers: {},
  };

  axios(config)
    .then(() => {})
    .catch(() => {
      dispatch(fetchError());
    });
};

export const changeQuantity = (payload) => (dispatch) => {
  dispatch(fetchLoading());
  const { qty, id } = payload;

  var config = {
    method: "put",
    url: `http://localhost:5000/changeQuantity/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { qty },
  };

  axios(config)
    .then(() => {})
    .catch((error) => {
      dispatch(fetchError());
    });
};

export const removecart = (payload) => (dispatch) => {
  dispatch(fetchLoading());
};

// export const
