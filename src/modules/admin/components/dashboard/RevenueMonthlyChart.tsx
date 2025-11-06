import { useMemo, useState } from 'react';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type MonthRevenue = { month: string; revenue: number; year: number };

const RANGE = {
    SIX: '6M',
    TWELVE: '12M',
} as const;
type RangeKey = (typeof RANGE)[keyof typeof RANGE];

const RevenueMonthlyChart = ({
    data,
    title = 'Doanh thu theo tháng',
}: {
    data: MonthRevenue[];
    title?: string;
}) => {
    const years = useMemo(
        () => Array.from(new Set(data.map(d => d.year))).sort((a, b) => a - b),
        [data]
    );
    const [year, setYear] = useState<number>(
        years[years.length - 1] ?? new Date().getFullYear()
    );
    const [range, setRange] = useState<RangeKey>(RANGE.TWELVE);

    const filtered = useMemo(
        () => data.filter(d => d.year === year),
        [data, year]
    );
    const sliced = useMemo(
        () => (range === RANGE.SIX ? filtered.slice(-6) : filtered.slice(-12)),
        [filtered, range]
    );
    const total = useMemo(
        () => sliced.reduce((s, d) => s + d.revenue, 0),
        [sliced]
    );

    const tooltipFormatter = (val: number) => `${val.toLocaleString()} VND`;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 box-shadow-ticket">
            <div className="flex items-center justify-between">
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeSize={MODE_SIZE[18]}
                >
                    {title}
                </Text>
                <div className="flex items-center gap-3">
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeSize={MODE_SIZE[14]}
                    >
                        Total: {total.toLocaleString()} VND
                    </Text>
                    <select
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                        value={year}
                        onChange={e => setYear(Number(e.target.value))}
                    >
                        {years.map(y => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                    <select
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                        value={range}
                        onChange={e => setRange(e.target.value as RangeKey)}
                    >
                        <option value={RANGE.SIX}>Last 6 months</option>
                        <option value={RANGE.TWELVE}>Last 12 months</option>
                    </select>
                </div>
            </div>
            <div className="mt-3 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sliced}
                        margin={{ bottom: 0, left: 10, right: 10, top: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#374151', fontSize: 12 }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip
                            formatter={(v: number) => tooltipFormatter(v)}
                            labelStyle={{ color: '#111827' }}
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#10B981"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueMonthlyChart;
