import { createSlice } from "@reduxjs/toolkit";

const initialLeaderboard = { leaderboardArr: []};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: initialLeaderboard,
  reducers: {
    
    leaderboardData(state,action)
    {
      console.log('GETTING LEADER BOARD DATA',action.payload)
      state.leaderboardArr=[...state.leaderboardArr,action.payload]
      //console.log("state leader board",state.leaderboardArr)
    }

    
  },
});

export const leaderboardAction = leaderboardSlice.actions;
export default leaderboardSlice.reducer;