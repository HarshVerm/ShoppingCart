import {
  ALL_ORDER_BY_USER,
  EMPTY_ORDER_LIST,
  NO_OF_ORDER,
  ORDER_LIST_LOADING,
} from "./actionTypes";

const init = {
  orders: [],
  no_orders: 0,
  orderLoading: false,
};

export const orderReducer = (state = init, { type, payload }) => {
  switch (type) {
    case ALL_ORDER_BY_USER:
      return {
        ...state,
        orders: payload,
        orderLoading: false,
      };
    case EMPTY_ORDER_LIST:
      return {
        ...state,
        orders: [],
        no_orders: 0,
      };

    case NO_OF_ORDER:
      return {
        ...state,
        orderLoading: false,
        no_orders: payload,
      };

    case ORDER_LIST_LOADING:
      return {
        ...state,
        orderLoading: true,
      };

    default:
      return state;
  }
};
