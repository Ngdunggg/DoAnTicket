import { getCurrentEventId } from '@share/utils/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import useEventListStoreSelector from '../../EventList/hooks/useEventListStoreSelector';
import useGetOrganizerProfile from '@modules/event-detail/components/DetailEvent/hooks/useGetOrganizerProfile';

const useEventDetail = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const eventId = getCurrentEventId(pathname);
    const { allEventsByOrganizer } = useEventListStoreSelector();
    const { data: organizerProfile } = useGetOrganizerProfile(
        allEventsByOrganizer.find(event => event.id === eventId)?.organizer_id
    );

    const eventDetail = allEventsByOrganizer.find(
        event => event.id === eventId
    );
    
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
