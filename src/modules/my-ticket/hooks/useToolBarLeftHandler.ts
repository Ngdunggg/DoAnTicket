import { SCREEN_PATH } from '@share/constants/routers';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@configs/store';

const useToolBarLeftHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isProfilePage = location.pathname === SCREEN_PATH.MY_TICKET_PROFILE;
    const userInfo = useAppSelector(state => state.user.user);

    const handleHomePage = () => {
        navigate(SCREEN_PATH.HOME);
    };

    const handleProfilePage = () => {
        navigate(SCREEN_PATH.MY_TICKET_PROFILE);
    };

    const handleMyTicketPage = () => {
        navigate(SCREEN_PATH.MY_TICKET);
    };

    const handleEventPage = () => {
        navigate(SCREEN_PATH.MANAGER_EVENT);
    };

    return {
        handleEventPage,
        handleHomePage,
        handleMyTicketPage,
        handleProfilePage,
        isProfilePage,
        userInfo,
    };
};

export default useToolBarLeftHandler;
