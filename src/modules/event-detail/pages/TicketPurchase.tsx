import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TicketType,
    SelectedTicket,
    TicketPurchaseState,
} from '../types/ticketPurchase';
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
import { getRouterPathname } from '@share/utils/routerUtils';
import { getCurrentEventId } from '@share/utils/path';
import DivClick from '@share/components/atoms/DivClick';
import { SCREEN_PATH } from '@share/constants/routers';
import { useAppSelector } from '@configs/store';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';

const TicketPurchase = () => {
    const pathname = getRouterPathname();
    const eventId = getCurrentEventId(pathname);
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    // Mock data - trong thực tế sẽ fetch từ API
    const [ticketTypes] = useState<TicketType[]>([
        {
            available: 50,
            description: 'Vé vào cửa thường, không bao gồm đồ uống',
            id: '1',
            maxPerOrder: 5,
            name: 'Vé thường',
            price: 150000,
        },
        {
            available: 20,
            description: 'Vé VIP với ghế ngồi ưu tiên và đồ uống miễn phí',
            id: '2',
            maxPerOrder: 3,
            name: 'Vé VIP',
            price: 300000,
        },
        {
            available: 10,
            description:
                'Vé VVIP với ghế ngồi tốt nhất, đồ uống và snack miễn phí',
            id: '3',
            maxPerOrder: 2,
            name: 'Vé VVIP',
            price: 500000,
        },
    ]);

    const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);

    // Mock event data - trong thực tế sẽ fetch từ API
    const eventData = {
        date: '2024-12-25',
        id: eventId || '1',
        location: 'Nhà hát Hòa Bình, TP.HCM',
        title: 'Concert Nhạc Trẻ 2024',
    };

    const totalAmount = selectedTickets.reduce((total, selectedTicket) => {
        return (
            total + selectedTicket.ticketType.price * selectedTicket.quantity
        );
    }, 0);

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            // Tạo purchase state để chuyển đến trang thanh toán
            const purchaseState: TicketPurchaseState = {
                eventId: eventData.id,
                eventTitle: eventData.title,
                selectedTickets,
                totalAmount,
            };
            if (eventId) {
                // Navigate to payment page
                navigate(
                    SCREEN_PATH.EVENT_QUESTION_FORM.replace(
                        ':event_id',
                        eventId
                    ).replace(':booking_id', '1'),
                    {
                        state: purchaseState,
                    }
                );
            }
        } catch (error) {
            console.error('Navigation failed:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(`/event-detail/${eventId}`);
    };

    if (
        !isNotNullOrUndefinedOrBlank(token) ||
        !isNotNullOrUndefinedOrBlank(user)
    ) {
        navigate(SCREEN_PATH.HOME);
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
                        Chọn vé - {eventData.title}
                    </Text>
                    <div />
                </div>
                {/* Ticket Selection */}
                <TicketSelectionLeft
                    ticketTypes={ticketTypes}
                    selectedTickets={selectedTickets}
                    onTicketChange={setSelectedTickets}
                />
            </div>

            {/* Payment Summary */}
            <div className="bg-bg-gray">
                <TicketInfoRight
                    eventInfo={{
                        date: eventData.date,
                        id: eventData.id,
                        location: eventData.location,
                        title: eventData.title,
                    }}
                    isLoading={isLoading}
                    onPayment={handlePayment}
                    selectedTickets={selectedTickets}
                    ticketTypes={ticketTypes}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default TicketPurchase;
