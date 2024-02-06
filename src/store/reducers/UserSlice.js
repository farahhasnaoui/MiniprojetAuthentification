// UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
 
    name: 'user',
     initialState : {
      accessToken: null,
      userEmail: '',
      // other initial state properties
    },
    
  reducers: {
    setUserToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    clearUser: (state) => {
      state.accessToken = null;
      state.userEmail = '';
    },
  },
});

export const { setUserToken, setUserEmail, clearUser } = userSlice.actions;

export default userSlice.reducer;
