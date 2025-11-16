import axios, {
    type AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    AxiosHeaders,
} from 'axios';
import envConfig from './env';
import { clearToken, setLoggingOut } from '@share/auth/stores/authSlice';
import { clearUserInfo } from '@share/auth/stores/userSlice';
import { SCREEN_PATH } from '@share/constants/routers';
import { store } from '../configs/store';

/**
 * Decode JWT token and check if it's expired
 * @param token - JWT token string
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        // JWT format: header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            return true; // Invalid token format
        }

        // Decode payload (base64url)
        const payload = parts[1];
        const decodedPayload = JSON.parse(
            atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        );

        // Check if exp (expiration time) exists and is expired
        if (decodedPayload.exp) {
            const expirationTime = decodedPayload.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();
            // Add 5 seconds buffer to account for clock skew
            return currentTime >= expirationTime - 5000;
        }

        // If no exp field, consider it expired for safety
        return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // If can't decode, consider expired
    }
};

/**
 * Handle logout when token is expired
 */
export const handleTokenExpired = () => {
    // Set logout flag
    store.dispatch(setLoggingOut(true));

    // Clear Redux store
    store.dispatch(clearToken());
    store.dispatch(clearUserInfo());

    // Clear localStorage
    localStorage.removeItem('token');

    // Navigate to home
    window.location.href = SCREEN_PATH.HOME;
};

// Extend the request config type to include additional properties
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _skipErrorMessage?: boolean;
    screen_path?: string;
}

/**
 * Setup axios interceptors for regular API calls
 */
const setupAxiosInterceptors = () => {
    /**
     * Handles request success.
     * @param config - The request config
     * @returns The request config
     */
    const onRequestSuccess = async (
        config: ExtendedAxiosRequestConfig
    ): Promise<ExtendedAxiosRequestConfig> => {
        config.headers = config.headers ?? new AxiosHeaders();

        // Set base URL for all API calls
        if (!config.baseURL) {
            config.baseURL = envConfig.apiBaseUrl;
        }

        // Ensure cookies are sent to backend (JWT in cookies per backend strategy)
        config.withCredentials = true;

        // Check token expiration before making request
        const token = localStorage.getItem('token');
        if (token) {
            // Check if token is expired
            if (isTokenExpired(token)) {
                // Token expired, logout user
                handleTokenExpired();
                // Reject the request
                return Promise.reject(
                    new Error('Token expired. Please login again.')
                );
            }
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add screen path for error handling
        config.screen_path = window.location.pathname;

        return config;
    };

    /**
     * Handles response success.
     * @param response - The response
     * @returns The response
     */
    const onResponseSuccess = async (response: AxiosResponse) => {
        return Promise.resolve(response);
    };

    /**
     * Handles response error.
     * @param error - The error
     * @returns The error
     */
    const onResponseError = async (error: AxiosError) => {
        // Handle 401 errors (Unauthorized - token invalid or expired)
        if (error.response?.status === 401) {
            // Clear token and logout
            handleTokenExpired();
            return Promise.reject(error);
        }

        // Handle network errors
        if (
            error.code === 'ECONNABORTED' ||
            error.code === 'ERR_NETWORK' ||
            error.code === 'ERR_CONNECTION_ABORTED' ||
            error.code === 'ERR_CONNECTION_TIMED_OUT' ||
            error.code === 'ERR_INTERNET_DISCONNECTED' ||
            (typeof error.message === 'string' &&
                error.message.toLowerCase().includes('network')) ||
            error.message.includes('timeout')
        ) {
            console.error('Network error:', error.message);
        }

        return Promise.reject(error);
    };

    // Apply interceptors to the default axios instance
    axios.interceptors.request.use(
        onRequestSuccess as (
            _config: InternalAxiosRequestConfig
        ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
    );
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
