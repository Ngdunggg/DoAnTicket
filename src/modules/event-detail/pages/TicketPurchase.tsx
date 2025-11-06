import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketType, SelectedTicket } from '../types/ticketPurchase';
import TicketSelectionLeft from '../components/BookingEvent/TicketSelectionLeft';
import TicketInfoRight from '../components/BookingEvent/TicketInfoRight';
import { Text } from '@share/components/atoms/Text';
import BackIcon from '@share/components/atoms/icons/BackIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import DivClick from '@share/components/atoms/DivClick';
import { SCREEN_PATH } from '@share/constants/routers';
import { useAppSelector } from '@configs/store';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import useEventDetailStoreSelector from '@modules/event-detail/hooks/useEventDetailStoreSelector';
import useEventDetailStoreAction from '../hooks/useEventDetailStoreAction';

const TicketPurchase = () => {
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    const { eventDetail, selectedTickets } = useEventDetailStoreSelector();
    const { setSelectedTicketsStore } = useEventDetailStoreAction();
    const [selectedTicketsState, setSelectedTicketsState] = useState<
        SelectedTicket[]
    >(selectedTickets?.selectedTickets || []);

    // Sync local state with store when selectedTickets changes
    useEffect(() => {
        if (selectedTickets?.selectedTickets) {
            setSelectedTicketsState(selectedTickets.selectedTickets);
        }
    }, [selectedTickets?.selectedTickets]);

    // Convert API ticket types to component expected format
    const ticketTypes: TicketType[] = (eventDetail?.ticket_types || []).map(
        ticket => ({
            available: ticket.remaining_quantity,
            description: `${ticket.name} - Còn lại ${ticket.remaining_quantity} vé`,
            id: ticket.id,
            maxPerOrder: Math.min(ticket.remaining_quantity, 10), // Max 10 per order
            name: ticket.name,
            price: ticket.price,
        })
    );

    const totalAmount = selectedTicketsState.reduce((total, selectedTicket) => {
        return (
            total + selectedTicket.ticketType.price * selectedTicket.quantity
        );
    }, 0);

    const handlePayment = async () => {
        // Tạo purchase state để chuyển đến trang thanh toán
        setSelectedTicketsStore({
            eventId: eventDetail?.id || '',
            eventTitle: eventDetail?.title || '',
            selectedTickets: selectedTicketsState,
            totalAmount,
        });

        // Navigate to question form page
        navigate(
            SCREEN_PATH.EVENT_QUESTION_FORM.replace(
                ':event_id',
                eventDetail?.id || ''
            )
        );
    };

    const handleBack = () => {
        navigate(
            SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventDetail?.id || '')
        );
        setSelectedTicketsStore(null);
        setSelectedTicketsState([]);
    };

    if (
        !isNotNullOrUndefinedOrBlank(token) ||
        !isNotNullOrUndefinedOrBlank(user)
    ) {
        navigate(SCREEN_PATH.HOME);
        setSelectedTicketsStore(null);
        setSelectedTicketsState([]);
        return null;
    }

    return (
        <div className="min-h-screen bg-bg-black-2 flex flex-1 w-full  gap-10">
            <div className="flex-1 p-10 mt-5 flex flex-col gap-10">
                {/* Header */}
                <div className="flex w-full items-center justify-between gap-4">
                    <DivClick onClick={handleBack} className="hover:scale-105">
                        <BackIcon mode={MODE_BACK.WHITE} size={26} />
                    </DivClick>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Chọn vé - {eventDetail?.title}
                    </Text>
                    <div />
                </div>
                {/* Ticket Selection */}
                <TicketSelectionLeft
                    ticketTypes={ticketTypes}
                    selectedTickets={selectedTicketsState}
                    onTicketChange={setSelectedTicketsState}
                />
            </div>

            {/* Payment Summary */}
            <div className="bg-bg-gray">
                <TicketInfoRight
                    eventInfo={{
                        date: eventDetail?.dates[0]?.start_at
                            ? formatDateTime(
                                  eventDetail.dates[0].start_at,
                                  DATE_TIME_FORMAT_ISO
                              )
                            : '',
                        id: eventDetail?.id || '',
                        location: eventDetail?.location || '',
                        title: eventDetail?.title || '',
                    }}
                    onPayment={handlePayment}
                    selectedTickets={selectedTicketsState}
                    ticketTypes={ticketTypes}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default TicketPurchase;
