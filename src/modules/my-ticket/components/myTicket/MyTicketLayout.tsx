import ToolBarLeft from '../ToolBarLeft';
import MyTicketRight from './MyTicketRight';
import ProfileForm from '../profile/ProfileForm';
import { useLocation } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import SuggestEvent from '../../../../share/components/organisms/SuggestEvent/SuggestEvent';
import useDetectMobile from '@share/hooks/useDetectMobile';

const MyTicketLayout = () => {
    const isMobile = useDetectMobile();
    const location = useLocation();
    const isProfilePage = location.pathname === SCREEN_PATH.MY_TICKET_PROFILE;

    return (
        <div className="flex flex-col flex-1 min-h-screen bg-bg-black-2 py-14">
            <div
                className={`flex flex-1 ${isMobile ? 'flex-col' : 'flex-row'}`}
            >
                {/* Header */}
                <ToolBarLeft />
                {isProfilePage ? <ProfileForm /> : <MyTicketRight />}
            </div>
            <div className="px-10">
                <SuggestEvent />
            </div>
        </div>
    );
};

export default MyTicketLayout;
