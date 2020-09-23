import authActionTypes from "./authActionTypes";

const initiaState = {
  currentUser: null,
  error: null,
  isFetching: false,
};

const authReducer = (state = initiaState, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case authActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case authActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case authActionTypes.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload,
        error: null,
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case authActionTypes.LOGOUT_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case authActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: null,
        error: null,
      };
    case authActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case authActionTypes.CHANGE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case authActionTypes.CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: {...state.currentUser, ...action.payload},
        error: null,
      };
    case authActionTypes.CHANGE_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
