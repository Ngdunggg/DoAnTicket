export const envConfig = {
    apiBaseUrl: process.env.VITE_APP_API_BASE_URL ?? '',
    env: process.env.VITE_APP_ENV,
    isBrowserMode: process.env.VITE_APP_ROUTER_MODE == 'browser',
};

export default envConfig;
