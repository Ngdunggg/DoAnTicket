import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    is_auth_popup_open: boolean;
    is_login: boolean;
};

/**
 * Initial state: worksitesList is empty by default.
 */
const initialState: AuthState = {
    is_auth_popup_open: false,
    is_login: true,
};

const worksitesSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        resetAuthState: () => {
            return initialState;
        },
        setIsAuthPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.is_auth_popup_open = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.is_login = action.payload;
        },
    },
});

// Exports
export const { resetAuthState, setIsAuthPopupOpen, setIsLogin } =
    worksitesSlice.actions;
export default worksitesSlice.reducer;
