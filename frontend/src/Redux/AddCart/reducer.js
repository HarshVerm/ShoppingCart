import React from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

const init = {
  cart: [],
  totalPrice: 0,
  totalItem: 0,
};

const getTotal = (cart) => {
  const total = cart.reduce((a, c) => a + Number(c.qty) * Number(c.price), 0);
  const totaItems = cart.reduce((a, c) => a + Number(c.qty), 0);
  return { total, totaItems };
};

export const cartReducer = (state = init, { type, payload, qty }) => {
  console.log(payload, qty);

  switch (type) {
    case ADD_TO_CART:
      const searchCart = state.cart.findIndex(
        (items) => items.product_id === payload.product_id,
      );
      if (searchCart === -1) {
        const cart = [...state.cart, { ...payload, qty }];
        const total = getTotal(cart);
        return {
          ...state,
          cart: cart,
          totalPrice: total.total,
          totalItem: total.totaItems,
        };
      } else {
        const newCart = state.cart?.map((item, i) =>
          i === searchCart
            ? { ...item, qty: Number(item.qty) + Number(qty) }
            : item,
        );
        const total = getTotal(newCart);
        return {
          ...state,
          cart: [...newCart],
          totalPrice: total.total,
          totalItem: total.totaItems,
        };
      }

    default:
      return state;
  }
};
