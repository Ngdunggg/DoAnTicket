import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    email_verify: string;
    is_admin: boolean;
    is_auth_popup_open: boolean;
    is_change_password: boolean;
    is_forget_password_popup_open: boolean;
    is_login: boolean;
    is_verify_otp_popup_open: boolean;
};

/**
 * Initial state: worksitesList is empty by default.
 */
const initialState: AuthState = {
    email_verify: '',
    is_admin: false,
    is_auth_popup_open: false,
    is_change_password: false,
    is_forget_password_popup_open: false,
    is_login: true,
    is_verify_otp_popup_open: false,
};

const worksitesSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        resetAuthState: () => {
            return initialState;
        },
        setEmailVerify: (state, action: PayloadAction<string>) => {
            state.email_verify = action.payload;
        },
        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.is_admin = action.payload;
        },
        setIsAuthPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.is_auth_popup_open = action.payload;
        },
        setIsChangePassword: (state, action: PayloadAction<boolean>) => {
            state.is_change_password = action.payload;
        },
        setIsForgetPasswordPopupOpen: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.is_forget_password_popup_open = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.is_login = action.payload;
        },
        setIsVerifyOtpPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.is_verify_otp_popup_open = action.payload;
        },
    },
});

// Exports
export const {
    resetAuthState,
    setEmailVerify,
    setIsAdmin,
    setIsAuthPopupOpen,
    setIsChangePassword,
    setIsForgetPasswordPopupOpen,
    setIsLogin,
    setIsVerifyOtpPopupOpen,
} = worksitesSlice.actions;
export default worksitesSlice.reducer;
