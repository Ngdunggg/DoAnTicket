import { Text, MODE_COLOR_TEXT, MODE_SIZE, MODE_WEIGHT } from "@share/components/atoms/Text";
import EventGrid from "@share/components/organisms/EventGrid";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
}

interface FeaturedEventsSectionProps {
    events: Event[];
    onBookNow: (eventId: string) => void;
}

const FeaturedEventsSection = ({ events, onBookNow }: FeaturedEventsSectionProps) => {
    return (
        <div className="mb-8 flex flex-col gap-5">
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[24]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                Sự kiện nổi bật
            </Text>
            <EventGrid events={events} onBookNow={onBookNow} />
        </div>
    );
};

export default FeaturedEventsSection;
