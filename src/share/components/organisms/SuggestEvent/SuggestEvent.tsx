import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import EventGrid from '@share/components/organisms/EventGrid';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import useSuggestEvent from './hooks/useSuggestEvent';

export const SUGGEST_EVENT_MODE = {
    DEFAULT: 'default',
    POPUP: 'popup',
} as const;

type SuggestEventProps = {
    limit?: number;
    mode?: (typeof SUGGEST_EVENT_MODE)[keyof typeof SUGGEST_EVENT_MODE];
};

const SuggestEvent = ({
    limit = 8,
    mode = SUGGEST_EVENT_MODE.DEFAULT,
}: SuggestEventProps) => {
    const { handleEventClick, handleMoreEvent, isLoading, suggestedEvents } =
        useSuggestEvent(limit);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <Text modeColor={MODE_COLOR_TEXT.WHITE}>Đang tải...</Text>
            </div>
        );
    }

    if (suggestedEvents.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="h-[1px] w-full bg-bg-gray-2" />
            {mode === SUGGEST_EVENT_MODE.DEFAULT && (
                <div className="flex flex-1 items-center justify-center mb-4">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Có thể bạn cũng thích
                    </Text>
                </div>
            )}

            <EventGrid
                events={suggestedEvents}
                onViewEvent={handleEventClick}
                mode={mode}
            />

            <div className="flex justify-center">
                <Button mode={MODE_BUTTON.YELLOW} onClick={handleMoreEvent}>
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Xem thêm sự kiện
                    </Text>
                </Button>
            </div>
        </div>
    );
};

export default SuggestEvent;
