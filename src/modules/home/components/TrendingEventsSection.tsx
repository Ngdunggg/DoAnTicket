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
import { Event } from '@share/types/event';
import Image from '@share/components/atoms/Image';

interface TrendingEventsSectionProps {
    events: Event[];
    onViewEvent: (_eventId: string) => void;
}

const TrendingEventsSection = ({
    events,
    onViewEvent,
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

    // Render ranking number với CountUp animation
    const renderRankingNumber = (rank: number) => {
        return (
            <div className="absolute z-5 -left-1 bottom-[-10px]">
                <span
                    className="
                        text-[120px] font-black leading-none
                        text-text-yellow
                        drop-shadow-[2px_4px_6px_rgba(0,0,0,0.7)]
                        font-mono
                    "
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))', // viền chữ vàng đậm
                        fontFamily: "'Orbitron', 'Arial Black', sans-serif",
                        letterSpacing: '-0.02em',
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
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className="relative mt-2 pl-14 max-w-[350px] max-h-[200px]"
                        >
                            {renderRankingNumber(index + 1)}
                            <DivClick
                                onClick={() => onViewEvent(event.id)}
                                className="w-[350px] h-[200px] relative group cursor-pointer"
                            >
                                <Image
                                    src={event.images[0].image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
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
