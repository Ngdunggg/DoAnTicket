import HeroSection from "./HeroSection";
import FeaturedEventsSection from "./FeaturedEventsSection";
import SpecialEventsSection from "./SpecialEventsSection";
import OtherEventsSection from "./OtherEventsSection";
import TrendingEventsSection from "./TrendingEventsSection";

interface Event {
  date: string;
  id: string;
  image: string;
  location: string;
  price: string;
  title: string;
}

interface TrendingEvent extends Event {
  viewCount: number;
}

interface HomeLayoutProps {
  events: Event[];
  onBookNow: (eventId: string) => void;
}

const HomeLayout = ({ events, onBookNow }: HomeLayoutProps) => {
  // Tạo trending events với viewCount
  const createTrendingEvents = (): TrendingEvent[] => {
    return events.slice(0, 10).map(event => ({
      ...event,
      viewCount: Math.floor(Math.random() * 50000) + 1000, // Random view count từ 1000-51000
    }));
  };

  const trendingEvents = createTrendingEvents();

  return (
    <div className="flex flex-col bg-bg-black-2">
      {/* Hero Section - Phần đầu nổi bật */}
      <HeroSection />

      {/* Content Section */}
      <div className="px-6 pb-6 mt-20">
        {/* Sự kiện đặc biệt - Layout ngang */}
        <SpecialEventsSection
          events={events.slice(0, 10)}
          onBookNow={onBookNow}
        />

        {/* Sự kiện nổi bật - Layout dọc */}
        {/* <FeaturedEventsSection events={events} onBookNow={onBookNow} /> */}

        {/* Sự kiện xu hướng - Layout ngang với ranking */}
        <TrendingEventsSection events={trendingEvents} onBookNow={onBookNow} />

        {/* Các phần còn lại */}
        <OtherEventsSection
          title="Sự kiện sắp diễn ra"
          events={events.slice(0, 4)}
          onBookNow={onBookNow}
        />

        <OtherEventsSection
          title="Sự kiện được yêu thích"
          events={events.slice(4, 8)}
          onBookNow={onBookNow}
        />

        <OtherEventsSection
          title="Sự kiện mới nhất"
          events={events.slice(0, 4)}
          onBookNow={onBookNow}
        />

        <OtherEventsSection
          title="Sự kiện đặc biệt"
          events={events.slice(4, 8)}
          onBookNow={onBookNow}
        />
      </div>
    </div>
  );
};

export default HomeLayout;
