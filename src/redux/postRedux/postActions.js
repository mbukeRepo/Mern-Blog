import Axios from "axios";
import postActionTypes from "./postActionTypes";

export const GetAllPostsStart = () => ({
  type: postActionTypes.GET_ALL_POSTS_START,
});

export const GetAllPostsSuccess = (posts) => ({
  type: postActionTypes.GET_ALL_POSTS_SUCCESS,
  payload: posts,
});

export const GetAllPostsFailure = (error) => ({
  type: postActionTypes.GET_ALL_POSTS_FAILURE,
  payload: error,
});

export const GetPostByIdStart = () => ({
  type: postActionTypes.GET_POST_BY_ID_START,
});

export const GetPostByIdSuccess = (post) => ({
  type: postActionTypes.GET_POST_BY_ID_SUCCESS,
  payload: post,
});

export const GetPostByIdFailure = (error) => ({
  type: postActionTypes.GET_POST_BY_ID_FAILURE,
  payload: error,
});

export const AddPostStart = () => ({
  type: postActionTypes.ADD_POST_START,
});

export const AddPostSuccess = () => ({
  type: postActionTypes.ADD_POST_SUCCESS,
});

export const AddPostFailure = (error) => ({
  type: postActionTypes.ADD_POST_FAILURE,
  payload: error,
});

export const UpdatePostStart = () => ({
  type: postActionTypes.UPDATE_POST_START,
});

export const UpdatePostSuccess = (post) => ({
  type: postActionTypes.UPDATE_POST_SUCCESS,
  payload: post,
});

export const UpdatePostFailure = (error) => ({
  type: postActionTypes.UPDATE_POST_FAILURE,
  payload: error,
});

export const DeletePostStart = () => ({
  type: postActionTypes.DELETE_POST_START,
});

export const DeletePostSuccess = () => ({
  type: postActionTypes.DELETE_POST_SUCCESS,
});

export const DeletePostFailure = (error) => ({
  type: postActionTypes.DELETE_POST_FAILURE,
  payload: error,
});

export const GetAllPostsAsync = () => {
  return async (dispatch) => {
    dispatch(GetAllPostsStart());
    try {
      await Axios.get("http://localhost:5000/api/posts").then((res) => {
        dispatch(GetAllPostsSuccess(res.data.reverse()));
      });
    } catch (err) {
      dispatch(GetAllPostsFailure(err.message));
    }
  };
};

export const GetPostByIdAsync = (id) => {
  return async (dispatch) => {
    dispatch(GetPostByIdStart());
    try {
      await Axios.get(`http://localhost:5000/api/posts/${id}`).then((res) => {
        dispatch(GetPostByIdSuccess(res.data));
      });
    } catch (err) {
      dispatch(GetPostByIdFailure(err.message));
    }
  };
};

export const AddPostAsync = (post, token) => {
  return async (dispatch) => {
    dispatch(AddPostStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.post("http://localhost:5000/api/posts", post, config).then(
        (res) => {
          dispatch(AddPostSuccess());
          window.location.href = "/";
        }
      );
    } catch (err) {
      dispatch(AddPostFailure(err.message));
    }
  };
};

export const UpdatePostAsync = ({id, post, token}) => {
  return async (dispatch) => {
    dispatch(UpdatePostStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.put(
        `http://localhost:5000/api/posts/${id}`,
        post,
        config
      ).then((res) => {
        dispatch(UpdatePostSuccess(post));
        window.location.href = "/";
      });
    } catch (err) {
      dispatch(UpdatePostFailure(err.message));
    }
  };
};

export const DeletePostAsync = (id, token) => {
  return async (dispatch) => {
    dispatch(DeletePostStart());
    try {
      const config = { headers: { Authorization: token } };
      await Axios.delete(`http://localhost:5000/api/posts/${id}`, config).then(
        (res) => {
          window.location.href = "/";
          dispatch(DeletePostSuccess());
        }
      );
    } catch (err) {
      dispatch(DeletePostFailure(err.message));
    }
  };
};
