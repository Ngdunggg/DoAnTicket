import { useQuery } from '@tanstack/react-query';
import { eventApi } from '@share/api/eventApi';

const useGetDetailEvent = (eventId: string) => {
    return useQuery({
        enabled: !!eventId,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await eventApi.getEventDetail(eventId || '');
            return response.data;
        },
        queryKey: ['event-detail', eventId],
        staleTime: 5 * 60 * 1000,
    });
};

export default useGetDetailEvent;
