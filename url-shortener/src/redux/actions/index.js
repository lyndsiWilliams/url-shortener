import axios from "axios";
// Destructured command names to avoid typos in the reducer
export const POST_URLS_START = "POST_URLS_START";
export const POST_URLS_SUCCESS = "POST_URLS_SUCCESS";
export const POST_URLS_FAILURE = "POST_URLS_FAILURE";

export const postURL = newURL => dispatch => {
  dispatch({ type: POST_URLS_START });
  axios
    .post("https://myminnow.herokuapp.com/url", newURL)
    .then(response => {
      console.log("POST REQUEST: ", response);
      dispatch({ type: POST_URLS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: POST_URLS_FAILURE, payload: error });
    });
};