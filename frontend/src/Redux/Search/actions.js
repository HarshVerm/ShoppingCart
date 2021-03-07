import axios from "axios";
import { SEARCH_SUCCESS, SEARCH_LOADING } from "./actioTypes";

export const searchLoading = () => {
  return {
    type: SEARCH_LOADING,
  };
};

export const searchData = (payload) => {
  return {
    type: SEARCH_SUCCESS,
    payload,
  };
};

export const search = (payload) => (dispatch) => {
  dispatch(searchLoading());

  var config = {
    method: "post",
    url: "http://localhost:5000/search",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      dispatch(searchData(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
