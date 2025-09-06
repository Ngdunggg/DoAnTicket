import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TicketType,
    SelectedTicket,
    PaymentInfo,
    TicketPurchaseState,
} from '../types/ticketPurchase';
import TicketSelection from '../components/BookingEvent/TicketSelection';
import PaymentSummary from '../components/BookingEvent/PaymentSummary';
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

const TicketPurchase = () => {
    const pathname = getRouterPathname();
    const eventId = getCurrentEventId(pathname);
    const navigate = useNavigate();

    // Mock data - trong thực tế sẽ fetch từ API
    const [ticketTypes] = useState<TicketType[]>([
        {
            id: '1',
            name: 'Vé thường',
            price: 150000,
            description: 'Vé vào cửa thường, không bao gồm đồ uống',
            available: 50,
            maxPerOrder: 5,
        },
        {
            id: '2',
            name: 'Vé VIP',
            price: 300000,
            description: 'Vé VIP với ghế ngồi ưu tiên và đồ uống miễn phí',
            available: 20,
            maxPerOrder: 3,
        },
        {
            id: '3',
            name: 'Vé VVIP',
            price: 500000,
            description:
                'Vé VVIP với ghế ngồi tốt nhất, đồ uống và snack miễn phí',
            available: 10,
            maxPerOrder: 2,
        },
    ]);

    const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>(
        []
    );
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        fullName: '',
        email: '',
        phone: '',
        paymentMethod: 'card',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Mock event data - trong thực tế sẽ fetch từ API
    const eventData = {
        id: eventId || '1',
        title: 'Concert Nhạc Trẻ 2024',
        date: '2024-12-25',
        location: 'Nhà hát Hòa Bình, TP.HCM',
    };

    const totalAmount = selectedTickets.reduce((total, selectedTicket) => {
        return (
            total + selectedTicket.ticketType.price * selectedTicket.quantity
        );
    }, 0);

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            // Mock payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Tạo purchase state để chuyển đến trang xác nhận
            const purchaseState: TicketPurchaseState = {
                selectedTickets,
                totalAmount,
                eventId: eventData.id,
                eventTitle: eventData.title,
            };

            // Navigate to confirmation page (sẽ tạo sau)
            navigate(`/event/${eventId}/purchase/confirmation`, {
                state: purchaseState,
            });
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Thanh toán thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(`/event-detail/${eventId}`);
    };

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
                <TicketSelection
                    ticketTypes={ticketTypes}
                    selectedTickets={selectedTickets}
                    onTicketChange={setSelectedTickets}
                />
            </div>

            {/* Payment Summary */}
            <div className="bg-bg-gray">
                <PaymentSummary
                    selectedTickets={selectedTickets}
                    totalAmount={totalAmount}
                    paymentInfo={paymentInfo}
                    onPaymentInfoChange={setPaymentInfo}
                    onPayment={handlePayment}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default TicketPurchase;
