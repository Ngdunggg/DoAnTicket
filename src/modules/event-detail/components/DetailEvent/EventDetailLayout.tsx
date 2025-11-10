import EventHero from './EventHero';
import EventDescription from './EventDescription';
import TicketSection from './TicketSection';
import useDetailEventHandler from './hooks/useDetailEventHandler';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrganizerSection from './OrganizerSection';
import SuggestEvent from '@share/components/organisms/SuggestEvent/SuggestEvent';
import { isEventFinished } from '../../utils/eventUtils';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';

const EventDetailLayout = () => {
    const { eventDetail, handlePickTicket, loading, organizerProfile } =
        useDetailEventHandler();
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

    const eventEnded = isEventFinished(eventDetail);

    return (
        <div className="flex flex-col flex-1 gap-14 bg-gray-200 relative">
            {/* Event Ended Overlay Banner */}
            {eventEnded && (
                <div className="fixed top-24 left-0 right-0 z-50 bg-black/70 flex items-center justify-center py-6 px-6">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        className="text-center"
                    >
                        Sự kiện đã kết thúc
                    </Text>
                </div>
            )}

            {/* Hero Section */}
            <EventHero event={eventDetail} onBookNow={handlePickTicket} />

            {/* Description Section */}
            <EventDescription eventDetail={eventDetail} />

            {/* Ticket Section */}
            <TicketSection
                event={eventDetail}
                onBuyTickets={handlePickTicket}
            />

            {/* Organizer Section */}
            <OrganizerSection
                organizerProfile={organizerProfile?.organizer_profile || null}
            />

            <div className="px-6 bg-bg-black-2 mt-4 pb-10">
                <SuggestEvent />
            </div>
        </div>
    );
};

export default EventDetailLayout;
