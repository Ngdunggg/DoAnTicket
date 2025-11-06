import { eventApi } from '@share/api/eventApi';
import { useQuery } from '@tanstack/react-query';

const useFetchEventListQuery = (enabled?: boolean) => {
    return useQuery({
        enabled: enabled ?? true,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await eventApi.getEvents();
            return response.data;
        },
        queryKey: ['home-event-list'],
        staleTime: 5 * 60 * 1000,
    });
};

export default useFetchEventListQuery;
