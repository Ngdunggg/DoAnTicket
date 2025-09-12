import { useAppSelector } from '@configs/store';
import { SCREEN_PATH } from '@share/constants/routers';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuthPopup = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const { token } = useAppSelector(state => state.auth);
    // Lấy thông tin user và token từ Redux store
    const { user } = useAppSelector(state => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const openAuthPopup = useCallback(() => {
        setIsAuthPopupOpen(true);
    }, []);

    const closeAuthPopup = useCallback(() => {
        if (pathname === SCREEN_PATH.HOME) {
            setIsAuthPopupOpen(false);
            return;
        }

        console.log('closeAuthPopup', token, user, pathname);
        if (
            !isNotNullOrUndefinedOrBlank(token) &&
            !isNotNullOrUndefinedOrBlank(user)
        ) {
            navigate(pathname);
        }
        setIsAuthPopupOpen(false);
    }, [token, user, pathname]);

    return {
        closeAuthPopup,
        isAuthPopupOpen,
        openAuthPopup,
    };
};
