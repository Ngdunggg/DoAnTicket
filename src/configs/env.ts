export const envConfig = {
    apiBaseUrl: process.env.VITE_APP_API_BASE_URL ?? '',
    env: process.env.VITE_APP_ENV,
    isBrowserMode: process.env.VITE_APP_ROUTER_MODE == 'browser',
    tinyMceApiKey: process.env.VITE_APP_TINYMCE_API_KEY,
};

export default envConfig;
