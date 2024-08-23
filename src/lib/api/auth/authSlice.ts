import { removeRefresh, secureRefresh } from "@/lib/cryptography";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (action.payload.refreshToken !== null) {
        secureRefresh(action.payload.refreshToken);
      }
    },
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      removeRefresh();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
