import { SENT_MAIL, SENT_SET_FALSE, SET_LOADING } from "./actionTypes";
import axios from "axios";

const sentMailSuccess = (payload) => {
  return {
    type: SENT_MAIL,
    payload,
  };
};

export const setSentfalse = () => {
  return {
    type: SENT_SET_FALSE,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const sentMail = (payload) => (dispatch) => {
  dispatch(setLoading());
  var config = {
    method: "post",
    url: "http://localhost:5000/contact",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then((res) => {
      dispatch(sentMailSuccess(res));
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
};
