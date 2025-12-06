import { MODE_DOUBLE_CHEVRON } from '@share/components/atoms/icons/DoubleChevronIcon';
import DoubleChevronIcon from '@share/components/atoms/icons/DoubleChevronIcon';
import { SelectedTicket, TicketType } from '../../types/ticketPurchase';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import { MODE_LEADING, Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import MapPinIcon from '@share/components/atoms/icons/MapPinIcon';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import { formatPrice } from '../../utils/eventUtils';

interface EventInfo {
    date: string;
    id: string;
    location: string;
    title: string;
}

interface TicketInfoRightProps {
    eventInfo: EventInfo;
    isLoading?: boolean;
    onPayment: () => void;
    selectedTickets: SelectedTicket[];
    ticketTypes: TicketType[];
    totalAmount: number;
}

const TicketInfoRight = ({
    eventInfo,
    isLoading = false,
    onPayment,
    selectedTickets,
    ticketTypes,
    totalAmount,
}: TicketInfoRightProps) => {
    const totalTicketQuantity = selectedTickets.reduce(
        (total, selectedTicket) => {
            return total + selectedTicket.quantity;
        },
        0
    );

    const isBookingTicket = totalTicketQuantity > 0;
    return (
        <div className="bg-bg-gray border border-bg-gray py-14 h-full flex flex-col">
            {/* Thông tin sự kiện */}
            <div className="mb-6 flex flex-col gap-3 border-b border-white pb-6 px-4">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[28]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeLeading={MODE_LEADING.LARGE}
                    isAllowLineBreaks
                >
                    {eventInfo.title}
                </Text>

                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[14]}
                    className="flex items-center gap-2"
                >
                    <MapPinIcon /> {eventInfo.location}
                </Text>

                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[14]}
                    className="flex items-center gap-2"
                >
                    <CalendarIcon mode={MODE_CALENDAR.WHITE} />{' '}
                    {new Date(eventInfo.date).toLocaleDateString('vi-VN', {
                        day: 'numeric',
                        month: 'long',
                        weekday: 'long',
                        year: 'numeric',
                    })}
                </Text>
            </div>

            <div className="px-4">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Giá vé
                </Text>

                <div className="flex flex-col mt-3">
                    {ticketTypes.map(ticketType => (
                        <div
                            key={ticketType.id}
                            className="flex flex-1 justify-between items-center py-2"
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                {ticketType.name}
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                {ticketType.price === 0
                                    ? 'Miễn phí'
                                    : formatPrice(ticketType.price)}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto px-4 border-t border-white flex flex-col pt-4">
                {selectedTickets.length > 0 && (
                    <div className="flex items-center gap-2">
                        <TicketIcon mode={MODE_TICKET.WHITE} size={26} />
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            x {totalTicketQuantity}
                        </Text>
                    </div>
                )}

                <Button
                    onClick={onPayment}
                    disabled={!isBookingTicket || isLoading}
                    mode={
                        !isBookingTicket
                            ? MODE_BUTTON.BLACK
                            : MODE_BUTTON.YELLOW
                    }
                    className="w-full !mt-4"
                >
                    {!isBookingTicket ? (
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            className="mr-3"
                        >
                            Vui lòng chọn vé
                        </Text>
                    ) : (
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            className="mr-3"
                        >
                            Tiếp tục - {formatPrice(totalAmount)}
                        </Text>
                    )}
                    <DoubleChevronIcon
                        mode={
                            !isBookingTicket
                                ? MODE_DOUBLE_CHEVRON.WHITE
                                : MODE_DOUBLE_CHEVRON.BLACK
                        }
                    />
                </Button>
            </div>
        </div>
    );
};

export default TicketInfoRight;
