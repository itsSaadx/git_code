import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice";
import todoReducer from "./todoslice";

export const store = configureStore({
  reducer: {
    userdata: usersReducer,
    tododata: todoReducer
  }
});