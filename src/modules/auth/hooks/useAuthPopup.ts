import { useAppSelector } from '@configs/store';
import { SCREEN_PATH } from '@share/constants/routers';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStoreSelector from './useAuthStoreSelector';
import useAuthStoreAction from './useAuthStoreAction';
import { AUTH_MODE } from '@share/constants/commons';
import useAuthFormLogin from './useAuthFormLogin';

export const useAuthPopup = () => {
    const { resetAuthStateStore, setIsAuthPopupOpenStore, setIsLoginStore } =
        useAuthStoreAction();
    const { isAuthPopupOpen, isLogin } = useAuthStoreSelector();
    // Lấy thông tin user và token từ Redux store
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const currentMode = isLogin ? AUTH_MODE.LOGIN : AUTH_MODE.REGISTER;
    const { authForm, schemaCreateAccount } = useAuthFormLogin(
        undefined,
        currentMode
    );

    const openAuthPopup = useCallback(() => {
        setIsAuthPopupOpenStore(true);
    }, []);

    const closeAuthPopup = useCallback(() => {
        resetAuthStateStore();
        authForm.reset();

        console.log('closeAuthPopup', token, user, pathname);

        // Kiểm tra xem có đang ở trang home hoặc trang event detail không
        const isHomePage = pathname === SCREEN_PATH.HOME;
        const isEventDetailPage = pathname.startsWith('/event-detail');

        if (isHomePage || isEventDetailPage) {
            setIsAuthPopupOpenStore(false);
            return;
        } else {
            setIsAuthPopupOpenStore(false);
            navigate(SCREEN_PATH.HOME);
        }

        if (
            isNotNullOrUndefinedOrBlank(token) &&
            isNotNullOrUndefinedOrBlank(user)
        ) {
            navigate(pathname);
        } else {
            navigate(SCREEN_PATH.HOME);
            return;
        }

        setIsAuthPopupOpenStore(false);
    }, [
        token,
        user,
        pathname,
        navigate,
        resetAuthStateStore,
        authForm,
        setIsAuthPopupOpenStore,
    ]);

    return {
        authForm,
        closeAuthPopup,
        isAuthPopupOpen,
        isLogin,
        openAuthPopup,
        schemaCreateAccount,
        setIsAuthPopupOpenStore,
        setIsLoginStore,
    };
};
