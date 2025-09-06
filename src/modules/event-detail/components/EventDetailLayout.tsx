import EventHero from "./EventHero";
import EventDescription from "./EventDescription";
import TicketSection from "./TicketSection";

interface TicketType {
  available: number;
  benefits: string[];
  description: string;
  id: string;
  isPopular?: boolean;
  name: string;
  originalPrice?: number;
  price: number;
}

interface EventDate {
  date: string;
  id: string;
  tickets: TicketType[];
}

interface EventDetailLayoutProps {
  event: {
    additionalInfo: {
      ageRestriction: string;
      dressCode?: string;
      duration: string;
      language: string;
    };
    category: string;
    dateEnd: string;
    dateStart: string;
    description: string;
    highlights: string[];
    id: string;
    image: string;
    location: string;
    organizer: string;
    requirements: string[];
    title: string;
  };
  onBack: () => void;
  onBookNow: () => void;
  onBuyTickets: (dateId: string) => void;
  onShare: () => void;
  tickets: EventDate[];
}

const EventDetailLayout = ({
  event,
  onBack,
  onBookNow,
  onBuyTickets,
  onShare,
  tickets,
}: EventDetailLayoutProps) => {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <EventHero
        event={event}
        onBack={onBack}
        onShare={onShare}
        onBookNow={onBookNow}
      />

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
