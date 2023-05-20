import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice";

//defined reducers
const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export default configureStore({
  reducer: rootReducer,
});
