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

interface TicketType {
    available: number;
    benefits: string[];
    description: string;
    id: string;
    isPopular?: boolean;
    name: string;
    originalPrice?: number;
    price: number;
}

interface EventDate {
    date: string;
    id: string;
    tickets: TicketType[];
}

interface TicketSectionProps {
    onBuyTickets: (dateId: string) => void;
    ticketsData: EventDate[];
}

const TicketSection = ({ onBuyTickets, ticketsData }: TicketSectionProps) => {
    const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

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

    const handleBuyTickets = (dateId: string, event: React.MouseEvent) => {
        event.stopPropagation(); // Ngăn sự kiện bubble lên
        onBuyTickets(dateId);
    };

    return (
        <div className="px-4 py-8 bg-white">
            <div className="flex flex-col bg-bg-black rounded-2xl p-2 box-shadow-ticket">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    className="mb-2 border-b border-gray-200 p-4"
                >
                    Thông tin vé
                </Text>

                {/* Date List */}

                {ticketsData.map(date => {
                    const isExpanded = expandedDates.has(date.id);

                    return (
                        <div key={date.id} className="">
                            {/* Date Header */}
                            <DivClick
                                onClick={() => toggleDateExpansion(date.id)}
                                className="flex-1 flex items-center justify-between gap-4 py-3 px-4"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronIcon
                                        direction={
                                            isExpanded
                                                ? MODE_CHEVRON_DIRECTION.DOWN
                                                : MODE_CHEVRON_DIRECTION.RIGHT
                                        }
                                        mode={MODE_CHEVRON.WHITE}
                                        className="w-5 h-5"
                                    />
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeSize={MODE_SIZE[18]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {formatDate(date.date)}
                                    </Text>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                        modeSize={MODE_SIZE[14]}
                                    >
                                        {date.tickets.length} hạng vé
                                    </Text>
                                </div>
                                <Button
                                    mode={MODE_BUTTON.DECORATIVE_YELLOW}
                                    onClick={e => handleBuyTickets(date.id, e)}
                                    icon={<TicketIcon />}
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
                                    <div className="space-y-2">
                                        {date.tickets.map(
                                            (ticket, ticketIndex) => (
                                                <div
                                                    key={ticket.id}
                                                    className={`rounded-lg p-4 transition-all ${
                                                        ticketIndex % 2 === 0
                                                            ? 'bg-bg-black-2'
                                                            : 'bg-bg-gray'
                                                    } ${
                                                        ticket.isPopular
                                                            ? 'ring-2 ring-bg-yellow ring-opacity-50'
                                                            : ''
                                                    }`}
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
                                                                    {
                                                                        ticket.name
                                                                    }
                                                                </Text>
                                                                {ticket.isPopular && (
                                                                    <span className="bg-bg-yellow text-text-black px-2 py-1 rounded-full text-xs font-medium">
                                                                        Phổ biến
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <Text
                                                                modeColor={
                                                                    MODE_COLOR_TEXT.GRAY_SECONDARY
                                                                }
                                                                modeSize={
                                                                    MODE_SIZE[16]
                                                                }
                                                                isAllowLineBreaks
                                                            >
                                                                {
                                                                    ticket.description
                                                                }
                                                            </Text>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <div className="flex items-center gap-2">
                                                                {ticket.originalPrice && (
                                                                    <Text
                                                                        modeColor={
                                                                            MODE_COLOR_TEXT.GRAY_SECONDARY
                                                                        }
                                                                        modeSize={
                                                                            MODE_SIZE[14]
                                                                        }
                                                                        className="line-through"
                                                                    >
                                                                        {ticket.originalPrice.toLocaleString()}{' '}
                                                                        VNĐ
                                                                    </Text>
                                                                )}
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
                                                                    {ticket.price.toLocaleString()}{' '}
                                                                    VNĐ
                                                                </Text>
                                                            </div>
                                                            {ticket.available ===
                                                                0 && (
                                                                <div className="bg-bg-red-light rounded-full px-3 py-1 w-fit">
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
                                                        </div>
                                                    </div>

                                                    {/* Benefits */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {ticket.benefits.map(
                                                            (
                                                                benefit,
                                                                index
                                                            ) => (
                                                                <Text
                                                                    key={index}
                                                                    modeColor={
                                                                        MODE_COLOR_TEXT.GRAY_SECONDARY
                                                                    }
                                                                    modeSize={
                                                                        MODE_SIZE[14]
                                                                    }
                                                                    modeWeight={
                                                                        MODE_WEIGHT.MEDIUM
                                                                    }
                                                                >
                                                                    {benefit}
                                                                </Text>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
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

export default TicketSection;
