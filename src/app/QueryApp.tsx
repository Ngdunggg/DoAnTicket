import queryConfig from '@configs/query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useEffect } from 'react';
import UserInfoSync from '@share/auth/components/UserInfoSync';
import { isTokenExpired, handleTokenExpired } from '@configs/axiosConfig';
import { useAppSelector } from '@configs/store';

const queryAppClient = new QueryClient(queryConfig);

/**
 * Component to check token expiration on app load
 */
const TokenExpirationChecker = () => {
    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
        // Check token from localStorage on app load
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            // Check if token is expired
            if (isTokenExpired(storedToken)) {
                // Token expired, clear it
                handleTokenExpired();
            }
        } else if (token) {
            // If Redux has token but localStorage doesn't, check Redux token
            if (isTokenExpired(token)) {
                handleTokenExpired();
            }
        }
    }, []); // Only run once on mount

    return null;
};

export default function QueryApp({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <QueryClientProvider client={queryAppClient}>
            <TokenExpirationChecker />
            <UserInfoSync />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
