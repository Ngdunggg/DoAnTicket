import { useState, useRef, useEffect } from 'react';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import DivClick from '@share/components/atoms/DivClick';
import MoreIcon from '@share/components/atoms/icons/MoreIcon';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import { Event } from '@share/types/event';
import { FILTER_STATUS } from '@share/constants/commons';

interface EventListCardProps {
    event: Event;
    onDelete?: (_eventId: string) => void;
    onEdit?: (_eventId: string) => void;
    onView?: (_eventId: string) => void;
}

const EventListCard = ({
    event,
    onDelete,
    onEdit,
    onView,
}: EventListCardProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-green-500/20 text-green-400';
            case 'past':
                return 'bg-gray-500/20 text-gray-400';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'Sắp tới';
            case 'past':
                return 'Đã qua';
            case 'pending':
                return 'Chờ phê duyệt';
            default:
                return 'Không xác định';
        }
    };

    const handleViewDetailEvent = (eventId: string) => {
        navigate(
            SCREEN_PATH.MANAGER_EVENT_DETAIL.replace(':event_id', eventId)
        );
    };

    return (
        <DivClick
            className="flex bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-bg-yellow/30 transition-all duration-300 group"
            onClick={() => {
                handleViewDetailEvent(event.id);
            }}
        >
            {/* Event Image */}
            <div className="relative w-76 h-50 rounded-l-lg overflow-hidden flex-shrink-0">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Text
                            modeColor={MODE_COLOR_TEXT.GRAY}
                            modeSize={MODE_SIZE[12]}
                        >
                            No Image
                        </Text>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40" />

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    <div
                        className={`px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm ${getStatusColor(event.status)}`}
                    >
                        <Text
                            modeColor={
                                event.status === FILTER_STATUS.UPCOMING
                                    ? MODE_COLOR_TEXT.GREEN
                                    : event.status === FILTER_STATUS.PENDING
                                      ? MODE_COLOR_TEXT.YELLOW
                                      : MODE_COLOR_TEXT.GRAY
                            }
                            modeSize={MODE_SIZE[13]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            {getStatusText(event.status)}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 ml-4 pt-4 flex flex-col gap-2.5">
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
                        modeColor={MODE_COLOR_TEXT.GRAY}
                        modeSize={MODE_SIZE[14]}
                    >
                        📅 {event.dateStart}
                    </Text>
                </div>
                <div className="flex items-center gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.GRAY}
                        modeSize={MODE_SIZE[14]}
                    >
                        📍 {event.location}
                    </Text>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2 pr-2">
                {/* Three Dots Menu Button */}
                <div className="relative" ref={menuRef}>
                    <DivClick
                        onClick={e => {
                            e?.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <MoreIcon size={20} />
                    </DivClick>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 top-8 mt-2 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-10">
                            <DivClick
                                onClick={e => {
                                    e?.stopPropagation();
                                    setShowMenu(false);
                                    onView?.(event.id);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3"
                            >
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    Xem sự kiện
                                </Text>
                            </DivClick>

                            <DivClick
                                onClick={e => {
                                    e?.stopPropagation();
                                    setShowMenu(false);
                                    onEdit?.(event.id);
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
                                    setShowMenu(false);
                                    onDelete?.(event.id);
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
        </DivClick>
    );
};

export default EventListCard;
