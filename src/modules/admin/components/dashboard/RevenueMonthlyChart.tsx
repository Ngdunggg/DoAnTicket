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
import DropDown, { IDropDownOption } from '@share/components/atoms/DropDown';

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

    const yearOptions: IDropDownOption<number>[] = useMemo(
        () => years.map(y => ({ label: String(y), value: y })),
        [years]
    );

    const rangeOptions: IDropDownOption<RangeKey>[] = useMemo(
        () => [
            { label: '6 tháng', value: RANGE.SIX },
            { label: '12 tháng', value: RANGE.TWELVE },
        ],
        []
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
                    <Text>Total: {total.toLocaleString()} VND</Text>
                    <DropDown
                        className="!w-[120px] rounded-xl"
                        mode="default"
                        onChange={value => {
                            if (value !== null && typeof value === 'number') {
                                setYear(value);
                            }
                        }}
                        options={yearOptions}
                        value={year}
                        panelClassName="rounded-xl"
                    />
                    <DropDown
                        className="!w-[150px] rounded-xl"
                        mode="default"
                        onChange={value => {
                            if (value !== null && typeof value === 'string') {
                                setRange(value as RangeKey);
                            }
                        }}
                        options={rangeOptions}
                        value={range}
                        panelClassName="rounded-xl"
                    />
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
