import {
    Text,
    MODE_COLOR_TEXT,
    MODE_LEADING,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import TicketIcon from '@share/components/atoms/icons/TicketIcon';
import DivClick from '@share/components/atoms/DivClick';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import ArrowIcon, { MODE_ARROW } from '@share/components/atoms/icons/ArrowIcon';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import { Event } from '@share/types/event';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import { useState, useEffect } from 'react';
import Image from '@share/components/atoms/Image';
import {
    getEventImage,
    getEventLocation,
} from '@modules/event-detail/utils/eventUtils';
import { IMAGE_TYPE } from '@share/constants/commons';
import useDetectMobile from '@share/hooks/useDetectMobile';
import { useHorizontalScroll } from '@share/hooks/useHorizontalScroll';

interface HeroSectionProps {
    featuredEvents: Event[];
    onViewEvent: (_eventId: string) => void;
}

const AUTO_PLAY_INTERVAL = 5000;
const GAP = 16;
const MIN_EVENT_WIDTH = 300;
const PADDING = 16;

const HeroSection = ({ featuredEvents, onViewEvent }: HeroSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canShowTwoEvents, setCanShowTwoEvents] = useState(false);
    const [eventWidth, setEventWidth] = useState(350);

    const isMobile = useDetectMobile();
    const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];

    // Hook cho horizontal scroll (chỉ dùng khi màn hình đủ lớn)
    const {
        scrollContainerRef,
        scrollToDirection,
        showLeftButton,
        showRightButton,
    } = useHorizontalScroll({
        gap: GAP,
        itemsPerScroll: canShowTwoEvents ? 2 : 1,
        itemWidth: eventWidth,
    });

    // Detect screen size: tính toán xem có đủ chỗ cho 2 events không
    useEffect(() => {
        const checkScreenSize = () => {
            const screenWidth = window.innerWidth;
            // Tính toán: 2 events + 1 gap + padding = screenWidth
            // eventWidth = (screenWidth - padding - gap) / 2
            const calculatedWidth = (screenWidth - PADDING * 2 - GAP) / 2;

            // Nếu width tính được >= MIN_EVENT_WIDTH thì có thể hiện 2 events
            if (calculatedWidth >= MIN_EVENT_WIDTH) {
                setCanShowTwoEvents(true);
                setEventWidth(calculatedWidth);
            } else {
                setCanShowTwoEvents(false);
                setEventWidth(screenWidth - PADDING * 2);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex(prev =>
            prev === 0 ? featuredEvents.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex(prev =>
            prev === featuredEvents.length - 1 ? 0 : prev + 1
        );
    };

    const handleBookTicket = () => {
        if (currentEvent) {
            onViewEvent(currentEvent.id);
        }
    };

    // Auto-play: tự động chuyển slide cho PC
    useEffect(() => {
        if (featuredEvents.length <= 1 || isMobile) return; // Chỉ auto-play cho PC

        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === featuredEvents.length - 1 ? 0 : prev + 1
            );
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [featuredEvents.length, isMobile]);

    // Auto-play: tự động chuyển slide cho mobile (khi chỉ hiện 1 event)
    useEffect(() => {
        if (!isMobile || canShowTwoEvents || featuredEvents.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === featuredEvents.length - 1 ? 0 : prev + 1
            );
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [isMobile, canShowTwoEvents, featuredEvents.length]);

    // Auto-play: tự động scroll cho mobile (khi màn hình đủ lớn)
    useEffect(() => {
        if (
            !isMobile ||
            !canShowTwoEvents ||
            featuredEvents.length <= 1 ||
            !scrollContainerRef.current
        )
            return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const { clientWidth, scrollLeft, scrollWidth } = container;

                // Nếu đã scroll đến cuối, quay về đầu
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    container.scrollTo({ behavior: 'smooth', left: 0 });
                } else {
                    // Scroll sang event tiếp theo
                    scrollToDirection('right');
                }
            }
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [isMobile, canShowTwoEvents, featuredEvents.length, scrollToDirection]);

    if (isMobile) {
        if (!canShowTwoEvents) {
            return (
                <div className="bg-bg-black w-full flex justify-between py-8">
                    {/* Left Navigation Button */}

                    <DivClick
                        onClick={handleBookTicket}
                        className="flex flex-col items-start px-2 gap-4 justify-between"
                    >
                        <div className="w-full h-full min-h-[250px] relative">
                            <Image
                                src={
                                    currentEvent
                                        ? getEventImage(
                                              currentEvent,
                                              IMAGE_TYPE.BANNER
                                          )
                                        : undefined
                                }
                                alt={currentEvent?.title || 'hero'}
                                className="w-full h-full object-cover rounded-lg select-none"
                            />
                            <div className="absolute left-0 top-1/2 w-fit h-fit -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tr-xl rounded-br-xl">
                                <Button
                                    mode={MODE_BUTTON.NONE}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrentIndex(prev =>
                                            prev === 0
                                                ? featuredEvents.length - 1
                                                : prev - 1
                                        );
                                    }}
                                    icon={
                                        <ChevronIcon
                                            direction={
                                                MODE_CHEVRON_DIRECTION.LEFT
                                            }
                                            mode={MODE_CHEVRON.WHITE}
                                            size={24}
                                        />
                                    }
                                />
                            </div>

                            {/* Right Navigation Button */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tl-xl rounded-bl-xl">
                                <Button
                                    mode={MODE_BUTTON.NONE}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrentIndex(prev =>
                                            prev === featuredEvents.length - 1
                                                ? 0
                                                : prev + 1
                                        );
                                    }}
                                    icon={
                                        <ChevronIcon
                                            direction={
                                                MODE_CHEVRON_DIRECTION.RIGHT
                                            }
                                            mode={MODE_CHEVRON.WHITE}
                                            size={24}
                                        />
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-between w-full px-2 gap-2">
                            <div className="flex flex-col gap-2">
                                <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                    {currentEvent
                                        ? formatDateTime(
                                              currentEvent.start_time,
                                              DATE_FORMAT_ISO
                                          )
                                        : 'TBA'}{' '}
                                </Text>
                                <Text modeColor={MODE_COLOR_TEXT.YELLOW}>
                                    {currentEvent
                                        ? getEventLocation(currentEvent)
                                        : 'TBA'}
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[18]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                    modeLeading={MODE_LEADING.LARGE_EXTREME}
                                    isAllowLineBreaks
                                >
                                    {currentEvent?.title ||
                                        'Sự kiện sắp diễn ra'}
                                </Text>
                            </div>
                        </div>
                    </DivClick>
                </div>
            );
        }

        return (
            <div className="bg-bg-black w-full flex flex-col py-10 relative">
                <div className="relative flex-1 px-2 h-full">
                    {/* Left Navigation Button */}
                    {showLeftButton && (
                        <div className="absolute left-2 top-1/2 w-fit h-fit -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tr-xl rounded-br-xl">
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
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-5 bg-black/80 hover:bg-black/90 rounded-tl-xl rounded-bl-xl">
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
                        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth h-full"
                    >
                        {featuredEvents.map(event => (
                            <DivClick
                                key={event.id}
                                className="flex-shrink-0 flex flex-col gap-4 justify-between h-full min-h-[300px]"
                                style={{ width: `${eventWidth}px` }}
                                onClick={() => onViewEvent(event.id)}
                            >
                                <Image
                                    src={getEventImage(
                                        event,
                                        IMAGE_TYPE.BANNER
                                    )}
                                    alt={event.title}
                                    className="w-full min-h-[300px] object-cover rounded-lg"
                                />
                            </DivClick>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-bg-black w-full h-[600px] flex justify-between py-10">
                <div className="flex flex-col max-w-[50%] items-start px-30 gap-4 justify-between">
                    <div />
                    <div className="flex flex-col gap-4">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[20]}
                        >
                            {currentEvent
                                ? formatDateTime(
                                      currentEvent.start_time,
                                      DATE_FORMAT_ISO
                                  )
                                : 'TBA'}{' '}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[20]}
                        >
                            {currentEvent
                                ? getEventLocation(currentEvent)
                                : 'TBA'}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[48]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            modeLeading={MODE_LEADING.LARGE_EXTREME}
                            isAllowLineBreaks
                            className="leading-[48px]"
                        >
                            {currentEvent?.title || 'Sự kiện sắp diễn ra'}
                        </Text>
                        <div />
                        <Button
                            mode={MODE_BUTTON.DECORATIVE_YELLOW}
                            className="!w-fit !h-12"
                            icon={<TicketIcon />}
                            onClick={handleBookTicket}
                        >
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.BLACK}
                            >
                                Đặt vé ngay
                            </Text>
                        </Button>
                    </div>
                    <div className="flex gap-4">
                        <DivClick onClick={handlePrevious}>
                            <BackIcon mode={MODE_BACK.WHITE} />
                        </DivClick>
                        <DivClick onClick={handleNext}>
                            <ArrowIcon mode={MODE_ARROW.WHITE} />
                        </DivClick>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center gap-10 px-10">
                    <div className="w-[75%] h-full">
                        <Image
                            src={
                                currentEvent
                                    ? getEventImage(
                                          currentEvent,
                                          IMAGE_TYPE.BANNER
                                      )
                                    : undefined
                            }
                            alt={currentEvent?.title || 'hero'}
                            className="w-full h-full object-cover rounded-lg select-none"
                        />
                    </div>
                    {featuredEvents.length > 1 && (
                        <div className="w-[15%] h-full py-10 opacity-50 overflow-hidden">
                            <Image
                                src={getEventImage(
                                    featuredEvents[
                                        (currentIndex + 1) %
                                            featuredEvents.length
                                    ],
                                    IMAGE_TYPE.BANNER
                                )}
                                alt="next event"
                                className="w-full h-full object-cover rounded-lg select-none"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HeroSection;
