import { ALL_ORDER_BY_USER, EMPTY_ORDER_LIST } from "./actionTypes";

const init = {
  orders: [],
};

export const orderReducer = (state = init, { type, payload }) => {
  switch (type) {
    case ALL_ORDER_BY_USER:
      return {
        ...state,
        orders: payload,
      };
    case EMPTY_ORDER_LIST:
      return {
        ...state,
        orders: [],
      };

    default:
      return state;
  }
};
