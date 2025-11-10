import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { setUserInfo, clearUserInfo } from '@share/auth/stores/userSlice';
import { User } from '@share/models/auth/user';
import useGetUserInfoQuery from '@share/auth/hooks/useGetUserInfoQuery';

/**
 * Component to automatically sync user info when app loads
 * Fetches fresh user info from API if user is authenticated
 * This runs independently of login flow - login sets user info immediately,
 * while this syncs periodically to ensure data is up-to-date
 */
const UserInfoSync = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const { data: userInfo, isError, isSuccess } = useGetUserInfoQuery();
    const lastSyncTimeRef = useRef<number>(0);

    useEffect(() => {
        // Only sync if query is successful and we have data
        if (token && isSuccess && userInfo) {
            // Avoid immediate sync after login (give login flow 2 seconds to complete)
            const now = Date.now();
            const timeSinceLastSync = now - lastSyncTimeRef.current;

            // Sync if it's been more than 2 seconds since last sync (to avoid conflict with login)
            // or if this is the first sync after app load
            if (timeSinceLastSync > 2000 || lastSyncTimeRef.current === 0) {
                const normalizedUser: User = {
                    address: userInfo.address ?? null,
                    avatar_url: userInfo.avatar_url ?? null,
                    created_at: userInfo.created_at,
                    date_of_birth: userInfo.date_of_birth,
                    email: userInfo.email,
                    full_name: userInfo.full_name,
                    gender: userInfo.gender ?? null,
                    google_id: userInfo.google_id ?? null,
                    id: userInfo.id,
                    phone: userInfo.phone,
                    role: userInfo.role,
                    status: userInfo.status,
                };
                dispatch(setUserInfo(normalizedUser));
                lastSyncTimeRef.current = now;
            }
        } else if (token && isError) {
            // If token exists but API call fails, clear user info
            dispatch(clearUserInfo());
            lastSyncTimeRef.current = 0;
        }
    }, [token, userInfo, isError, isSuccess, dispatch]);

    return null;
};

export default UserInfoSync;
