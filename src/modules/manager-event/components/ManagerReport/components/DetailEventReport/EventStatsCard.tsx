import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import { EventReport } from '@share/types/event';
import { formatPrice } from '@modules/event-detail/utils/eventUtils';

interface EventStatsCardProps {
    stats: EventReport['summary'];
}

const EventStatsCard = ({ stats }: EventStatsCardProps) => {
    // Tính số vé đã bán
    const totalTicketsSold =
        stats.total_tickets_available - stats.total_tickets_remaining;

    // Tính tỷ lệ chuyển đổi
    const conversionRate =
        stats.total_views > 0
            ? (totalTicketsSold / stats.total_views) * 100
            : 0;

    return (
        <div className="flex flex-col flex-1 h-fit w-full md:max-w-[40%] bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <Text
                modeSize={MODE_SIZE[20]}
                modeWeight={MODE_WEIGHT.LARGE}
                modeColor={MODE_COLOR_TEXT.WHITE}
                className="mb-6"
            >
                📊 Thống kê sự kiện
            </Text>

            <div className="flex flex-col gap-6">
                {/* Tổng doanh thu */}
                <div className="flex items-center gap-2 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.GREEN}
                    >
                        Tổng doanh thu:
                    </Text>
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        {formatPrice(stats.total_revenue)}
                    </Text>
                </div>

                {/* Số lượt truy cập */}
                <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        Lượt truy cập:
                    </Text>
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        {stats.total_views}
                    </Text>
                </div>

                {/* Vé đã bán */}
                <div className="flex items-center gap-2 bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                    >
                        Vé đã bán:
                    </Text>
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        {totalTicketsSold}/{stats.total_tickets_available}
                    </Text>
                </div>

                {/* Tỷ lệ chuyển đổi */}
                <div className="flex items-center gap-2 bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        Tỷ lệ chuyển đổi:
                    </Text>
                    <Text
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        {conversionRate.toFixed(1)}%
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default EventStatsCard;
