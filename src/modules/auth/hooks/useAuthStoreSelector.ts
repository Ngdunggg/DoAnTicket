import { useAppSelector } from '@configs/store';

const useAuthStoreSelector = () => {
    return {
        emailVerify: useAppSelector(state => state.login_signup.email_verify),
        isAuthPopupOpen: useAppSelector(
            state => state.login_signup.is_auth_popup_open
        ),
        isChangePassword: useAppSelector(
            state => state.login_signup.is_change_password
        ),
        isForgetPasswordPopupOpen: useAppSelector(
            state => state.login_signup.is_forget_password_popup_open
        ),
        isLogin: useAppSelector(state => state.login_signup.is_login),
        isVerifyOtpPopupOpen: useAppSelector(
            state => state.login_signup.is_verify_otp_popup_open
        ),
    };
};

export default useAuthStoreSelector;
