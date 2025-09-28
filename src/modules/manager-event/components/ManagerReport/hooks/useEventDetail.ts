import { getCurrentEventId } from '@share/utils/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import useFetchEventDetail from '@modules/manager-event/hooks/useFetchEventDetail';

const useEventDetail = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    const eventId = getCurrentEventId(pathname);

    const { eventDetail, loading } = useFetchEventDetail(eventId || '');

    const handleBack = () => {
        navigate(SCREEN_PATH.MANAGER_EVENT);
    };

    return {
        eventDetail,
        handleBack,
        loading,
    };
};

export default useEventDetail;
