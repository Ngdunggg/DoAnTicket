import useEventListStoreAction from '../components/EventList/hooks/useEventListStoreAction';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@configs/store';
import { organizerApi } from '@share/api/organizerApi';
import { RESULT_CODE } from '@share/constants/commons';

const useFetchEventList = () => {
    const { setAllEventsByOrganizerStore } = useEventListStoreAction();
    const userInfo = useAppSelector(state => state.user.user);

    const { data, refetch } = useQuery({
        enabled: !!userInfo?.id,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await organizerApi.getEventByOrganizerId(
                userInfo?.id || ''
            );
            if (response.result.code === RESULT_CODE.SUCCESS) {
                return response.data;
            }
            return [];
        },
        queryKey: ['events-by-organizer-id', userInfo?.id],
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setAllEventsByOrganizerStore(data);
        }
    }, [data, setAllEventsByOrganizerStore]);

    return { refetch };
};

export default useFetchEventList;
