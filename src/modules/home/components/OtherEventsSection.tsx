import DivClick from '@share/components/atoms/DivClick';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import EventGrid from '@share/components/organisms/EventGrid';
import { Event } from '@share/types/event';
import { useState } from 'react';

interface OtherEventsSectionProps {
    category?: string[];
    events: Event[];
    mode?: 'week' | 'month' | false;
    monthEvents?: Event[];
    onViewEvent: (_eventId: string) => void;
    title: string;
    weekEvents?: Event[];
}

const OtherEventsSection = ({
    category = [],
    events,
    mode = false,
    monthEvents = [],
    onViewEvent,
    title,
    weekEvents = [],
}: OtherEventsSectionProps) => {
    const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

    const getCurrentEvents = () => {
        if (mode === 'week') {
            return activeTab === 'week' ? weekEvents : monthEvents;
        }
        return events;
    };

    return (
        <div className="mb-8 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
                {mode ? (
                    <div className="flex items-center gap-4">
                        <DivClick
                            onClick={() => setActiveTab('week')}
                            className={`${activeTab === 'week' ? 'border-b-2 border-bg-yellow' : ''} pb-2`}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[24]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                Trong tuần này
                            </Text>
                        </DivClick>
                        <DivClick
                            onClick={() => setActiveTab('month')}
                            className={`${activeTab === 'month' ? 'border-b-2 border-bg-yellow' : ''} pb-2`}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[24]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                Trong tháng này
                            </Text>
                        </DivClick>
                    </div>
                ) : (
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        {title}
                    </Text>
                )}
                <DivClick
                    onClick={() => {
                        console.log(category);
                    }}
                    className="flex items-center gap-2"
                >
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Xem thêm
                    </Text>
                    <ChevronIcon
                        mode={MODE_CHEVRON.WHITE}
                        direction={MODE_CHEVRON_DIRECTION.RIGHT}
                    />
                </DivClick>
            </div>
            <EventGrid events={getCurrentEvents()} onViewEvent={onViewEvent} />
        </div>
    );
};

export default OtherEventsSection;
