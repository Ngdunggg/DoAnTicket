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
    allowedRoles?: string[];
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
export const PrivateRoute = ({ allowedRoles, children }: PrivateRouteProps) => {
    const { isLoggingOut, token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    const { openAuthPopup } = useAuthPopup();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token || !user) {
            // Nếu đang ở HOME và đang trong quá trình logout, chỉ reset flag
            if (location.pathname === SCREEN_PATH.HOME && isLoggingOut) {
                dispatch(setLoggingOut(false));
                return;
            }

            // Nếu đang ở URL private (không phải HOME), LUÔN navigate về HOME
            // Không check isLoggingOut ở đây để tránh màn hình trắng
            if (location.pathname !== SCREEN_PATH.HOME) {
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

                // Chỉ hiện popup nếu không phải đang logout
                if (!isLoggingOut) {
                    openAuthPopup();
                }
            } else {
                // Nếu đã ở HOME, chỉ hiện popup nếu có flag showAuthPopup và không phải logout
                const navState = (location.state || {}) as { showAuthPopup?: boolean };
                if (navState.showAuthPopup && !isLoggingOut) {
                    openAuthPopup();
                }
            }
        }
    }, [
        dispatch,
        isLoggingOut,
        location,
        navigate,
        openAuthPopup,
        token,
        user,
    ]);

    // Check role change and redirect if needed
    useEffect(() => {
        if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
            navigate(SCREEN_PATH.HOME, { replace: true });
        }
    }, [allowedRoles, navigate, user]);

    // If no token or user, render auth popups instead of children
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

    // Role-based guard: if allowedRoles provided and current user role not included, redirect to home
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        navigate(SCREEN_PATH.HOME, { replace: true });
        return null;
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
