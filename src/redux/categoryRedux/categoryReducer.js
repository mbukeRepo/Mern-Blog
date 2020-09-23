import categoryActionTypes from "./categoryActionTypes";

const initiaState = {
  categories: [],
  error: null,
  isFetching: false,
};

const categoryReducer = (state = initiaState, action) => {
  switch (action.type) {
    case categoryActionTypes.GET_ALL_CATEGORY_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case categoryActionTypes.GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
        error: null,
      };
    case categoryActionTypes.GET_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
