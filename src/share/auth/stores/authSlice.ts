import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@share/types/commons';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * The initial state of the authentication slice.
 * @type {AuthState}
 */
const initialState: AuthState = {
    isLoggingOut: false,
    previousPopup: null,
    token: null,
};

/**
 * Auth slice for managing authentication state.
 */
const authSlice = createSlice({
    initialState,
    name: 'authentication',
    reducers: {
        clearToken: state => {
            state.token = null;
        },
        resetAppState: _state => {
            return initialState;
        },
        setLoggingOut: (state, action: PayloadAction<boolean>) => {
            state.isLoggingOut = action.payload;
        },
        setPreviousPopup: (
            state,
            action: PayloadAction<'auth' | 'forget_password' | null>
        ) => {
            state.previousPopup = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoggingOut = false; // Reset logout flag when setting new token
        },
    },
});

export const {
    clearToken,
    resetAppState,
    setLoggingOut,
    setPreviousPopup,
    setToken,
} = authSlice.actions;

const persistConfig = {
    // Không persist isLoggingOut vì nó chỉ là flag tạm thời
    blacklist: ['isLoggingOut'],
    key: 'authentication',
    storage,
};

export const persistedAuthReducer = persistReducer(
    persistConfig,
    authSlice.reducer
);
