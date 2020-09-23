import Axios from "axios";
import userActionTypes from "./userActionTypes";
import { Logout } from "../authRedux/authActions";

export const GetUserByIdStart = () => ({
  type: userActionTypes.GET_USER_BY_ID_START,
});

export const GetUserByIdSuccess = (user) => ({
  type: userActionTypes.GET_USER_BY_ID_SUCCESS,
  payload: user,
});

export const GetUserByIdFailure = (error) => ({
  type: userActionTypes.GET_USER_BY_ID_FAILURE,
  payload: error,
});

export const UpdateUserStart = () => ({
  type: userActionTypes.UPDATE_USER_START,
});

export const UpdateUserSuccess = () => ({
  type: userActionTypes.UPDATE_USER_SUCCESS,
});

export const UpdateUserFailure = (error) => ({
  type: userActionTypes.UPDATE_USER_FAILURE,
  payload: error,
});

export const DeleteUserStart = () => ({
  type: userActionTypes.DELETE_USER_START,
});

export const DeleteUserSuccess = () => ({
  type: userActionTypes.DELETE_USER_SUCCESS,
});

export const DeleteUserFailure = (error) => ({
  type: userActionTypes.DELETE_USER_FAILURE,
  payload: error,
});

export const DeleteAllPostsOfAUserStart = () => ({
  type: userActionTypes.DELETE_ALL_POSTS_OF_A_USER_START,
});

export const DeleteAllPostsOfAUserSuccess = () => ({
  type: userActionTypes.DELETE_ALL_POSTS_OF_A_USER_SUCCESS,
});

export const DeleteAllPostsOfAUserFailure = (error) => ({
  type: userActionTypes.DELETE_ALL_POSTS_OF_A_USER_FAILURE,
  payload: error,
});

export const GetUserByIdAsync = (id) => {
  return async (dispatch) => {
    dispatch(GetUserByIdStart());
    try {
      await Axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
        dispatch(GetUserByIdSuccess(res.data));
      });
    } catch (err) {
      dispatch(GetUserByIdFailure(err.message));
    }
  };
};

export const UpdateUserAsync = (id, token, user) => {
  return async (dispatch) => {
    dispatch(UpdateUserStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.put(
        `http://localhost:5000/api/users/${id}`,
        user,
        config
      ).then((res) => {
        dispatch(UpdateUserSuccess(res.data));
      });
    } catch (err) {
      dispatch(UpdateUserFailure(err.message));
    }
  };
};

export const DeleteUserAsync = (id, token) => {
  return async (dispatch) => {
    dispatch(DeleteUserStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.delete(`http://localhost:5000/api/users/${id}`, config).then(
        (res) => {
          dispatch(DeleteAllPostsOfAUserAsync(id, token));
          dispatch(DeleteUserSuccess());
          dispatch(Logout());
        }
      );
    } catch (err) {
      dispatch(DeleteUserFailure(err.message));
    }
  };
};

export const DeleteAllPostsOfAUserAsync = (id, token) => {
  return async (dispatch) => {
    dispatch(DeleteAllPostsOfAUserStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.delete(
        `http://localhost:5000/api/users/${id}/posts`,
        config
      ).then((res) => {
        dispatch(DeleteAllPostsOfAUserSuccess());
      });
    } catch (err) {
      dispatch(DeleteAllPostsOfAUserFailure(err.message));
    }
  };
};
