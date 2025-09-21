/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import { EventStats, TicketType } from '@share/types/ticket';
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

interface ChartsSectionProps {
    stats: EventStats;
    ticketTypes: TicketType[];
}

const ChartsSection = ({ stats, ticketTypes }: ChartsSectionProps) => {
    // Dữ liệu cho biểu đồ tròn (vé đã bán vs còn lại)
    const pieData = [
        { color: '#10B981', name: 'Đã bán', value: stats.totalTicketsSold },
        {
            color: '#6B7280',
            name: 'Còn lại',
            value: stats.totalTicketsAvailable - stats.totalTicketsSold,
        },
    ];

    // Mock dữ liệu doanh thu theo ngày (7 ngày gần nhất)
    const revenueData = [
        { date: '15/12', revenue: 2500000 },
        { date: '16/12', revenue: 3200000 },
        { date: '17/12', revenue: 1800000 },
        { date: '18/12', revenue: 4200000 },
        { date: '19/12', revenue: 3800000 },
        { date: '20/12', revenue: 2900000 },
        { date: '21/12', revenue: 3500000 },
    ];

    // Mock dữ liệu lượt truy cập và mua vé theo ngày
    const analyticsData = [
        { date: '15/12', purchases: 8, views: 120 },
        { date: '16/12', purchases: 12, views: 180 },
        { date: '17/12', purchases: 6, views: 95 },
        { date: '18/12', purchases: 18, views: 220 },
        { date: '19/12', purchases: 14, views: 195 },
        { date: '20/12', purchases: 11, views: 160 },
        { date: '21/12', purchases: 16, views: 210 },
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            minimumFractionDigits: 0,
            style: 'currency',
        }).format(value);
    };

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
                <div className="flex flex-col gap-2 flex-1 bg-white/5 rounded-lg p-4 border border-white/10">
                    <Text
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        className="mb-4"
                    >
                        💰 Doanh thu theo ngày
                    </Text>
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
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
