import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@configs/store';
import { setToken } from '@share/auth/stores/authSlice';
import { setUserInfo } from '@share/auth/stores/userSlice';
import { SCREEN_PATH } from '@share/constants/routers';
import { toast } from 'react-toastify';

/**
 * Auth callback page for handling Google OAuth redirect
 */
const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleAuthCallback = () => {
            try {
                // Get token and user from URL parameters
                const token = searchParams.get('token');
                const userParam = searchParams.get('user');

                if (!token || !userParam) {
                    console.error('Missing token or user data in callback');
                    toast.error(
                        'Đăng nhập thất bại - thiếu thông tin xác thực'
                    );
                    navigate(SCREEN_PATH.HOME);
                    return;
                }

                // Decode user data
                const user = JSON.parse(decodeURIComponent(userParam));

                // Set token and user in Redux store
                dispatch(setToken(token));
                dispatch(setUserInfo(user));

                // Save token to localStorage for persistence
                localStorage.setItem('token', token);

                // Show success message
                toast.success('Đăng nhập Google thành công!');

                // Redirect to home page
                navigate(SCREEN_PATH.HOME, { replace: true });
            } catch (error) {
                console.error('Error processing auth callback:', error);
                toast.error('Đăng nhập thất bại - lỗi xử lý dữ liệu');
                navigate(SCREEN_PATH.HOME);
            }
        };

        handleAuthCallback();
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
};

export default AuthCallback;
