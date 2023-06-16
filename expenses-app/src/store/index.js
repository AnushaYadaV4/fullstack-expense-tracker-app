import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";
import authReducer from "./auth-reducer";
import leaderboardReducer from "./leaderboard-reducer";
import authStatusReducer from "./authStatus-reducer";

const store = configureStore({
  reducer: {auth:authReducer,expense: expenseReducer,leaderBoard:leaderboardReducer,userStatus:authStatusReducer}
});

export default store;