import { useAppDispatch } from '@configs/store';
import {
    setEmailVerify,
    setIsAuthPopupOpen,
    setIsForgetPasswordPopupOpen,
    setIsLogin,
    resetAuthState,
    setIsVerifyOtpPopupOpen,
    setIsChangePassword,
} from '../store/authSlice';

const useAuthStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        resetAuthStateStore: () => dispatch(resetAuthState()),
        setEmailVerifyStore: (data: string) => dispatch(setEmailVerify(data)),
        setIsAuthPopupOpenStore: (data: boolean) =>
            dispatch(setIsAuthPopupOpen(data)),
        setIsChangePasswordStore: (data: boolean) =>
            dispatch(setIsChangePassword(data)),
        setIsForgetPasswordPopupOpenStore: (data: boolean) =>
            dispatch(setIsForgetPasswordPopupOpen(data)),
        setIsLoginStore: (data: boolean) => dispatch(setIsLogin(data)),
        setIsVerifyOtpPopupOpenStore: (data: boolean) =>
            dispatch(setIsVerifyOtpPopupOpen(data)),
    };
};

export default useAuthStoreAction;
