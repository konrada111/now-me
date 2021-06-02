import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const role = localStorage.getItem('role') ? localStorage.getItem('role') : null;

const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userToken: token,
    userRole: role,
    id: userId,
  },
  reducers: {
    enterUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
    },
    enterUserRole: (state, action) => {
      state.userRole = action.payload.userRole;
    },
    enterUserId: (state, action) => {
      state.id = action.payload.id;
    },
  },
});

export const { enterUserToken, enterUserRole, enterUserId } = appSlice.actions;

export const selectUserToken = (state) => state.app.userToken;

export const selectUserRole = (state) => state.app.userRole;

export const selectUserId = (state) => state.app.id;

export default appSlice.reducer;
