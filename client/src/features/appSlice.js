import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const role = localStorage.getItem('role') ? localStorage.getItem('role') : null;

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userToken: token,
    userRole: role,
  },
  reducers: {
    enterUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
    },
    enterUserRole: (state, action) => {
      state.userRole = action.payload.userRole;
    },
  },
});

export const { enterUserToken, enterUserRole } = appSlice.actions;

export const selectUserToken = (state) => state.app.userToken;

export const selectUserRole = (state) => state.app.userRole;

export default appSlice.reducer;
