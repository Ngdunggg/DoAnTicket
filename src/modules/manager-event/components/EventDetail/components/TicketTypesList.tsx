import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import { TicketType } from '@share/types/ticket';

interface TicketTypesListProps {
    ticketTypes: TicketType[];
}

const TicketTypesList = ({ ticketTypes }: TicketTypesListProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            style: 'currency',
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const getProgressPercentage = (sold: number, total: number) => {
        return total > 0 ? (sold / total) * 100 : 0;
    };

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
                    const progressPercentage = getProgressPercentage(
                        ticket.soldQuantity,
                        ticket.totalQuantity
                    );
                    const remainingTickets =
                        ticket.totalQuantity - ticket.soldQuantity;

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
                                        {formatCurrency(ticket.price)}
                                    </Text>
                                    {ticket.description && (
                                        <Text
                                            modeSize={MODE_SIZE[12]}
                                            modeColor={MODE_COLOR_TEXT.GRAY}
                                        >
                                            {ticket.description}
                                        </Text>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Text
                                        modeSize={MODE_SIZE[14]}
                                        modeColor={MODE_COLOR_TEXT.GRAY}
                                    >
                                        còn lại:{' '}
                                        {formatNumber(remainingTickets)}
                                    </Text>
                                    <Text
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                    >
                                        {formatNumber(ticket.soldQuantity)}/
                                        {formatNumber(ticket.totalQuantity)}
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
                                    {formatCurrency(
                                        ticket.price * ticket.soldQuantity
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
