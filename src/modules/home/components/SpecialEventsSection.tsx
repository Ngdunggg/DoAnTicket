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

interface Event {
    date: string;
    id: string;
    image: string;
    location: string;
    price: string;
    title: string;
}

interface SpecialEventsSectionProps {
    events: Event[];
    onBookNow: (eventId: string) => void;
}

const SpecialEventsSection = ({
    events,
    onBookNow,
}: SpecialEventsSectionProps) => {
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

    return (
        <div className="flex flex-col flex-1 gap-5 pb-10 relative">
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[24]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                Sự kiện đặc biệt
            </Text>

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
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                >
                    {events.map(event => (
                        <DivClick
                            onClick={() => onBookNow(event.id)}
                            key={event.id}
                            className="flex-shrink-0 w-[300px]"
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </DivClick>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialEventsSection;
