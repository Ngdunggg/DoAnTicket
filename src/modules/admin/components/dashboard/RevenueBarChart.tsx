import Image from '@share/components/atoms/Image';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';

type RevenuePoint = { id: string; image: string; title: string; value: number };

const RevenueBarChart = ({
    data,
    title = 'Doanh thu (sự kiện có doanh thu cao nhất)',
}: {
    data: RevenuePoint[];
    title?: string;
}) => {
    const max = Math.max(1, ...data.map(d => d.value));
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 box-shadow-ticket">
            <Text
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeWeight={MODE_WEIGHT.LARGE}
                modeSize={MODE_SIZE[18]}
            >
                {title}
            </Text>
            <div className="mt-3 grid grid-cols-1 gap-2">
                {data.map(d => (
                    <div key={d.id} className="flex items-center gap-3">
                        <Image
                            src={d.image}
                            alt={d.title}
                            className="rounded-2xl max-w-26 max-h-26 object-cover"
                        />
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="w-24"
                        >
                            {d.title}
                        </Text>
                        <div className="h-3 flex-1 rounded bg-gray-100">
                            <div
                                className="h-3 rounded bg-emerald-500"
                                style={{ width: `${(d.value / max) * 100}%` }}
                            />
                        </div>
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="w-20"
                        >
                            {d.value.toLocaleString()} VND
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevenueBarChart;
