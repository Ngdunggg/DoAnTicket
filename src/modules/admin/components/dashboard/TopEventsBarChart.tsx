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
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

type Row = { eventId: string; title: string; views: number };

const COLORS = ['#E6A800', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6'];

const wrapLines = (text: string, maxChars = 14): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const w of words) {
        if ((current + ' ' + w).trim().length <= maxChars) {
            current = (current + ' ' + w).trim();
        } else {
            if (current) lines.push(current);
            current = w;
        }
    }
    if (current) lines.push(current);
    return lines;
};

type TickProps = {
    payload?: { value?: string };
    x?: number;
    y?: number;
    [key: string]: unknown;
};
const TitleTick = (props: TickProps) => {
    const x = props.x ?? 0;
    const y = props.y ?? 0;
    const value = props.payload?.value ?? '';
    const lines = wrapLines(String(value));
    const lineHeight = 14;
    const totalHeight = lineHeight * lines.length;
    const startY = y + totalHeight / 2 - lineHeight / 2;
    return (
        <text x={x} y={startY} textAnchor="middle" fill="#374151" fontSize={12}>
            {lines.map((line, i) => (
                <tspan key={i} x={x} dy={i === 0 ? 0 : lineHeight}>
                    {line}
                </tspan>
            ))}
        </text>
    );
};

const TopEventsBarChart = ({ data }: { data: Row[] }) => {
    // Sort by views descending
    const sortedData = [...data].sort(
        (a, b) => (b.views || 0) - (a.views || 0)
    );

    const CustomTooltip = (tooltipData: {
        active?: boolean;
        label?: string;
        payload?: Array<{ payload?: Row; value?: number }>;
    }) => {
        const { active, label, payload } = tooltipData;
        if (active && payload && payload.length > 0) {
            const rowData = payload[0]?.payload as Row | undefined;
            const eventId = rowData?.eventId;

            // Tìm row bằng eventId để xử lý duplicate title
            const foundRow = eventId
                ? sortedData.find(r => r.eventId === eventId)
                : null;
            const views =
                foundRow?.views ?? rowData?.views ?? payload[0]?.value ?? 0;

            return (
                <div className="bg-black/80 rounded px-2 py-1 text-xs text-white">
                    <p>{label}</p>
                    <p>{`Views: ${views.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 box-shadow-ticket">
            <Text
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeWeight={MODE_WEIGHT.LARGE}
                modeSize={MODE_SIZE[18]}
            >
                {`Top ${sortedData.length} sự kiện được xem nhiều nhất`}
            </Text>
            <div className="mt-6 h-[620px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sortedData}
                        margin={{ bottom: 70, left: 10, right: 10, top: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="title"
                            interval={0}
                            height={70}
                            tickMargin={8}
                            tick={(props: TickProps) => (
                                <TitleTick {...props} />
                            )}
                            tickLine={false}
                            stroke="#9CA3AF"
                            fontSize={12}
                        />
                        <YAxis
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                            {sortedData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopEventsBarChart;
