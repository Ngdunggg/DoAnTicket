import DivClick from "@share/components/atoms/DivClick";
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from "@share/components/atoms/icons/ChevronIcon";
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_LEADING,
} from "@share/components/atoms/Text";
import { useState } from "react";

interface EventDescriptionProps {
    description: string;
    highlights: string[];
    requirements: string[];
    additionalInfo: {
        duration: string;
        language: string;
        ageRestriction: string;
        dressCode?: string;
    };
}

const EventDescription = ({
    description,
    highlights,
    requirements,
    additionalInfo,
}: EventDescriptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="px-4 py-8 bg-white">
            <div className="rounded-2xl p-8 box-shadow-ticket">
                <div
                    className={`relative overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-none" : "max-h-96"}`}
                >
                    {/* Fade-out overlay when not expanded */}
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 fade-out-overlay pointer-events-none z-5"></div>
                    )}
                    {/* Description */}
                    <div className="flex flex-col mb-8 gap-2">
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
                            {description}
                        </Text>
                    </div>

                    {/* Highlights */}
                    <div className="mb-8">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Điểm nổi bật
                        </Text>
                        <div className="space-y-3">
                            {highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-text-yellow rounded-full mt-2 flex-shrink-0" />
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                        modeSize={MODE_SIZE[16]}
                                        isAllowLineBreaks
                                    >
                                        {highlight}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Yêu cầu tham gia
                        </Text>
                        <div className="space-y-3">
                            {requirements.map((requirement, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-text-red rounded-full mt-2 flex-shrink-0" />
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                        modeSize={MODE_SIZE[16]}
                                        isAllowLineBreaks
                                    >
                                        {requirement}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Thông tin bổ sung
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    Thời lượng:
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.BLACK}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {additionalInfo.duration}
                                </Text>
                            </div>
                            <div className="flex justify-between">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    Ngôn ngữ:
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.BLACK}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {additionalInfo.language}
                                </Text>
                            </div>
                            <div className="flex justify-between">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    Độ tuổi:
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.BLACK}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {additionalInfo.ageRestriction}
                                </Text>
                            </div>
                            {additionalInfo.dressCode && (
                                <div className="flex justify-between">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                        modeSize={MODE_SIZE[14]}
                                    >
                                        Trang phục:
                                    </Text>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.BLACK}
                                        modeSize={MODE_SIZE[14]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {additionalInfo.dressCode}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Read More/Less Button */}
                <DivClick
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="cursor-pointer flex justify-center mt-6"
                >
                    <ChevronIcon
                        size={20}
                        mode={MODE_CHEVRON.BLACK}
                        direction={
                            isExpanded ? MODE_CHEVRON_DIRECTION.UP : MODE_CHEVRON_DIRECTION.DOWN
                        }
                    />
                </DivClick>
            </div>
        </div>
    );
};

export default EventDescription;
