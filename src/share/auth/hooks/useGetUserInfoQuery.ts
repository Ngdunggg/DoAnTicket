import { useQuery } from '@tanstack/react-query';
import { authApi } from '@share/api/authApi';
import { RESULT_CODE } from '@share/constants/commons';
import { useAppSelector } from '@configs/store';

const useGetUserInfoQuery = () => {
    const token = useAppSelector(state => state.auth.token);
    const currentUser = useAppSelector(state => state.user.user);

    return useQuery({
        enabled: !!token && !!currentUser?.id,
        gcTime: 60 * 60 * 1000,
        queryFn: async () => {
            if (!currentUser?.id) {
                return null;
            }

            const response = await authApi.getUserInfo(currentUser.id);
            if (response.result.code === RESULT_CODE.SUCCESS) {
                return response.data;
            }
            throw new Error(
                response.result.error_msg_id || 'Failed to get user info'
            );
        },
        queryKey: ['user-info', currentUser?.id],
        refetchOnWindowFocus: true,
        staleTime: 0,
    });
};

export default useGetUserInfoQuery;
