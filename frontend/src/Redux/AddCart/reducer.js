import {
  FETCH_CART_ERROR,
  FETCH_CART_LOADING,
  FETCH_CART_SUCCEESS,
  SET_ADDTOCART_FALSE,
  SET_ADDTOCART_TRUE,
  SET_EMPTY,
} from "./actionTypes";

const init = {
  cart: [],
  totalPrice: 0,
  totalItem: 0,
  cartLoading: false,
  cartError: false,
  addToCart: false,
};

const getTotal = (cart) => {
  const total = cart.reduce((a, c) => a + Number(c.qty) * Number(c.price), 0);
  const totaItems = cart.reduce((a, c) => a + Number(c.qty), 0);
  return { total, totaItems };
};

export const cartReducer = (state = init, { type, payload }) => {
  switch (type) {
    case FETCH_CART_SUCCEESS:
      const total = getTotal(payload);
      return {
        ...state,
        cart: payload,
        totalPrice: total.total,
        totalItem: total.totaItems,
        cartLoading: false,
        cartError: false,
      };
    case FETCH_CART_ERROR:
      return {
        ...state,
        cartError: true,
        cartLoading: false,
      };
    case FETCH_CART_LOADING:
      return {
        ...state,
        // cart: [],
        cartError: false,
        cartLoading: true,
        // totalItem: 0,
        // totalPrice: 0,
      };

    case SET_ADDTOCART_FALSE:
      return {
        ...state,
        addToCart: false,
      };
    case SET_ADDTOCART_TRUE:
      return {
        ...state,
        addToCart: true,
      };
    case SET_EMPTY:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
