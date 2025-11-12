import Image from '@share/components/atoms/Image';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { Event } from '@share/types/event';
import { useMemo } from 'react';
import { getEventImage } from '@modules/event-detail/utils/eventUtils';
import { IMAGE_TYPE } from '@share/constants/commons';
import CountUp from 'react-countup';

const TopEvents = ({ events }: { events: Event[] }) => {
    const topEvents = useMemo(
        () =>
            [...events]
                .sort((a, b) => (b.total_views || 0) - (a.total_views || 0))
                .slice(0, 3),
        [events]
    );

    if (topEvents.length === 0) return null;

    const renderRankingNumber = (rank: number) => {
        return (
            <div className="absolute -left-6 -top-8 z-10">
                <span
                    className="
                        text-[120px] font-black leading-none
                        text-text-yellow
                        drop-shadow-[2px_4px_6px_rgba(0,0,0,0.7)]
                        font-mono tracking-wider
                    "
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))',
                        fontFamily: "'Orbitron', 'Arial Black', sans-serif",
                        WebkitTextStroke: '2px #92400e',
                    }}
                >
                    <CountUp end={rank} duration={1} delay={0.2} start={0} />
                </span>
            </div>
        );
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 box-shadow-ticket">
            <Text
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeWeight={MODE_WEIGHT.LARGE}
                modeSize={MODE_SIZE[18]}
            >
                Top 3 sự kiện được xem nhiều nhất
            </Text>
            <div className="mt-3">
                <div className="flex gap-6 px-10">
                    <div className="flex flex-col gap-2 mt-12 relative flex-1">
                        {renderRankingNumber(2)}
                        <div className="w-full aspect-square relative">
                            <Image
                                src={
                                    getEventImage(
                                        topEvents[1],
                                        IMAGE_TYPE.CARD
                                    ) || ''
                                }
                                alt={topEvents[1]?.title || ''}
                                className="w-full h-full object-cover rounded-3xl shadow-md"
                            />
                            <div className="bg-bg-black/30 absolute inset-0 rounded-3xl w-full h-full shadow-md">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[20]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    className="absolute top-0 left-10 p-4"
                                >
                                    {topEvents[1]?.title || ''}
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-8 relative flex-1">
                        {renderRankingNumber(1)}

                        <div className="w-full aspect-square relative">
                            <Image
                                src={
                                    getEventImage(
                                        topEvents[0],
                                        IMAGE_TYPE.CARD
                                    ) || ''
                                }
                                alt={topEvents[0]?.title || ''}
                                className="w-full h-full object-cover rounded-3xl shadow-md"
                            />
                            <div className="bg-bg-black/30 absolute inset-0 rounded-3xl w-full h-full shadow-md">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[20]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    className="absolute top-0 left-8 p-4"
                                >
                                    {topEvents[0]?.title || ''}
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-12 relative flex-1">
                        {renderRankingNumber(3)}
                        <div className="w-full aspect-square relative">
                            <Image
                                src={
                                    getEventImage(
                                        topEvents[2],
                                        IMAGE_TYPE.CARD
                                    ) || ''
                                }
                                alt={topEvents[2]?.title || ''}
                                className="w-full h-full object-cover rounded-3xl shadow-md"
                            />
                            <div className="bg-bg-black/30 absolute inset-0 rounded-3xl w-full h-full shadow-md">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[20]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    className="absolute top-0 left-10 p-4"
                                >
                                    {topEvents[2]?.title || ''}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopEvents;
