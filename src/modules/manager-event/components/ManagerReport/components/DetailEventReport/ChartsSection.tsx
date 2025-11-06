/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LineChart,
    Line,
} from 'recharts';
import { EventReport } from '@share/types/event';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';

interface ChartsSectionProps {
    dailyStats: EventReport['daily_stats'];
    purchasedTickets: EventReport['purchased_tickets'];
    stats: EventReport['summary'];
}

const ChartsSection = ({
    dailyStats,
    purchasedTickets,
    stats,
}: ChartsSectionProps) => {
    // Tính tổng vé đã bán
    const totalTicketsSold =
        stats.total_tickets_available - stats.total_tickets_remaining;

    // Dữ liệu cho biểu đồ tròn (vé đã bán vs còn lại)
    const pieData = [
        { color: '#10B981', name: 'Đã bán', value: totalTicketsSold },
        {
            color: '#6B7280',
            name: 'Còn lại',
            value: stats.total_tickets_remaining,
        },
    ];

    // Dữ liệu doanh thu theo ngày từ backend
    const revenueData = dailyStats.revenue 
        .map(item => ({
            count: item.count,
            date: formatDateTime(item.date, DATE_FORMAT_ISO),
            orders: item.orders,
            revenue: item.revenue,
        }))
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

    // Tính tổng lượt mua theo ngày từ purchasedTickets
    const purchasesByDay = purchasedTickets.reduce((acc, ticket) => {
        const key = formatDateTime(new Date(ticket.created_at), DATE_FORMAT_ISO);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Tạo map lượt xem theo ngày từ dailyStats.views
    const viewsByDay = dailyStats.views.reduce((acc, view) => {
        const key = formatDateTime(view.date, DATE_FORMAT_ISO);
        acc[key] = view.count;
        return acc;
    }, {} as Record<string, number>);

    // Hợp nhất date và tạo analyticsData gồm views và purchases
    const allDates = Array.from(
        new Set([...Object.keys(viewsByDay), ...Object.keys(purchasesByDay)])
    );

    const analyticsData = allDates
        .map(dateKey => ({
            date: dateKey,
            purchases: purchasesByDay[dateKey] || 0,
            views: viewsByDay[dateKey] || 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const CustomTooltip = ({ active, label, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="flex flex-col gap-1.5 bg-bg-black-2 border border-bg-gray rounded-lg p-3 shadow-lg">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                    >
                        {`Ngày: ${label}`}
                    </Text>
                    {payload.map((entry: any, index: number) => {
                        let displayName = entry.name;
                        if (entry.name === 'views') displayName = 'Lượt xem';
                        if (entry.name === 'purchases') displayName = 'Mua vé';
                        if (entry.name === 'revenue') displayName = 'Doanh thu';

                        return (
                            <p
                                key={index}
                                className="text-sm"
                                style={{ color: entry.color }}
                            >
                                {`${displayName}: ${entry.value}${entry.name === 'revenue' ? ' VNĐ' : ''}`}
                            </p>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const PieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-bg-black-2 border border-bg-gray rounded-lg p-3 shadow-lg">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                    >
                        {`${data.name}: ${data.value} vé`}
                    </Text>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <Text
                modeSize={MODE_SIZE[20]}
                modeWeight={MODE_WEIGHT.LARGE}
                modeColor={MODE_COLOR_TEXT.WHITE}
                className="mb-6"
            >
                📊 Biểu đồ thống kê
            </Text>

            <div className="flex flex-col gap-6">
                <div className="flex flex-1 w-full gap-6">
                    {/* Biểu đồ tròn - Tổng số vé */}
                    <div className="flex flex-col flex-1 max-w-[30%] gap-2 bg-white/5 rounded-lg p-4 border border-white/10">
                        <Text
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            modeColor={MODE_COLOR_TEXT.WHITE}
                        >
                            🎫 Phân bố vé
                        </Text>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-2">
                            {pieData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <Text
                                        modeSize={MODE_SIZE[12]}
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                    >
                                        {item.name}: {item.value}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Biểu đồ đường - Lượt truy cập và mua vé */}
                    <div className="flex flex-col gap-2 flex-1 bg-white/5 rounded-lg p-4 border border-white/10">
                        <Text
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="mb-4"
                        >
                            📈 Lượt truy cập & Mua vé
                        </Text>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={analyticsData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={{
                                        fill: '#3B82F6',
                                        r: 4,
                                        strokeWidth: 2,
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="purchases"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    dot={{
                                        fill: '#10B981',
                                        r: 4,
                                        strokeWidth: 2,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <Text
                                    modeSize={MODE_SIZE[12]}
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                >
                                    Lượt xem
                                </Text>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <Text
                                    modeSize={MODE_SIZE[12]}
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                >
                                    Mua vé
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biểu đồ cột - Doanh thu theo ngày */}
                <div className="flex flex-col min-h-[300px] gap-2 flex-1 bg-white/5 rounded-lg p-4 border border-white/10">
                    <Text
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        className="mb-4"
                    >
                        💰 Doanh thu theo ngày
                    </Text>
                    {revenueData.length > 0 ? (
                        <ResponsiveContainer
                            width="100%"
                            height={200}
                            style={{ backgroundColor: '' }}
                        >
                            <BarChart data={revenueData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />
                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                    tickFormatter={value =>
                                        `${(value / 1000000).toFixed(1)}M`
                                    }
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="revenue"
                                    fill="#F59E0B"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-1 justify-center items-center h-full">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                Chưa có doanh thu từ sự kiện này
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
