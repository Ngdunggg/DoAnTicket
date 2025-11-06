import { useState } from 'react';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import TicketIcon from '@share/components/atoms/icons/TicketIcon';
import DivClick from '@share/components/atoms/DivClick';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import { Event } from '@share/types/event';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import { formatPrice } from '@modules/event-detail/utils/eventUtils';

const EventPreviewTickets = ({ event }: { event: Event }) => {
    const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

    const toggleDateExpansion = (dateId: string) => {
        setExpandedDates(prev => {
            const newSet = new Set(prev);
            if (newSet.has(dateId)) {
                newSet.delete(dateId);
            } else {
                newSet.add(dateId);
            }
            return newSet;
        });
    };
    console.log(event);
    return (
        <div className="px-4">
            <div className="flex flex-col bg-white rounded-2xl p-2 box-shadow-ticket border border-gray-200">
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    className="mb-2 border-b border-gray-300 p-4"
                >
                    Thông tin vé
                </Text>

                {/* Event Dates */}
                {event.dates.map(date => {
                    const isExpanded = expandedDates.has(date.id);

                    return (
                        <div key={date.id} className="">
                            {/* Date Header */}
                            <DivClick
                                onClick={() => toggleDateExpansion(date.id)}
                                className="flex-1 flex items-center justify-between gap-4 py-3 px-4 hover:bg-gray-50 transition-colors rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronIcon
                                        direction={
                                            isExpanded
                                                ? MODE_CHEVRON_DIRECTION.DOWN
                                                : MODE_CHEVRON_DIRECTION.RIGHT
                                        }
                                        mode={MODE_CHEVRON.BLACK}
                                        className="w-5 h-5"
                                    />
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.BLACK}
                                        modeSize={MODE_SIZE[18]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {formatDateTime(
                                            date.start_at,
                                            DATE_FORMAT_ISO
                                        )}
                                    </Text>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.BLACK}
                                        modeSize={MODE_SIZE[14]}
                                        className="px-2 py-1 rounded-full"
                                    >
                                        {event.ticket_types.length} hạng vé
                                    </Text>
                                </div>
                                <Button
                                    mode={MODE_BUTTON.DECORATIVE_YELLOW}
                                    icon={<TicketIcon />}
                                    disabled
                                >
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.BLACK}
                                        modeSize={MODE_SIZE[14]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Mua vé
                                    </Text>
                                </Button>
                            </DivClick>

                            {/* Expandable Ticket List */}
                            {isExpanded && (
                                <div className="px-4 pb-4">
                                    <div className="space-y-3">
                                        {event.ticket_types.map(ticket => (
                                            <div
                                                key={ticket.id}
                                                className="rounded-lg p-4 transition-all bg-white border border-gray-200 hover:shadow-md"
                                            >
                                                {/* Ticket Header */}
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Text
                                                                modeColor={
                                                                    MODE_COLOR_TEXT.BLACK
                                                                }
                                                                modeSize={
                                                                    MODE_SIZE[18]
                                                                }
                                                                modeWeight={
                                                                    MODE_WEIGHT.MEDIUM
                                                                }
                                                            >
                                                                {ticket.name}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <Text
                                                                modeColor={
                                                                    MODE_COLOR_TEXT.BLACK
                                                                }
                                                                modeSize={
                                                                    MODE_SIZE[18]
                                                                }
                                                                modeWeight={
                                                                    MODE_WEIGHT.LARGE
                                                                }
                                                            >
                                                                {formatPrice(
                                                                    ticket.price
                                                                )}
                                                            </Text>
                                                        </div>
                                                        {ticket.remaining_quantity ===
                                                            0 && (
                                                            <div className="bg-red-100 rounded-full px-3 py-1 w-fit">
                                                                <Text
                                                                    modeColor={
                                                                        MODE_COLOR_TEXT.RED
                                                                    }
                                                                    modeSize={
                                                                        MODE_SIZE[14]
                                                                    }
                                                                    modeWeight={
                                                                        MODE_WEIGHT.MEDIUM
                                                                    }
                                                                >
                                                                    Hết vé
                                                                </Text>
                                                            </div>
                                                        )}
                                                        {ticket.remaining_quantity >
                                                            0 &&
                                                            ticket.remaining_quantity <=
                                                                10 && (
                                                                <div className="bg-orange-100 rounded-full px-3 py-1 w-fit">
                                                                    <Text
                                                                        modeColor={
                                                                            MODE_COLOR_TEXT.YELLOW
                                                                        }
                                                                        modeSize={
                                                                            MODE_SIZE[14]
                                                                        }
                                                                        modeWeight={
                                                                            MODE_WEIGHT.MEDIUM
                                                                        }
                                                                    >
                                                                        Sắp hết
                                                                        vé
                                                                    </Text>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>

                                                {/* Ticket Info */}
                                                <div className="flex flex-wrap gap-2">
                                                    <div className="bg-gray-100 rounded-full px-3 py-1">
                                                        <Text
                                                            modeColor={
                                                                MODE_COLOR_TEXT.BLACK
                                                            }
                                                            modeSize={
                                                                MODE_SIZE[14]
                                                            }
                                                            modeWeight={
                                                                MODE_WEIGHT.MEDIUM
                                                            }
                                                        >
                                                            Còn lại:{' '}
                                                            {
                                                                ticket.remaining_quantity
                                                            }
                                                            /
                                                            {
                                                                ticket.initial_quantity
                                                            }
                                                        </Text>
                                                    </div>
                                                    {ticket.remaining_quantity >
                                                        0 && (
                                                        <div className="bg-green-100 rounded-full px-3 py-1">
                                                            <Text
                                                                modeColor={
                                                                    MODE_COLOR_TEXT.GREEN
                                                                }
                                                                modeSize={
                                                                    MODE_SIZE[14]
                                                                }
                                                                modeWeight={
                                                                    MODE_WEIGHT.MEDIUM
                                                                }
                                                            >
                                                                Có sẵn
                                                            </Text>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventPreviewTickets;
