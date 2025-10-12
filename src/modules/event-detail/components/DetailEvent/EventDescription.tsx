import DivClick from '@share/components/atoms/DivClick';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_LEADING,
} from '@share/components/atoms/Text';
import { useState, useEffect, useRef } from 'react';
import { Event } from '@share/types/event';

const EventDescription = ({ eventDetail }: { eventDetail: Event }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToggleButton, setShowToggleButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            // Nếu nội dung chưa vượt quá 400px thì mặc định mở
            if (contentHeight <= 400) {
                setIsExpanded(true);
                setShowToggleButton(false);
            } else {
                setShowToggleButton(true);
            }
        }
    }, [eventDetail.description]);

    return (
        <div className="px-4">
            <div className="rounded-2xl p-8 box-shadow-ticket bg-white border border-gray-200">
                <div
                    className={`relative overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-none' : 'max-h-96'}`}
                >
                    {/* Fade-out overlay when not expanded */}
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 fade-out-overlay pointer-events-none z-5"></div>
                    )}
                    {/* Description */}
                    <div ref={contentRef} className="flex flex-col mb-8 gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[20]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            Giới thiệu
                        </Text>
                        <div className="h-px w-full bg-gray-300" />
                        <Text
                            modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                            modeSize={MODE_SIZE[16]}
                            modeLeading={MODE_LEADING.MEDIUM}
                            isAllowLineBreaks
                        >
                            {eventDetail.description}
                        </Text>
                    </div>
                </div>

                {/* Read More/Less Button - chỉ hiện khi nội dung > 400px */}
                {showToggleButton && (
                    <DivClick
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="cursor-pointer flex justify-center mt-6"
                    >
                        <ChevronIcon
                            size={20}
                            mode={MODE_CHEVRON.BLACK}
                            direction={
                                isExpanded
                                    ? MODE_CHEVRON_DIRECTION.UP
                                    : MODE_CHEVRON_DIRECTION.DOWN
                            }
                        />
                    </DivClick>
                )}
            </div>
        </div>
    );
};

export default EventDescription;
