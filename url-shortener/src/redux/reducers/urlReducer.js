import {
  POST_URLS_START,
  POST_URLS_SUCCESS,
  POST_URLS_FAILURE,
} from '../actions';

const initialState = {
  url: [],
  error: '',
  isFetching: false,
};


export function urlReducer(state=initialState, action) {
  switch(action.type) {
    case POST_URLS_START:
      return {
        ...state,
        isFetching: true
      }
    case POST_URLS_SUCCESS:
      return {
        ...state,
        url: action.payload,
        isFetching: false
      }
    case POST_URLS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    default:
      return state;
  };
};