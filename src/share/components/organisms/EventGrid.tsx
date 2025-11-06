import EventCard from '@share/components/molecules/EventCard';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import { Event } from '@share/types/event';
import {
    getEventImage,
    getMinPrice,
} from '@modules/event-detail/utils/eventUtils';
import { SUGGEST_EVENT_MODE } from './SuggestEvent/SuggestEvent';
import { IMAGE_TYPE } from '@share/constants/commons';
interface EventGridProps {
    events: Event[];
    mode?: typeof SUGGEST_EVENT_MODE.DEFAULT | typeof SUGGEST_EVENT_MODE.POPUP;
    onViewEvent?: (_eventId: string) => void;
}

const EventGrid = ({
    events,
    mode = SUGGEST_EVENT_MODE.DEFAULT,
    onViewEvent,
}: EventGridProps) => {
    const handleViewEvent = (eventId: string) => {
        onViewEvent?.(eventId);
    };

    return (
        <div
            className={`grid grid-cols-1 gap-6 ${
                mode === SUGGEST_EVENT_MODE.POPUP
                    ? 'md:grid-cols-2 ld:grid-cols-3'
                    : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
        >
            {events?.map(event => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    date={formatDateTime(event.start_time, DATE_FORMAT_ISO)}
                    price={
                        event.ticket_types.length > 0
                            ? getMinPrice(event)
                            : null
                    }
                    image={getEventImage(event, IMAGE_TYPE.CARD)}
                    onViewEvent={() => handleViewEvent(event.id)}
                />
            ))}
        </div>
    );
};

export default EventGrid;
