import React from "react";
import { combineReducers } from "redux";
import authReducer from "./authRedux/authReducer";
import postReducer from "./postRedux/postReducer";
import categoryReducer from "./categoryRedux/categoryReducer";
import userReducer from "./userRedux/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth"],
};

export default persistReducer(persistConfig, rootReducer);
