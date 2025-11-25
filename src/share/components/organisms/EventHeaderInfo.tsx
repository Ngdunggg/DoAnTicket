import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { getCurrentEventId } from '@share/utils/path';
import { SCREEN_PATH } from '@share/constants/routers';
import { Event } from '@share/types/event';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import CalendarIcon, { MODE_CALENDAR } from '../atoms/icons/CalendarIcon';
import MapPinIcon from '../atoms/icons/MapPinIcon';
interface EventHeaderInfoProps {
    countdownDuration?: number;
    eventInfo: Event;
    // in minutes
    onTimeout?: () => void;
    showCountdown?: boolean;
}

const EventHeaderInfo = ({
    countdownDuration = 15,
    eventInfo,
    onTimeout,
    showCountdown = true,
}: EventHeaderInfoProps) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(countdownDuration * 60); // convert to seconds

    useEffect(() => {
        if (!showCountdown) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Hết thời gian
                    if (onTimeout) {
                        onTimeout();
                    } else {
                        // Default behavior: chuyển về trang chọn vé
                        const eventId = getCurrentEventId(
                            window.location.pathname
                        );
                        navigate(
                            SCREEN_PATH.EVENT_TICKET_SELECTION.replace(
                                ':event_id',
                                eventId || ''
                            )
                        );
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, onTimeout, showCountdown]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative h-fit w-full overflow-hidden px-4 md:px-20 py-5 md:py-10 rounded-lg">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        eventInfo.images &&
                        eventInfo.images.length > 0 &&
                        eventInfo.images?.[0]?.image_url
                            ? `url(${eventInfo.images[0].image_url})`
                            : undefined,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
            </div>

            {/* Content */}
            <div className="relative z-5 flex flex-col md:flex-row h-full justify-between gap-5 md:gap-10 p-8">
                {/* Event Info */}
                <div className="flex flex-col gap-6 flex-1">
                    <div className="border-b border-white pb-3">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[32]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {eventInfo.title}
                        </Text>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="flex items-center gap-2"
                        >
                            <MapPinIcon /> {eventInfo.location}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="flex items-center gap-2"
                        >
                            <CalendarIcon mode={MODE_CALENDAR.WHITE} />{' '}
                            {eventInfo.start_time
                                ? formatDateTime(
                                      eventInfo.start_time,
                                      DATE_FORMAT_ISO
                                  )
                                : ''}
                        </Text>
                    </div>
                </div>

                {/* Countdown Timer */}
                {showCountdown && (
                    <div className="bg-bg-gray/50 px-6 py-10 rounded-lg">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Hoàn tất đặt vé trong
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.RED}
                                modeSize={MODE_SIZE[32]}
                                modeWeight={MODE_WEIGHT.LARGE}
                                className="font-mono"
                            >
                                {formatTime(timeLeft)}
                            </Text>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventHeaderInfo;
