import { adminApi } from '@share/api/admin';
import { useQuery } from '@tanstack/react-query';

const useGetListDataQuery = () => {
    return useQuery({
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await adminApi.getEventData();
            return response.data;
        },
        queryKey: ['list-data-admin'],
        staleTime: 5 * 60 * 1000,
    });
};

export default useGetListDataQuery;
