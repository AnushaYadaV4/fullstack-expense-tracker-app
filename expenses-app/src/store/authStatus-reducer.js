import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { status:localStorage.getItem('userStatus'),current:localStorage.getItem('userpage') };

const authStatusSlice=createSlice({
  name: "authSatus",
  initialState: initialAuth,
  reducers: {
    

    setUserStatus(state,action)
    {
      console.log('setting',action)
    
      let userr=action.payload
      state.user=userr
      
      localStorage.setItem('userStatus',userr);
      
    },
    setPage(state,action){
      let currentPage=action.payload;
      console.log("STORE CURRENT PAGE",currentPage);
      state.page=currentPage;
      localStorage.setItem("userpage",currentPage);

    }

    
  },
});


export const authStatusAction=authStatusSlice.actions;
export default authStatusSlice.reducer;
