import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-reducer";
import authReducer from "./auth-reducer";
import leaderboardReducer from "./leaderboard-reducer";

const store = configureStore({
  reducer: {auth:authReducer,expense: expenseReducer,leaderBoard:leaderboardReducer},
});

export default store;