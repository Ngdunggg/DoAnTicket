import { eventApi } from '@share/api/eventApi';
import { useQuery } from '@tanstack/react-query';

const useGetEventReport = (eventId: string) => {
    return useQuery({
        enabled: !!eventId,
        queryFn: async () => {
            const response = await eventApi.getEventReport(eventId);
            return response.data;
        },
        queryKey: ['event-report', eventId],
    });
};

export default useGetEventReport;
