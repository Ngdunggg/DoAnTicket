import HeroSection from './HeroSection';
import SpecialEventsSection from './SpecialEventsSection';
import OtherEventsSection from './OtherEventsSection';
import TrendingEventsSection from './TrendingEventsSection';
import useHomeHandler from './hooks/useHomeHandler';
import LoadingContent from '@share/components/molecules/LoadingContent';

const HomeLayout = () => {
    const {
        getEventsByCategory,
        getEventsThisMonth,
        getEventsThisWeek,
        getFeaturedEvents,
        handleViewEvent,
        isLoading,
        trendingEvents,
    } = useHomeHandler();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-bg-black-2">
                <LoadingContent message="Đang tải sự kiện..." />
            </div>
        );
    }

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
                    events={getEventsThisWeek(4)}
                    weekEvents={getEventsThisWeek(4)}
                    monthEvents={getEventsThisMonth(4)}
                    onViewEvent={handleViewEvent}
                />

                {/* Các thể loại sự kiện */}
                <OtherEventsSection
                    title="Âm nhạc"
                    category={['Âm nhạc']}
                    events={getEventsByCategory('Âm nhạc')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Thể thao"
                    category={['Thể thao']}
                    events={getEventsByCategory('Thể thao')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Ẩm thực"
                    category={['Ẩm thực']}
                    events={getEventsByCategory('Ẩm thực')}
                    onViewEvent={handleViewEvent}
                />

                <OtherEventsSection
                    title="Công nghệ"
                    category={['Công nghệ']}
                    events={getEventsByCategory('Công nghệ', 10)}
                    onViewEvent={handleViewEvent}
                />
            </div>
        </div>
    );
};

export default HomeLayout;
