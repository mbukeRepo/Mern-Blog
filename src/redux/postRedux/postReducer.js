import postActionTypes from "./postActionTypes";

const initiaState = {
  posts: [],
  error: null,
  isFetching: false,
};

const postReducer = (state = initiaState, action) => {
  switch (action.type) {
    case postActionTypes.GET_ALL_POSTS_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case postActionTypes.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
        error: null,
      };
    case postActionTypes.GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case postActionTypes.GET_POST_BY_ID_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case postActionTypes.GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: [action.payload],
        error: null,
      };
    case postActionTypes.GET_POST_BY_ID_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case postActionTypes.ADD_POST_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case postActionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case postActionTypes.ADD_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case postActionTypes.UPDATE_POST_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case postActionTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload],
        isFetching: false,
        error: null,
      };
    case postActionTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case postActionTypes.DELETE_POST_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case postActionTypes.DELETE_POST_SUCCESS:
      return {
        isFetching: false,
        error: null,
      };
    case postActionTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
