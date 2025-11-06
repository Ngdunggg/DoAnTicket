/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@configs/store';
import { SCREEN_PATH } from '@share/constants/routers';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStoreSelector from '../../hooks/useAuthStoreSelector';
import useAuthStoreAction from '../../hooks/useAuthStoreAction';
import { AUTH_MODE, RESULT_CODE, ROLE } from '@share/constants/commons';
import useAuthFormLogin from './useAuthFormLogin';
import useLoginMutation from '../../hooks/useLoginMutation';
import { LoginRequest, LoginResponse } from '@share/models/auth/login';
import { toast } from 'react-toastify';
import { setPreviousPopup, setToken } from '@share/auth/stores/authSlice';
import { setUserInfo } from '@share/auth/stores/userSlice';
import {
    CreateAccountRequest,
    CreateAccountResponse,
} from '@share/models/auth/createAccount';
import useRegisterMutation from '../../hooks/useRegisterMutation';
import { AxiosError } from 'axios';

export const useAuthPopup = () => {
    const {
        resetAuthStateStore,
        setEmailVerifyStore,
        setIsAdminStore,
        setIsAuthPopupOpenStore,
        setIsForgetPasswordPopupOpenStore,
        setIsLoginStore,
        setIsVerifyOtpPopupOpenStore,
    } = useAuthStoreAction();
    const [isLoading, setIsLoading] = useState(false);
    const { isAdmin, isAuthPopupOpen, isLogin } = useAuthStoreSelector();
    // Lấy thông tin user và token từ Redux store
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        setEmailVerifyStore(authForm.getValues('email'));
    }, [authForm.getValues('email')]);

    const openAuthPopup = useCallback(() => {
        setIsAuthPopupOpenStore(true);
    }, []);

    const closeAuthPopup = useCallback(() => {
        resetAuthStateStore();
        authForm.reset();

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

    // Login
    const handleLoginError = (_error: AxiosError) => {
        toast.error(
            (_error.response?.data as any)?.result?.error_msg_id ||
                'Đăng nhập thất bại'
        );
        setIsLoading(false);
        authForm.reset();
    };

    const handleApiLoginSuccess = (data?: LoginResponse) => {
        if (data?.result.code !== RESULT_CODE.SUCCESS) {
            toast(data?.result.error_msg_id || 'Đăng nhập thất bại');
            authForm.reset();
            return;
        }

        // Đăng nhập thành công
        authForm.reset();
        setIsLoading(false);
        // Lưu token vào Redux store
        dispatch(setToken(data.data.token));
        // Lưu token vào localStorage để axios interceptor tự gán Authorization
        localStorage.setItem('token', data.data.token);
        console.log(data.data.token);
        // Chuẩn hóa user từ LoginUser -> User
        const loginUser = data.data.user;
        console.log(loginUser);
        const normalizedUser = {
            address: loginUser.address ?? null,
            avatar_url: loginUser.avatar_url ?? null,
            created_at: '',
            date_of_birth: loginUser.date_of_birth ?? '',
            email: loginUser.email,
            full_name: loginUser.full_name,
            gender: loginUser.gender ?? null,
            google_id: loginUser.google_id ?? null,
            id: loginUser.id,
            phone: loginUser.phone ?? '',
            role: loginUser.role,
            status: loginUser.status,
        };
        dispatch(setUserInfo(normalizedUser));

        toast.success('Đăng nhập thành công');

        if (normalizedUser.role === ROLE.ADMIN && !isAdmin) {
            setIsAdminStore(true);
            return;
        }
        closeAuthPopup();
    };

    const loginMutation = useLoginMutation({
        onError: handleLoginError,
        onSuccess: handleApiLoginSuccess,
    });

    const handleLogin = (data: LoginRequest) => {
        setIsLoading(true);
        loginMutation.mutate(data);
    };
    // End Login

    // Register
    const handleRegisterError = (_error: AxiosError) => {
        const errorMessage =
            (_error?.response?.data as any)?.result?.error_msg_id ||
            'Đăng ký thất bại';
        toast.error(errorMessage);
        setIsLoading(false);
        authForm.reset();
    };

    const handleApiRegisterSuccess = (data?: CreateAccountResponse) => {
        console.log('data', data);
        if (data?.result.code !== RESULT_CODE.SUCCESS) {
            console.log('data', data);
            toast.error(data?.result.error_msg_id || 'Đăng ký thất bại');
            return;
        }
        setIsLoading(false);
        // Set previous popup để biết quay lại từ đâu
        dispatch(setPreviousPopup('auth'));
        setIsVerifyOtpPopupOpenStore(true);
        setIsAuthPopupOpenStore(false);
    };

    const registerMutation = useRegisterMutation({
        onError: handleRegisterError,
        onSuccess: handleApiRegisterSuccess,
    });

    const handleRegister = (data: CreateAccountRequest) => {
        setIsLoading(true);
        registerMutation.mutate({
            email: data.email,
            full_name: data.full_name,
            password: data.password,
            phone: data.phone,
        });
    };
    // End Register

    // Google Login
    const handleLoginWithGoogle = () => {
        // Redirect trực tiếp đến Google OAuth endpoint
        // Google sẽ redirect về frontend callback page
        window.location.href = `${process.env.VITE_APP_API_BASE_URL}auth/google`;
    };

    const handleNavigateToAdmin = () => {
        if (isAdmin) {
            navigate(SCREEN_PATH.ADMIN_DASHBOARD);
        }
    };

    return {
        authForm,
        closeAuthPopup,
        handleLogin,
        handleLoginWithGoogle,
        handleNavigateToAdmin,
        handleRegister,
        isAdmin,
        isAuthPopupOpen,
        isLoading,
        isLogin,
        openAuthPopup,
        schemaCreateAccount,
        setIsAuthPopupOpenStore,
        setIsForgetPasswordPopupOpenStore,
        setIsLoginStore,
    };
};
