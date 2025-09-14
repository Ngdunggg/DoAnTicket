import { setToken } from '@share/auth/stores/authSlice';
import { setUserInfo } from '@share/auth/stores/userSlice';
import { AppDispatch } from '@configs/store';
import { RegisterInput } from '@share/schemas/auth/login';

/**
 * Mock data và functions cho authentication
 * TODO: Thay thế bằng API calls thật khi backend sẵn sàng
 */

export interface LoginData {
    email: string;
    password: string;
}

export interface MockUser {
    avatar?: string;
    email: string;
    full_name: string;
    id: string;
}

export interface MockAuthResponse {
    token: string;
    user: MockUser;
}

/**
 * Mock function cho đăng nhập
 */
export const mockLogin = async (data: LoginData): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (data.email === 'test@example.com' && data.password === 'password123') {
        return {
            token: 'mock-login-token-123',
            user: {
                avatar: 'https://static.ticketbox.vn/avatar.png',
                email: data.email,
                full_name: data.email.split('@')[0],
                id: 'user-123',
            },
        };
    }

    // Mock error
    throw new Error('Email hoặc mật khẩu không đúng');
};

/**
 * Mock function cho đăng ký
 */
export const mockRegister = async (
    data: RegisterInput
): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (data.email && data.name && data.password && data.phone) {
        return {
            token: 'mock-register-token-456',
            user: {
                avatar: 'https://static.ticketbox.vn/avatar.png',
                email: data.email,
                full_name: data.name,
                id: 'user-456',
            },
        };
    }

    // Mock error
    throw new Error('Thông tin đăng ký không hợp lệ');
};

/**
 * Mock function cho Google login
 */
export const mockGoogleLogin = async (): Promise<MockAuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        token: 'mock-google-token-789',
        user: {
            avatar: 'https://static.ticketbox.vn/avatar.png',
            email: 'user@gmail.com',
            full_name: 'Google User',
            id: 'google-user-789',
        },
    };
};

/**
 * Helper function để dispatch auth data
 */
export const dispatchAuthData = (
    dispatch: AppDispatch,
    response: MockAuthResponse
) => {
    dispatch(setToken(response.token));
    dispatch(setUserInfo(response.user));
};
