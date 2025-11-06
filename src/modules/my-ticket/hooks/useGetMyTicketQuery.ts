import { useQuery } from '@tanstack/react-query';
import { myTicketApi } from '@share/api/myTicketApi';
import { useAppSelector } from '@configs/store';

const useGetMyTicketQuery = () => {
    const userInfo = useAppSelector(state => state.user.user);
    return useQuery({
        enabled: !!userInfo?.id,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await myTicketApi.getMyTickets();
            return response.data;
        },
        queryKey: ['my-tickets', userInfo?.id],
        staleTime: 5 * 60 * 1000,
    });
};

export default useGetMyTicketQuery;
