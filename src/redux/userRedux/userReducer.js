import userActionTypes from "./userActionTypes";

const initiaState = {
  users: null,
  error: null,
  isFetching: false,
};

const userReducer = (state = initiaState, action) => {
  switch (action.type) {
    case userActionTypes.GET_USER_BY_ID_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case userActionTypes.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: [action.payload],
        error: null,
      };
    case userActionTypes.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case userActionTypes.UPDATE_USER_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case userActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case userActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case userActionTypes.DELETE_USER_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case userActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case userActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case userActionTypes.DELETE_ALL_POSTS_OF_A_USER_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case userActionTypes.DELETE_ALL_POSTS_OF_A_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case userActionTypes.DELETE_ALL_POSTS_OF_A_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
