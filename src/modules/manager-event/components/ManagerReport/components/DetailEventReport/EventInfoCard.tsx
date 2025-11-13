import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import { FILTER_STATUS } from '@share/constants/commons';
import { Event } from '@share/types/event';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import DivClick from '@share/components/atoms/DivClick';
import { useNavigate } from 'react-router-dom';
import { IMAGE_TYPE } from '@share/constants/commons';
import { getEventImage } from '@modules/event-detail/utils/eventUtils';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';
interface EventInfoCardProps {
    event: Event;
    isAdmin?: boolean;
}

const EventInfoCard = ({ event, isAdmin = false }: EventInfoCardProps) => {
    const navigate = useNavigate();
    const { setSelectedReportEventIdStore } = useAdminStoreAction();

    const getStatusText = (status: string) => {
        switch (status) {
            case FILTER_STATUS.APPROVED:
                return 'Đã phê duyệt';
            case FILTER_STATUS.PENDING:
                return 'Chờ phê duyệt';
            case FILTER_STATUS.REJECTED:
                return 'Đã từ chối';
            default:
                return 'Không xác định';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case FILTER_STATUS.APPROVED:
                return 'bg-green-500/20 text-green-400';
            case FILTER_STATUS.PENDING:
                return 'bg-yellow-500/20 text-yellow-400';
            case FILTER_STATUS.REJECTED:
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getCategories = () => {
        if (!event.categories || event.categories.length === 0) {
            return 'Chưa phân loại';
        }
        return event.categories.map(cat => cat.name).join(', ');
    };

    return (
        <div className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex flex-col flex-1 w-full max-w-[60%]">
                <div className="flex items-center gap-4 mb-6">
                    <DivClick
                        onClick={() => {
                            if (isAdmin) {
                                setSelectedReportEventIdStore(null);
                            } else {
                                navigate(-1);
                            }
                        }}
                    >
                        <BackIcon mode={MODE_BACK.WHITE} />
                    </DivClick>
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
                                {formatDateTime(
                                    event.start_time.toString(),
                                    DATE_TIME_FORMAT_ISO
                                )}
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
                                {formatDateTime(
                                    event.end_time.toString(),
                                    DATE_TIME_FORMAT_ISO
                                )}
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
                                {event.location || 'Online'}
                            </Text>
                        </div>

                        <div className="flex items-center gap-3">
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                className="w-30"
                            >
                                Danh mục:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.GRAY}>
                                {getCategories()}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hình ảnh sự kiện */}
            {event.images.length > 0 && (
                <div className="flex flex-1 justify-center max-h-[350px]">
                    <img
                        src={getEventImage(event, IMAGE_TYPE.BANNER) || ''}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default EventInfoCard;
