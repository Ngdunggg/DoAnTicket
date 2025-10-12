import { getCurrentEventId } from '@share/utils/path';
import useGetDetailEvent from './useGetDetailEvent';
import useGetOrganizerProfile from './useGetOrganizerProfile';
import { useLocation } from 'react-router-dom';

const useDetailEventHandler = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const eventId = getCurrentEventId(pathname);

    const { data: eventDetail, isLoading: eventLoading } = useGetDetailEvent(
        eventId || ''
    );

    const { data: organizerProfile, isLoading: organizerLoading } =
        useGetOrganizerProfile(eventDetail?.organizer_id);

    return {
        eventDetail,
        loading: eventLoading || organizerLoading,
        organizerProfile,
    };
};

export default useDetailEventHandler;
