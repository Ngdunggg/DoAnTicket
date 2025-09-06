import {
  Text,
  MODE_COLOR_TEXT,
  MODE_SIZE,
  MODE_WEIGHT,
} from "@share/components/atoms/Text";
import EventGrid from "@share/components/organisms/EventGrid";

interface Event {
  date: string;
  id: string;
  location: string;
  price: string;
  title: string;
}

interface OtherEventsSectionProps {
  events: Event[];
  onBookNow: (eventId: string) => void;
  title: string;
}

const OtherEventsSection = ({
  events,
  onBookNow,
  title,
}: OtherEventsSectionProps) => {
  return (
    <div className="mb-8 flex flex-col gap-5">
      <Text
        modeColor={MODE_COLOR_TEXT.WHITE}
        modeSize={MODE_SIZE[24]}
        modeWeight={MODE_WEIGHT.LARGE}
      >
        {title}
      </Text>
      <EventGrid events={events} onBookNow={onBookNow} />
    </div>
  );
};

export default OtherEventsSection;
