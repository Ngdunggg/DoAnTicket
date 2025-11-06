import { getCurrentEventId } from '@share/utils/path';
import useGetDetailEvent from './useGetDetailEvent';
import useGetOrganizerProfile from './useGetOrganizerProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import useEventDetailStoreAction from '@modules/event-detail/hooks/useEventDetailStoreAction';
import { useEffect } from 'react';

const useDetailEventHandler = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const eventId = getCurrentEventId(pathname);
    const navigate = useNavigate();
    const { setEventDetailStore } = useEventDetailStoreAction();

    const { data: eventDetail, isLoading: eventLoading } = useGetDetailEvent(
        eventId || ''
    );

    useEffect(() => {
        if (eventDetail) {
            setEventDetailStore(eventDetail);
        }
    }, [eventDetail]);

    const { data: organizerProfile, isLoading: organizerLoading } =
        useGetOrganizerProfile(eventDetail?.organizer_id);

    const handlePickTicket = (eventId: string) => {
        navigate(
            SCREEN_PATH.EVENT_TICKET_SELECTION.replace(':event_id', eventId)
        );
    };

    return {
        eventDetail,
        handlePickTicket,
        loading: eventLoading || organizerLoading,
        organizerProfile,
    };
};

export default useDetailEventHandler;
