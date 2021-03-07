import { SEARCH_LOADING, SEARCH_SUCCESS } from "./actioTypes";

const init = {
  search: [],
  searchLoading: false,
};

export const searchReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        search: payload,
      };

    case SEARCH_LOADING:
      return {
        ...state,
        searchLoading: true,
      };

    default:
      return state;
  }
};
