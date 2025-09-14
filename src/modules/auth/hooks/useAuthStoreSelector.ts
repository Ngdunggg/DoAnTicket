import { useAppSelector } from '@configs/store';

const useAuthStoreSelector = () => {
    return {
        isAuthPopupOpen: useAppSelector(
            state => state.login_signup.is_auth_popup_open
        ),
        isLogin: useAppSelector(state => state.login_signup.is_login),
    };
};

export default useAuthStoreSelector;
