import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";

const store = configureStore({
    reducer: { auth: authReducer},
  });
  
  export default store;