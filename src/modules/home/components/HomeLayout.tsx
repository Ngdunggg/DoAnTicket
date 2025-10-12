import HeroSection from './HeroSection';
import SpecialEventsSection from './SpecialEventsSection';
import OtherEventsSection from './OtherEventsSection';
import TrendingEventsSection from './TrendingEventsSection';
import useHomeHandler from './hooks/useHomeHandler';

const HomeLayout = () => {
    const {
        getEventsByCategory,
        getEventsThisMonth,
        getEventsThisWeek,
        getFeaturedEvents,
        handleViewEvent,
        trendingEvents,
    } = useHomeHandler();

    return (
        <div className="flex flex-col bg-bg-black-2">
            {/* Hero Section - Phần đầu nổi bật */}
            <HeroSection
                featuredEvents={trendingEvents}
                onViewEvent={handleViewEvent}
            />

            {/* Content Section */}
            <div className="px-6 pb-6 mt-20">
                {/* Sự kiện nổi bật - Layout ngang */}
                <SpecialEventsSection
                    events={getFeaturedEvents(10)}
                    onViewEvent={handleViewEvent}
                />

                {/* Sự kiện xu hướng - Layout ngang với ranking */}
                <TrendingEventsSection
                    events={trendingEvents}
                    onViewEvent={handleViewEvent}
                />

                {/* Sự kiện trong tuần hoặc tháng*/}
                <OtherEventsSection
                    mode="week"
                    title="Sự kiện theo thời gian"
                    events={getEventsThisWeek(10)}
                    weekEvents={getEventsThisWeek(10)}
                    monthEvents={getEventsThisMonth(10)}
                    onViewEvent={handleViewEvent}
                />

                {/* Các thể loại sự kiện */}
                <OtherEventsSection
                    title="Âm nhạc"
                    events={getEventsByCategory('Âm nhạc')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Thể thao"
                    events={getEventsByCategory('Thể thao')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Nghệ thuật"
                    events={getEventsByCategory('Nghệ thuật')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Giáo dục"
                    events={getEventsByCategory('Giáo dục', 10)}
                    onViewEvent={handleViewEvent}
                />
            </div>
        </div>
    );
};

export default HomeLayout;
