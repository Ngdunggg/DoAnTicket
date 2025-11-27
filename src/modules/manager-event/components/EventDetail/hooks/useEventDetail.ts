import { getCurrentEventId } from '@share/utils/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import useEventListStoreSelector from '../../EventList/hooks/useEventListStoreSelector';
import useGetOrganizerProfile from '@modules/event-detail/components/DetailEvent/hooks/useGetOrganizerProfile';
import { useEffect, useState } from 'react';
import useGetDetailEvent from '@modules/event-detail/components/DetailEvent/hooks/useGetDetailEvent';
import { Event } from '@share/types/event';

const useEventDetail = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();
    const eventId = getCurrentEventId(pathname);

    const [eventDetail, setEventDetail] = useState<Event | null>(null);
    const { allEventsByOrganizer } = useEventListStoreSelector();

    const { data: eventDetailResponse } = useGetDetailEvent(
        eventId && allEventsByOrganizer.length <= 0 ? eventId : undefined
    );

    const { data: organizerProfile } = useGetOrganizerProfile(
        eventDetail?.organizer_id
    );

    useEffect(() => {
        if (!eventId) return;

        if (allEventsByOrganizer.length <= 0) {
            if (eventDetailResponse) {
                setEventDetail(eventDetailResponse);
            }
        } else {
            setEventDetail(
                allEventsByOrganizer.find(event => event.id === eventId) || null
            );
        }
    }, [allEventsByOrganizer, eventId, eventDetailResponse]);

    const handleBack = () => {
        navigate(SCREEN_PATH.MANAGER_EVENT);
    };

    return {
        eventDetail,
        handleBack,
        organizerProfile,
    };
};

export default useEventDetail;
