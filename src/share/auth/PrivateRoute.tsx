import { useAppDispatch, useAppSelector } from '@configs/store';
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthPopup from '@modules/auth/components/AuthPopup';
import { useAuthPopup } from '@modules/auth/components/hooks/useAuthPopup';
import { SCREEN_PATH } from '@share/constants/routers';
import { setLoggingOut } from '@share/auth/stores/authSlice';
import VerifyOtpPopup from '@modules/auth/components/VerifyOtpPopup';
import ForgetPassword from '@modules/auth/components/ForgetPassword';

type PrivateRouteProps = {
    children: ReactNode;
};

/**
 * PrivateRoute component.
 *
 * Renders the children components only if a token is present in the application state.
 * Otherwise, redirects to home and shows the auth popup.
 *
 * @param children - The components to be rendered if a token is present.
 * @returns The rendered children components if a token is present, otherwise redirects to home with auth popup.
 */
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggingOut, token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    const { openAuthPopup } = useAuthPopup();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token || !user) {
            // Nếu đang trong quá trình logout, không hiện popup
            if (isLoggingOut) {
                // Reset logout flag khi đã về HOME
                if (location.pathname === SCREEN_PATH.HOME) {
                    dispatch(setLoggingOut(false));
                }
                return;
            }

            // Lưu URL hiện tại để có thể quay lại sau khi đăng nhập
            const currentPath = location.pathname + location.search;

            // Chuyển hướng về home
            navigate(SCREEN_PATH.HOME, {
                replace: true,
                state: {
                    from: currentPath,
                    showAuthPopup: true,
                },
            });

            // Hiện popup đăng nhập
            openAuthPopup();
        }
    }, [
        token,
        user,
        navigate,
        location,
        openAuthPopup,
        isLoggingOut,
        dispatch,
    ]);

    // Nếu chưa có token hoặc user, không render children
    if (!token || !user) {
        // Nếu đang trong quá trình logout, không hiện AuthPopup
        if (isLoggingOut) {
            return null;
        }

        return (
            <>
                <AuthPopup />
                <VerifyOtpPopup />
                <ForgetPassword />
            </>
        );
    }

    return (
        <>
            {children}
            <AuthPopup />
            <VerifyOtpPopup />
            <ForgetPassword />
        </>
    );
};

export default PrivateRoute;
