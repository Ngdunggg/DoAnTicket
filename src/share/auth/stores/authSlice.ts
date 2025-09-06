import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@share/types/commons";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/**
 * The initial state of the authentication slice.
 * @type {AuthState}
 */
const initialState: AuthState = {
  token: null,
};

/**
 * Auth slice for managing authentication state.
 */
const authSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    clearToken: state => {
      state.token = null;
    },
    resetAppState: _state => {
      return initialState;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { clearToken, resetAppState, setToken } = authSlice.actions;

const persistConfig = {
  key: "authentication",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);
