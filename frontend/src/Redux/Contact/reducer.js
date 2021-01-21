import { SENT_MAIL, SENT_SET_FALSE, SET_LOADING } from "./actionTypes";

const init = {
  isError: false,
  isLoading: false,
  sent: false,
};

export const contactReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SENT_MAIL:
      return {
        ...state,
        isError: false,
        isLoading: false,
        sent: true,
      };
    case SENT_SET_FALSE:
      return {
        ...state,
        sent: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        sent: false,
      };

    default:
      return state;
  }
};
