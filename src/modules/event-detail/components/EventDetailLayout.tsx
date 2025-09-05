import EventHero from "./EventHero";
import EventDescription from "./EventDescription";
import TicketSection from "./TicketSection";

interface TicketType {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    available: number;
    benefits: string[];
    isPopular?: boolean;
}

interface EventDate {
    id: string;
    date: string;
    tickets: TicketType[];
}

interface EventDetailLayoutProps {
    event: {
        id: string;
        title: string;
        dateStart: string;
        dateEnd: string;
        location: string;
        organizer: string;
        image: string;
        category: string;
        description: string;
        highlights: string[];
        requirements: string[];
        additionalInfo: {
            duration: string;
            language: string;
            ageRestriction: string;
            dressCode?: string;
        };
    };
    tickets: EventDate[];
    onBack: () => void;
    onShare: () => void;
    onBookNow: () => void;
    onBuyTickets: (dateId: string) => void;
}

const EventDetailLayout = ({
    event,
    tickets,
    onBack,
    onShare,
    onBookNow,
    onBuyTickets,
}: EventDetailLayoutProps) => {
    return (
        <div className="flex flex-col flex-1">
            {/* Hero Section */}
            <EventHero event={event} onBack={onBack} onShare={onShare} onBookNow={onBookNow} />

            {/* Description Section */}
            <EventDescription
                description={event.description}
                highlights={event.highlights}
                requirements={event.requirements}
                additionalInfo={event.additionalInfo}
            />

            {/* Ticket Section */}
            <TicketSection ticketsData={tickets} onBuyTickets={onBuyTickets} />
        </div>
    );
};

export default EventDetailLayout;
