import ToolBarLeft from './ToolBarLeft';
import MyTicketRight from './MyTicketRight';
import ProfileForm from './ProfileForm';
import { useLocation } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

const MyTicketLayout = () => {
    const location = useLocation();
    const isProfilePage = location.pathname === SCREEN_PATH.MY_TICKET_PROFILE;

    return (
        <div className="min-h-screen bg-bg-black-2 py-14 flex flex-1">
            {/* Header */}
            <ToolBarLeft />
            {isProfilePage ? <ProfileForm /> : <MyTicketRight />}
        </div>
    );
};

export default MyTicketLayout;
