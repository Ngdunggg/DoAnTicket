import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
    MODE_LEADING,
} from '@share/components/atoms/Text';
import { Event } from '@share/types/event';
import { FILTER_STATUS } from '@share/constants/commons';

interface EventInfoCardProps {
    event: Event;
}

const EventInfoCard = ({ event }: EventInfoCardProps) => {
    const getStatusText = (status: string) => {
        switch (status) {
            case FILTER_STATUS.UPCOMING:
                return 'Sắp tới';
            case FILTER_STATUS.PAST:
                return 'Đã qua';
            case FILTER_STATUS.PENDING:
                return 'Chờ phê duyệt';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case FILTER_STATUS.UPCOMING:
                return 'bg-green-500/20 text-green-400';
            case FILTER_STATUS.PAST:
                return 'bg-gray-500/20 text-gray-400';
            case FILTER_STATUS.PENDING:
                return 'bg-yellow-500/20 text-yellow-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex flex-col flex-1 w-full max-w-[60%]">
                <div className="flex items-center gap-4 mb-6">
                    <Text
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        {event.title}
                    </Text>
                    <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            event.status
                        )}`}
                    >
                        {getStatusText(event.status)}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Thông tin cơ bản */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                className="w-30"
                            >
                                Ngày bắt đầu:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.GRAY}>
                                {event.dateStart}
                            </Text>
                        </div>

                        <div className="flex items-center gap-3">
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                className="w-30"
                            >
                                Ngày kết thúc:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.GRAY}>
                                {event.dateEnd}
                            </Text>
                        </div>

                        <div className="flex items-center gap-3">
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                className="w-30"
                            >
                                Địa điểm:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.GRAY}>
                                {event.location}
                            </Text>
                        </div>

                        {event.organizer && (
                            <div className="flex items-center gap-3">
                                <Text
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    className="w-30"
                                >
                                    Tổ chức:
                                </Text>
                                <Text modeColor={MODE_COLOR_TEXT.GRAY}>
                                    {event.organizer}
                                </Text>
                            </div>
                        )}
                        {/* Mô tả */}
                        {event.description && (
                            <div className="flex gap-2">
                                <Text
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    className="w-31"
                                >
                                    Mô tả sự kiện:
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                    modeLeading={MODE_LEADING.MEDIUM}
                                    isAllowLineBreaks
                                >
                                    {event.description}
                                </Text>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Hình ảnh sự kiện */}
            {event.image && (
                <div className="flex flex-1 justify-center max-h-[350px]">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default EventInfoCard;
