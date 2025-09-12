import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@share/models/auth/user';
import { UserState } from '@share/types/commons';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * The initial state of the user slice.
 * @type {UserState}
 */
const initialState: UserState = {
    user: null,
};

/**
 * User slice for managing user state.
 */
const userSlice = createSlice({
    initialState,
    name: 'user_info',
    reducers: {
        clearUserInfo: state => {
            state.user = null;
        },
        setUserInfo: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const { clearUserInfo, setUserInfo } = userSlice.actions;

const persistConfig = {
    key: 'user_info',
    storage,
};

export const persistedUserReducer = persistReducer(
    persistConfig,
    userSlice.reducer
);
