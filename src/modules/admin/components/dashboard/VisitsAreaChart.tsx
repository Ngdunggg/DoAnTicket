import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { useMemo } from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Point = { date: string; value: number };

const VisitsAreaChart = ({
    data,
    title = 'Lượt truy cập sự kiện hàng ngày',
}: {
    data: Point[];
    title?: string;
}) => {
    const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

    const tooltipFormatter = (val: number) => `${val.toLocaleString()} views`;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 box-shadow-ticket">
            <div className="flex items-baseline justify-between">
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeSize={MODE_SIZE[18]}
                >
                    {title}
                </Text>
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeSize={MODE_SIZE[14]}
                >
                    Tổng: {total.toLocaleString()}
                </Text>
            </div>
            <div className="mt-3 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ bottom: 0, left: 0, right: 10, top: 10 }}
                    >
                        <defs>
                            <linearGradient
                                id="visitsFill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#E6A800"
                                    stopOpacity={0.35}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#E6A800"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <YAxis
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip
                            formatter={(v: number) => tooltipFormatter(v)}
                            labelStyle={{ color: '#111827' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#E6A800"
                            strokeWidth={2}
                            fill="url(#visitsFill)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VisitsAreaChart;
