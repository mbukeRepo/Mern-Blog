import Axios from "axios";
import authActionTypes from "./authActionTypes";

export const RegisterStart = () => ({
  type: authActionTypes.REGISTER_START,
});

export const RegisterSuccess = () => ({
  type: authActionTypes.REGISTER_SUCCESS,
});

export const RegisterFailure = (error) => ({
  type: authActionTypes.REGISTER_FAILURE,
  payload: error,
});

export const LoginStart = () => ({
  type: authActionTypes.LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: authActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = (error) => ({
  type: authActionTypes.LOGIN_FAILURE,
  payload: error,
});

export const LogoutStart = () => ({
  type: authActionTypes.LOGOUT_START,
});

export const LogoutSuccess = () => ({
  type: authActionTypes.LOGOUT_SUCCESS,
});

export const LogoutFailure = (error) => ({
  type: authActionTypes.LOGOUT_FAILURE,
  payload: error,
});

export const ChangeProfileStart = () => ({
  type: authActionTypes.CHANGE_PROFILE_START,
});

export const ChangeProfileSuccess = (fields) => ({
  type: authActionTypes.CHANGE_PROFILE_SUCCESS,
  payload: fields,
});

export const ChangeProfileFailure = (error) => ({
  type: authActionTypes.CHANGE_PROFILE_FAILURE,
  payload: error,
});

export const RegisterAsync = (payload) => {
  return async (dispatch) => {
    dispatch(RegisterStart());
    try {
      await Axios.post("http://localhost:5000/api/auth/register", payload)
      dispatch(RegisterSuccess());
    } catch (err) {
      dispatch(RegisterFailure(err.response.data));
    }
  };
};

export const LoginAsync = (payload) => {
  return async (dispatch) => {
    dispatch(LoginStart());
    try {
      const res = await Axios.post("http://localhost:5000/api/auth/login", payload)
      dispatch(LoginSuccess(res.data));
    } catch (err) {
      dispatch(LoginFailure(err));
    }
  };
};

export const Logout = () => {
  return (dispatch) => {
    dispatch(LogoutStart());
    try {
      dispatch(LogoutSuccess());
    } catch (err) {
      dispatch(LogoutFailure(err));
    }
  };
};

export const ChangeProfile = (user) => {
  return (dispatch) => {
    dispatch(ChangeProfileStart());
    try {
      dispatch(ChangeProfileSuccess(user));
    } catch (err) {
      dispatch(ChangeProfileFailure(err));
    }
  };
};
