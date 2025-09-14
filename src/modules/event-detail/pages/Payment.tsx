import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TicketPurchaseState } from '../types/ticketPurchase';
import EventHeaderInfo from '@share/components/organisms/EventHeaderInfo';
import PaymentForm from '../components/Payment/PaymentForm';
import PaymentSummary from '../components/Payment/PaymentSummary';
import { getCurrentEventId } from '@share/utils/path';
import PAYMENT_METHOD from '@share/constants/paymentMethod';
import { useAppSelector } from '@configs/store';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { SCREEN_PATH } from '@share/constants/routers';

interface BookingFormData {
    agreeToTerms: boolean;
    email: string;
    phone: string;
}

interface PaymentState extends TicketPurchaseState {
    bookingForm: BookingFormData;
}

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const eventId = getCurrentEventId(pathname);
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    // Lấy thông tin từ state được truyền từ QuestionForm
    const paymentState = location.state as PaymentState;

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
        PAYMENT_METHOD.VNPAY
    );
    const [isLoading, setIsLoading] = useState(false);

    // Mock event data - trong thực tế sẽ fetch từ API
    const eventData = {
        date: '2024-12-25',
        id: eventId || '1',
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
        location: 'Nhà hát Hòa Bình, TP.HCM',
        title: 'Concert Nhạc Trẻ 2024',
    };

    if (
        !paymentState ||
        !isNotNullOrUndefinedOrBlank(token) ||
        !isNotNullOrUndefinedOrBlank(user)
    ) {
        navigate(SCREEN_PATH.HOME);
        return null;
    }

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            // Mock payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Navigate to confirmation page
            navigate(`/event/${eventId}/purchase/confirmation`, {
                state: {
                    ...paymentState,
                    paymentMethod: selectedPaymentMethod,
                },
            });
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Thanh toán thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <div className="min-h-screen bg-bg-black-2 flex flex-1 w-full pb-10">
            <div className="flex-1 flex flex-col">
                {/* Event Header Info */}
                <EventHeaderInfo eventInfo={eventData} />

                {/* Main Content */}
                <div className="flex gap-10 px-20 py-10">
                    {/* Left Side - Form */}
                    <div className="flex-1">
                        <PaymentForm
                            bookingForm={paymentState.bookingForm}
                            onPaymentMethodSelect={handlePaymentMethodSelect}
                            selectedPaymentMethod={selectedPaymentMethod}
                        />
                    </div>

                    {/* Right Side - Payment Summary */}
                    <div className="w-96 mt-13">
                        <PaymentSummary
                            selectedTickets={paymentState.selectedTickets}
                            totalAmount={paymentState.totalAmount}
                            onPayment={handlePayment}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
