import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';

const useSuggetSearchHandler = () => {
    const navigate = useNavigate();

    const handleClickEvent = (eventId: string) => {
        navigate(SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId));
    };

    const handleMoreEvent = () => {
        navigate(SCREEN_PATH.EVENT_LIST);
    };

    return {
        handleClickEvent,
        handleMoreEvent,
    };
};

export default useSuggetSearchHandler;
