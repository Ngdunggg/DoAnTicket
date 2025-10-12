import EventCard from '@share/components/molecules/EventCard';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import { Event } from '@share/types/event';
import {
    getEventImage,
    getMinPrice,
} from '@modules/event-detail/utils/eventUtils';

interface EventGridProps {
    events: Event[];
    onViewEvent?: (_eventId: string) => void;
}

const EventGrid = ({ events, onViewEvent }: EventGridProps) => {
    const handleViewEvent = (eventId: string) => {
        onViewEvent?.(eventId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map(event => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    date={formatDateTime(event.start_time, DATE_FORMAT_ISO)}
                    price={
                        event.ticket_types.length > 0
                            ? getMinPrice(event)
                            : 'Liên hệ'
                    }
                    image={getEventImage(event)}
                    onViewEvent={() => handleViewEvent(event.id)}
                />
            ))}
        </div>
    );
};

export default EventGrid;
