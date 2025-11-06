import { MODE_BUTTON } from '@share/components/atoms/Button';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import Button from '@share/components/atoms/Button';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import MapPinIcon from '@share/components/atoms/icons/MapPinIcon';
import ArrowRightIcon from '@share/components/atoms/icons/ArrowRightIcon';
import TicketIcon from '@share/components/atoms/icons/TicketIcon';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import { Event } from '@share/types/event';
import Image from '@share/components/atoms/Image';
import {
    getEventImage,
    getEventLocation,
    getMinPrice,
} from '@modules/event-detail/utils/eventUtils';
import { IMAGE_TYPE } from '@share/constants/commons';

const EventPreviewHero = ({ event }: { event: Event }) => {
    return (
        <div className="bg-bg-black w-full min-h-[600px] flex items-center justify-center px-10">
            <div className="flex w-full h-[450px] relative">
                {/* Left Panel - Event Information */}
                <div className="w-1/3 flex flex-col justify-between bg-bg-gray p-10 rounded-l-2xl relative ticket-cut-left">
                    <div className="flex flex-col gap-6">
                        {/* Event Title */}
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[24]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            className="leading-tight"
                        >
                            {event.title}
                        </Text>

                        {/* Date and Time */}
                        <div className="flex items-center gap-3">
                            <CalendarIcon mode={MODE_CALENDAR.WHITE} />
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeSize={MODE_SIZE[16]}
                            >
                                {formatDateTime(
                                    event.start_time,
                                    DATE_TIME_FORMAT_ISO
                                )}{' '}
                                -{' '}
                                {formatDateTime(
                                    event.end_time,
                                    DATE_TIME_FORMAT_ISO
                                )}
                            </Text>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-3">
                            <MapPinIcon className="w-6 h-6 text-white" />

                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeSize={MODE_SIZE[16]}
                            >
                                {getEventLocation(event)}
                            </Text>
                        </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                Giá từ
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeSize={MODE_SIZE[18]}
                            >
                                {getMinPrice(event)}
                            </Text>
                            <ArrowRightIcon className=" text-white" />
                        </div>

                        <Button
                            icon={<TicketIcon />}
                            mode={MODE_BUTTON.DECORATIVE_YELLOW}
                            disabled
                        >
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[16]}
                            >
                                Mua vé ngay
                            </Text>
                        </Button>
                    </div>
                </div>

                {/* Dashed Separator Line */}
                <div className="absolute left-1/3 top-10 bottom-10 w-2 z-5">
                    <div className="h-full w-full custom-dashed-border-vertical" />
                </div>

                {/* Right Panel - Event Poster */}
                <div className="w-2/3 overflow-hidden rounded-r-2xl relative">
                    <Image
                        src={getEventImage(event, IMAGE_TYPE.BANNER)}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default EventPreviewHero;
