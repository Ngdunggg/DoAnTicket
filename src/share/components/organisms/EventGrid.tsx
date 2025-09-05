import EventCard from "@share/components/molecules/EventCard";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    image?: string;
}

interface EventGridProps {
    events: Event[];
    onBookNow?: (eventId: string) => void;
}

const EventGrid = ({ events, onBookNow }: EventGridProps) => {
    const handleBookNow = (eventId: string) => {
        onBookNow?.(eventId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    price={event.price}
                    image={event.image}
                    onBookNow={() => handleBookNow(event.id)}
                />
            ))}
        </div>
    );
};

export default EventGrid;
