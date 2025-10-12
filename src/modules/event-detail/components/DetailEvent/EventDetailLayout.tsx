import EventHero from './EventHero';
import EventDescription from './EventDescription';
import TicketSection from './TicketSection';
import useDetailEventHandler from './hooks/useDetailEventHandler';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrganizerSection from './OrganizerSection';

const EventDetailLayout = () => {
    const { eventDetail, loading, organizerProfile } = useDetailEventHandler();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!eventDetail) {
        navigate(SCREEN_PATH.HOME);
        toast.error('Sự kiện không tồn tại');
        return null;
    }

    return (
        <div className="flex flex-col flex-1 gap-10 pb-10    bg-gray-200">
            {/* Hero Section */}
            <EventHero event={eventDetail} onBookNow={() => {}} />

            {/* Description Section */}
            <EventDescription eventDetail={eventDetail} />

            {/* Ticket Section */}
            <TicketSection event={eventDetail} onBuyTickets={() => {}} />

            {/* Organizer Section */}
            <OrganizerSection organizerProfile={organizerProfile || null} />
        </div>
    );
};

export default EventDetailLayout;
