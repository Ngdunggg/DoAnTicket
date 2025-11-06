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

interface HeroSectionProps {
    featuredEvents: Event[];
    onViewEvent: (_eventId: string) => void;
}

const AUTO_PLAY_INTERVAL = 30000;

const HeroSection = ({ featuredEvents, onViewEvent }: HeroSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];

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

    // Auto-play: tự động chuyển slide
    useEffect(() => {
        if (featuredEvents.length <= 1) return; // Không cần auto-play nếu chỉ có 1 event

        const interval = setInterval(() => {
            setCurrentIndex(prev =>
                prev === featuredEvents.length - 1 ? 0 : prev + 1
            );
        }, AUTO_PLAY_INTERVAL);

        return () => clearInterval(interval);
    }, [featuredEvents.length, AUTO_PLAY_INTERVAL]);
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
                            <span className="text-text-yellow">
                                {currentEvent
                                    ? getEventLocation(currentEvent)
                                    : 'TBA'}
                            </span>
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
