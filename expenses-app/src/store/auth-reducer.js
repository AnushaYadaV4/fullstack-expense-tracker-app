import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { token: localStorage.getItem('ExpenseToken'), useremail:localStorage.getItem('ExpenseUserMail') };

const authSlice=createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    getExpenseToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("ExpenseToken", action.payload);
    },
    removeExpenseToken(state) {
      state.token = null;
      localStorage.removeItem('ExpenseToken')
    },
    setUserEmail(state,action)
    {
      console.log('setting',action)
      let email1=action.payload.replace('.','');
      let email2=email1.replace('@','');
      state.useremail=email2;
      localStorage.setItem('ExpenseUserMail',email2)
      
    },
    removeUserEmail(state)
    {
      state.useremail='';
      localStorage.removeItem('ExpenseUserMail')
    }
  },
});


export const authAction=authSlice.actions;
export default authSlice.reducer;
