import Axios from "axios";
import categoryActionTypes from "./categoryActionTypes";

export const GetAllCategoriesStart = () => ({
  type: categoryActionTypes.GET_ALL_CATEGORY_START,
});

export const GetAllCategoriesSuccess = (categories) => ({
  type: categoryActionTypes.GET_ALL_CATEGORY_SUCCESS,
  payload: categories,
});

export const GetAllCategoriesFailure = (error) => ({
  type: categoryActionTypes.GET_ALL_CATEGORY_FAILURE,
  payload: error,
});

export const GetAllCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(GetAllCategoriesStart());
    try {
      const res = await Axios.get("http://localhost:5000/api/categories")
      dispatch(GetAllCategoriesSuccess(res.data));
    } catch (err) {
      dispatch(GetAllCategoriesFailure(err.message));
    }
  };
};
