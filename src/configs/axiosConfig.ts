import axios, {
    type AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    AxiosHeaders,
} from 'axios';
import envConfig from './env';

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

        // Add token from localStorage if available
        const token = localStorage.getItem('token');
        if (token) {
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
        // Handle 401 errors
        // if (error.response?.status === 401) {
        //     // Clear token and redirect to login
        //     localStorage.removeItem('token');
        //     window.location.href = '/login';
        // }

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
