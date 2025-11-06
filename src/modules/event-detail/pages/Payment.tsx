import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TicketPurchaseState } from '../types/ticketPurchase';
import EventHeaderInfo from '@share/components/organisms/EventHeaderInfo';
import PaymentForm from '../components/Payment/PaymentForm';
import PaymentSummary from '../components/Payment/PaymentSummary';
import { PAYMENT_METHOD } from '@share/constants/paymentMethod';
import { useAppSelector } from '@configs/store';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { SCREEN_PATH } from '@share/constants/routers';
import useEventDetailStoreSelector from '../hooks/useEventDetailStoreSelector';
import useEventDetailStoreAction from '../hooks/useEventDetailStoreAction';
import UpdateInfoUser from '../components/Payment/UpdateInfoUser';
import { orderApi } from '@share/api/orderApi';
import { RESULT_CODE } from '@share/constants/commons';
import { toast } from 'react-toastify';

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
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);

    const paymentState = location.state as PaymentState;

    const { eventDetail } = useEventDetailStoreSelector();
    const { setSelectedTicketsStore } = useEventDetailStoreAction();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
        PAYMENT_METHOD.VNPAY
    );
    const [isLoading, setIsLoading] = useState(false);

    if (
        !paymentState ||
        !eventDetail ||
        !isNotNullOrUndefinedOrBlank(token) ||
        !isNotNullOrUndefinedOrBlank(user)
    ) {
        // Clear stale when guard fails
        setSelectedTicketsStore(null);
        navigate(SCREEN_PATH.HOME);
        return null;
    }

    const handlePayment = async () => {
        setIsLoading(true);

        try {
            const orderResponse = await orderApi.createOrder({
                buyer_email: paymentState.bookingForm.email,
                buyer_phone: paymentState.bookingForm.phone,
                order_items: paymentState.selectedTickets.map(ticket => ({
                    quantity: ticket.quantity,
                    ticket_type_id: ticket.ticketType.id,
                })),
                payment_method: selectedPaymentMethod,
            });
            if (orderResponse.result.code !== RESULT_CODE.SUCCESS) {
                toast.error(
                    orderResponse.result.error_msg_id ||
                        'Thanh toán thất bại. Vui lòng thử lại.'
                );
                return;
            }
            const orderId = orderResponse.data.order_id;
            console.log('orderId', orderId);
            const paymentUrlResponse = await orderApi.createPaymentUrl({
                order_id: orderId,
                payment_method: selectedPaymentMethod,
            });
            if (paymentUrlResponse.result.code !== RESULT_CODE.SUCCESS) {
                toast.error(
                    paymentUrlResponse.result.error_msg_id ||
                        'Thanh toán thất bại. Vui lòng thử lại.'
                );
                return;
            }
            console.log('paymentUrlResponse', paymentUrlResponse);
            const paymentUrl = paymentUrlResponse.data.payment_url;
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Thanh toán thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
        setSelectedTicketsStore(null);
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <>
            <div className="min-h-screen bg-bg-black-2 flex flex-1 w-full pb-10">
                <div className="flex-1 flex flex-col">
                    {/* Event Header Info */}
                    <EventHeaderInfo eventInfo={eventDetail} />

                    {/* Main Content */}
                    <div className="flex gap-10 px-20 py-10">
                        {/* Left Side - Form */}
                        <div className="flex-1">
                            <PaymentForm
                                bookingForm={paymentState.bookingForm}
                                onPaymentMethodSelect={
                                    handlePaymentMethodSelect
                                }
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
            <UpdateInfoUser />
        </>
    );
};

export default Payment;
