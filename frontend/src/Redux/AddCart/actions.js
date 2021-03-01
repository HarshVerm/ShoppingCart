import {
  FETCH_CART_ERROR,
  FETCH_CART_SUCCEESS,
  FETCH_CART_LOADING,
  SET_ADDTOCART_FALSE,
  SET_ADDTOCART_TRUE,
  SET_EMPTY,
} from "./actionTypes";
import axios from "axios";
import { getToken, saveData } from "../../Utils/localstorage";
import { setTokenNull } from "../User/actions";
// import { fetchSuccess } from "../getToken/actions";

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
export const setCartEmpty = () => {
  return {
    type: SET_EMPTY,
  };
};

export const getCartData = (payload) => (dispatch) => {
  dispatch(fetchLoading());

  var config = {
    method: "get",
    url: `https://shoppingcart991.herokuapp.com/cart`,
    headers: {
      authorization: `Bearer ${getToken("token")}`,
    },
  };

  axios(config)
    .then((res) => {
      dispatch(addSuccess(res.data));
    })
    .catch(() => {
      saveData("token", null);
      dispatch(fetchError());
      dispatch(setTokenNull());
    });
};

export const addToCart = (payload) => (dispatch) => {
  dispatch(fetchLoading());
  var config = {
    method: "post",
    url: `https://shoppingcart991.herokuapp.com/addToCart`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken("token")}`,
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
    url: `https://shoppingcart991.herokuapp.com/removeProduct/${payload}`,
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
    url: `https://shoppingcart991.herokuapp.com/changeQuantity/${id}`,
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
  var config = {
    method: "delete",
    url: `https://shoppingcart991.herokuapp.com/removeCart/${payload}`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken("token")}`,
    },
  };

  axios(config)
    .then(() => {
      dispatch(setCartEmpty());
    })
    .catch((error) => {
      dispatch(fetchError());
    });
};

// export const
