import { useState, useRef, useEffect, useMemo } from 'react';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import DivClick from '@share/components/atoms/DivClick';
import MoreIcon from '@share/components/atoms/icons/MoreIcon';
import { Event } from '@share/types/event';
import { FILTER_STATUS } from '@share/constants/commons';
import Image from '../atoms/Image';
import CalendarIcon, { MODE_CALENDAR } from '../atoms/icons/CalendarIcon';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import { formatDateTime } from '@share/utils/dateTime';
import MapPinIcon from '../atoms/icons/MapPinIcon';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import useCreateEventStoreAction from '@modules/manager-event/components/CreateAndEditEvent/hooks/useCreateEventStoreAction';
import WebsiteIcon, { MODE_WEBSITE_ICON } from '../atoms/icons/WebsiteIcon';

interface EventListCardProps {
    className?: string;
    event: Event;
    onDeleteEvent?: () => void;
    onViewEvent?: () => void;
    showMenu?: boolean;
}

const EventListCard = ({
    className = '',
    event,
    onDeleteEvent,
    onViewEvent,
    showMenu = true,
}: EventListCardProps) => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { setIsEditModeStore } = useCreateEventStoreAction();
    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowDropdownMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getEventTimeStatus = useMemo(() => {
        const now = new Date();
        const startTime = new Date(event.start_time);

        // Check nếu event sắp diễn ra
        if (startTime > now) {
            return FILTER_STATUS.UPCOMING;
        }

        // Check nếu event đã diễn ra
        if (startTime <= now) {
            return FILTER_STATUS.PAST;
        }

        return FILTER_STATUS.ALL;
    }, [event]);

    const getEventStatus = useMemo(() => {
        if (event.status === FILTER_STATUS.PENDING) {
            return {
                color: 'bg-yellow-500/20 text-yellow-400',
                text: 'Chờ phê duyệt',
                textColor: MODE_COLOR_TEXT.YELLOW,
            };
        }

        if (event.status === FILTER_STATUS.REJECTED) {
            return {
                color: 'bg-red-500/20 text-red-400',
                text: 'Đã từ chối',
                textColor: MODE_COLOR_TEXT.RED,
            };
        }

        if (event.status === FILTER_STATUS.APPROVED) {
            if (getEventTimeStatus === FILTER_STATUS.UPCOMING) {
                return {
                    color: 'bg-green-500/20 text-green-400',
                    text: 'Sắp diễn ra',
                    textColor: MODE_COLOR_TEXT.GREEN,
                };
            } else if (getEventTimeStatus === FILTER_STATUS.PAST) {
                return {
                    color: 'bg-gray-500/20 text-gray-400',
                    text: 'Đã diễn ra',
                    textColor: MODE_COLOR_TEXT.GRAY,
                };
            }
        }

        // Fallback
        return {
            color: 'bg-gray-500/20 text-gray-400',
            text: 'Không xác định',
            textColor: MODE_COLOR_TEXT.GRAY,
        };
    }, [event, getEventTimeStatus]);

    const handleViewEventClick = () => {
        setShowDropdownMenu(false);
        onViewEvent?.();
    };

    const handleEditEventClick = () => {
        setShowDropdownMenu(false);
        setIsEditModeStore(true);
        navigate(SCREEN_PATH.MANAGER_EVENT_EDIT.replace(':event_id', event.id));
    };

    const handleDeleteEventClick = () => {
        onDeleteEvent?.();
        setShowDropdownMenu(false);
    };

    return (
        <DivClick
            className={`flex bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-bg-yellow/30 transition-all duration-300 group ${className}`}
            onClick={handleViewEventClick}
        >
            {/* Event Image */}
            <div className="relative w-full md:w-76 h-50 rounded-l-lg overflow-hidden flex-shrink-0">
                <Image
                    src={event.images[0]?.image_url || ''}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    <div
                        className={`px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm ${getEventStatus.color}`}
                    >
                        <Text
                            modeColor={getEventStatus.textColor}
                            modeSize={MODE_SIZE[13]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            {getEventStatus.text}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Event Info */}
            <div className="hidden md:flex flex-1 ml-4 pt-4 flex-col gap-2.5">
                {/* Event Name */}
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    {event.title}
                </Text>

                {/* Date and Location */}
                <div className="flex items-center gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        className="flex items-center gap-2"
                    >
                        <CalendarIcon mode={MODE_CALENDAR.WHITE} />
                        {formatDateTime(event.start_time, DATE_TIME_FORMAT_ISO)}
                    </Text>
                </div>
                {!event.is_online ? (
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[14]}
                            className="flex items-center gap-2"
                        >
                            <MapPinIcon /> {event.location}
                        </Text>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[14]}
                            className="flex items-center gap-2"
                        >
                            <WebsiteIcon mode={MODE_WEBSITE_ICON.WHITE} />
                            Sự kiện Online
                        </Text>
                    </div>
                )}
            </div>

            {/* Actions */}
            {showMenu &&
                (event.status === FILTER_STATUS.PENDING ||
                    event.status === FILTER_STATUS.REJECTED) && (
                    <div className="hidden md:flex gap-2 mt-2 pr-2">
                        {/* Three Dots Menu Button */}
                        <div className="relative" ref={menuRef}>
                            <DivClick
                                onClick={e => {
                                    e?.stopPropagation();
                                    setShowDropdownMenu(!showDropdownMenu);
                                }}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <MoreIcon size={20} />
                            </DivClick>

                            {/* Dropdown Menu */}
                            {showDropdownMenu && (
                                <div className="absolute right-0 top-8 mt-2 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-10">
                                    <DivClick
                                        onClick={e => {
                                            e?.stopPropagation();
                                            handleEditEventClick();
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3"
                                    >
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[14]}
                                            modeWeight={MODE_WEIGHT.MEDIUM}
                                        >
                                            Chỉnh sửa
                                        </Text>
                                    </DivClick>

                                    <DivClick
                                        onClick={e => {
                                            e?.stopPropagation();
                                            handleDeleteEventClick();
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3"
                                    >
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.RED}
                                            modeSize={MODE_SIZE[14]}
                                            modeWeight={MODE_WEIGHT.MEDIUM}
                                        >
                                            Xóa sự kiện
                                        </Text>
                                    </DivClick>
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </DivClick>
    );
};

export default EventListCard;
