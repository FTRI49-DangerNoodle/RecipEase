import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // eslint-disable-next-line no-unused-vars
    logoutUser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const selectFavs = (state) => state.auth.userInfo?.favoriteRecipes;
export const selectUser = (state) => state.auth.userInfo;

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
