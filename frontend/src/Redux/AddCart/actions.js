import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

export const addSuccess = (payload, qty) => {
  return {
    type: ADD_TO_CART,
    payload,
    qty,
  };
};

export const addToCart = (payload, qty) => (dispatch) => {
  dispatch(addSuccess(payload, qty));
};

// export const
