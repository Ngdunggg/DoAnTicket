import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import { EventReport } from '@share/types/event';
import { formatPrice } from '@modules/event-detail/utils/eventUtils';

interface TicketTypesListProps {
    ticketTypes: EventReport['ticket_types'];
}

const TicketTypesList = ({ ticketTypes }: TicketTypesListProps) => {
    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-red-500';
        if (percentage >= 60) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="flex flex-col flex-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <Text
                modeSize={MODE_SIZE[20]}
                modeWeight={MODE_WEIGHT.LARGE}
                modeColor={MODE_COLOR_TEXT.WHITE}
                className="mb-6"
            >
                🎫 Các loại vé
            </Text>

            <div className="flex flex-col gap-4">
                {ticketTypes.map(ticket => {
                    const progressPercentage = ticket.sold_percentage;

                    return (
                        <div
                            key={ticket.id}
                            className="flex flex-col gap-2 bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex-1 flex gap-2">
                                    <Text
                                        modeSize={MODE_SIZE[16]}
                                        modeWeight={MODE_WEIGHT.LARGE}
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                    >
                                        {ticket.name}
                                    </Text>
                                    <Text
                                        modeSize={MODE_SIZE[14]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                    >
                                        {formatPrice(ticket.price)}
                                    </Text>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Text
                                        modeSize={MODE_SIZE[14]}
                                        modeColor={MODE_COLOR_TEXT.GRAY}
                                    >
                                        còn lại: {ticket.remaining_quantity}
                                    </Text>
                                    <Text
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                    >
                                        {ticket.sold_quantity}/
                                        {ticket.initial_quantity}
                                    </Text>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <Text
                                    modeSize={MODE_SIZE[14]}
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                >
                                    {progressPercentage.toFixed(1)}% đã bán
                                </Text>
                                <Text
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeColor={MODE_COLOR_TEXT.GREEN}
                                >
                                    Doanh thu:{' '}
                                    {formatPrice(
                                        ticket.price * ticket.sold_quantity
                                    )}
                                </Text>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TicketTypesList;
