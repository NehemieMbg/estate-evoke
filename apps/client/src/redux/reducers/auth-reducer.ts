import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/reducers-types';

const initialState: AuthState = {
  loginModal: false,
  registerModal: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    openLoginModal: (state) => {
      if (state.user) return;
      state.loginModal = true;
      state.registerModal = false;
    },
    openRegisterModal: (state) => {
      if (state.user) return;
      state.registerModal = true;
      state.loginModal = false;
    },
    closeModals: (state) => {
      state.loginModal = false;
      state.registerModal = false;
    },
  },
});

export const { setUser, openLoginModal, openRegisterModal, closeModals } =
  authSlice.actions;

export default authSlice.reducer;
