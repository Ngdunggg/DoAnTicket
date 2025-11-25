import { TicketType, SelectedTicket } from '../../types/ticketPurchase';
import Button from '@share/components/atoms/Button';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { formatPrice } from '../../utils/eventUtils';

interface TicketSelectionLeftProps {
    onTicketChange: (_tickets: SelectedTicket[]) => void;
    selectedTickets: SelectedTicket[];
    ticketTypes: TicketType[];
}

const TicketSelectionLeft = ({
    onTicketChange,
    selectedTickets,
    ticketTypes,
}: TicketSelectionLeftProps) => {
    const updateTicketQuantity = (ticketType: TicketType, quantity: number) => {
        const updatedTickets = selectedTickets.filter(
            t => t.ticketType.id !== ticketType.id
        );

        if (quantity > 0) {
            updatedTickets.push({ quantity, ticketType });
        }

        onTicketChange(updatedTickets);
    };

    const getTicketQuantity = (ticketTypeId: string) => {
        const selected = selectedTickets.find(
            t => t.ticketType.id === ticketTypeId
        );
        return selected ? selected.quantity : 0;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 px-4">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Loại vé
                </Text>
                <Text
                    modeColor={MODE_COLOR_TEXT.GRAY}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    Số lượng
                </Text>
            </div>

            {ticketTypes.map(ticketType => {
                const quantity = getTicketQuantity(ticketType.id);
                const isAvailable = ticketType.available > 0;

                return (
                    <div
                        key={ticketType.id}
                        className="bg-bg-black-2 border-b-2 border-bg-gray border-dashed p-4"
                    >
                        <div className="flex justify-between">
                            <div className="flex-1 flex flex-col gap-2">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[18]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                    className="mb-2"
                                >
                                    {ticketType.name}
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.YELLOW}
                                    modeSize={MODE_SIZE[18]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                >
                                    {formatPrice(ticketType.price)}
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                    modeSize={MODE_SIZE[14]}
                                    className="mb-2"
                                >
                                    {ticketType.description}
                                </Text>
                            </div>

                            {isAvailable ? (
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={() =>
                                            updateTicketQuantity(
                                                ticketType,
                                                quantity - 1
                                            )
                                        }
                                        disabled={quantity <= 0}
                                        className="w-10 h-10 rounded-full bg-bg-gray hover:bg-bg-gray-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[18]}
                                        >
                                            -
                                        </Text>
                                    </Button>

                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeSize={MODE_SIZE[18]}
                                        modeWeight={MODE_WEIGHT.LARGE}
                                        className="min-w-[2rem] text-center"
                                    >
                                        {quantity}
                                    </Text>

                                    <Button
                                        onClick={() =>
                                            updateTicketQuantity(
                                                ticketType,
                                                quantity + 1
                                            )
                                        }
                                        disabled={
                                            quantity >=
                                                ticketType.maxPerOrder ||
                                            quantity >= ticketType.available
                                        }
                                        className="w-10 h-10 rounded-full bg-bg-gray hover:bg-bg-gray-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[18]}
                                        >
                                            +
                                        </Text>
                                    </Button>
                                </div>
                            ) : (
                                <Text
                                    modeColor={MODE_COLOR_TEXT.RED}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    Hết vé
                                </Text>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TicketSelectionLeft;
