import { userApi } from '@share/api/userApi';
import { useQuery } from '@tanstack/react-query';

const useFetchUserListQuery = () => {
    return useQuery({
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await userApi.getAllUsers();
            return response.data;
        },
        queryKey: ['user-list'],
        staleTime: 5 * 60 * 1000,
    });
};

export default useFetchUserListQuery;
