import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";
import authReducer from "./auth-reducer";

const store = configureStore({
  reducer: {auth:authReducer,expense: expenseReducer},
});

export default store;