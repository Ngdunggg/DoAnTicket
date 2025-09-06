import DivClick from '@share/components/atoms/DivClick';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import { useHorizontalScroll } from '@share/hooks/useHorizontalScroll';
import CountUp from 'react-countup';

interface TrendingEvent {
    date: string;
    id: string;
    image: string;
    location: string;
    price: string;
    title: string;
    viewCount: number;
}

interface TrendingEventsSectionProps {
    events: TrendingEvent[];
    onBookNow: (eventId: string) => void;
}

const TrendingEventsSection = ({
    events,
    onBookNow,
}: TrendingEventsSectionProps) => {
    // Sử dụng custom hook cho horizontal scroll
    const {
        scrollContainerRef,
        scrollToDirection,
        showLeftButton,
        showRightButton,
    } = useHorizontalScroll({
        gap: 16,
        itemsPerScroll: 3,
        itemWidth: 300,
    });

    // Sắp xếp events theo viewCount (trending) và chỉ lấy top 10
    const top10Events = [...events]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 10);

    // Render ranking number với CountUp animation
    const renderRankingNumber = (rank: number) => {
        return (
            <div className="absolute -left-1 bottom-[-10px]">
                <span
                    className="
                        text-[120px] font-black leading-none
                        text-text-yellow
                        drop-shadow-[2px_4px_6px_rgba(0,0,0,0.7)]
                        font-mono tracking-wider
                    "
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))', // viền chữ vàng đậm
                        fontFamily: "'Orbitron', 'Arial Black', sans-serif",
                        WebkitTextStroke: '2px #92400e',
                    }}
                >
                    <CountUp end={rank} duration={1} delay={0.2} start={0} />
                </span>
            </div>
        );
    };

    return (
        <div className="flex flex-col flex-1 gap-2 pb-10 relative">
            <div className="flex items-center gap-2">
                <div className="w-fit h-fit flex items-center justify-center">
                    <span className="text-white text-3xl">🔥</span>
                </div>
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Sự kiện xu hướng
                </Text>
            </div>

            <div className="relative">
                {/* Left Navigation Button */}
                {showLeftButton && (
                    <div className="absolute left-0 top-1/2 w-fit h-fit -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tr-xl rounded-br-xl">
                        <Button
                            mode={MODE_BUTTON.NONE}
                            onClick={() => scrollToDirection('left')}
                            icon={
                                <ChevronIcon
                                    direction={MODE_CHEVRON_DIRECTION.LEFT}
                                    mode={MODE_CHEVRON.WHITE}
                                    size={24}
                                />
                            }
                        />
                    </div>
                )}

                {/* Right Navigation Button */}
                {showRightButton && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tl-xl rounded-bl-xl">
                        <Button
                            mode={MODE_BUTTON.NONE}
                            onClick={() => scrollToDirection('right')}
                            icon={
                                <ChevronIcon
                                    direction={MODE_CHEVRON_DIRECTION.RIGHT}
                                    mode={MODE_CHEVRON.WHITE}
                                    size={24}
                                />
                            }
                        />
                    </div>
                )}

                {/* Events Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-20 overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide scroll-smooth"
                >
                    {top10Events.map((event, index) => (
                        <div
                            key={event.id}
                            className="relative mt-2 w-[350px] pl-14 h-[200px]"
                        >
                            {renderRankingNumber(index + 1)}
                            <DivClick
                                onClick={() => onBookNow(event.id)}
                                className="w-[350px] relative group cursor-pointer"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-[200px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                />
                            </DivClick>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingEventsSection;
