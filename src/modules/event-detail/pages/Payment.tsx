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
                        'Không thể tạo đơn hàng. Vui lòng thử lại sau.'
                );
                // Clear selected tickets và navigate về event detail sau khi hiển thị error
                setSelectedTicketsStore(null);
                // Delay nhỏ để user có thể đọc được error message
                setTimeout(() => {
                    navigate(
                        SCREEN_PATH.EVENT_DETAIL.replace(
                            ':event_id',
                            eventDetail.id
                        )
                    );
                }, 2000);
                return;
            }
            const orderId = orderResponse.data.order_id;

            const isFree = paymentState.totalAmount === 0;

            if (isFree) {
                const completeResponse =
                    await orderApi.completeFreeOrder(orderId);
                if (completeResponse.result.code !== RESULT_CODE.SUCCESS) {
                    toast.error(
                        completeResponse.result.error_msg_id ||
                            'Đặt vé thất bại. Vui lòng thử lại.'
                    );
                    return;
                }
                toast.success(
                    'Đặt vé thành công! Vé đã được gửi đến email của bạn.'
                );
                // Redirect đến payment callback với status success
                navigate(
                    `${SCREEN_PATH.EVENT_PAYMENT_CALLBACK}?status=success&orderId=${orderId}&isFree=true`
                );
                setSelectedTicketsStore(null);
                return;
            }

            // Vé có phí - tạo payment URL
            console.log('orderId', orderId);
            const paymentUrlResponse = await orderApi.createPaymentUrl({
                order_id: orderId,
                payment_method: selectedPaymentMethod,
            });
            if (paymentUrlResponse.result.code !== RESULT_CODE.SUCCESS) {
                toast.error(
                    paymentUrlResponse.result.error_msg_id ||
                        'Thanh toán thất bại. Vui lòng thử lại sau.'
                );
                return;
            }
            console.log('paymentUrlResponse', paymentUrlResponse);
            const paymentUrl = paymentUrlResponse.data.payment_url;
            // Clear selected tickets trước khi chuyển đến payment gateway
            setSelectedTicketsStore(null);
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Thanh toán thất bại. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <>
            <div className="min-h-screen bg-bg-black-2 flex flex-col md:flex-row flex-1 w-full md:gap-10 gap-5 pb-10">
                <div className="flex-1 flex flex-col">
                    {/* Event Header Info */}
                    <EventHeaderInfo eventInfo={eventDetail} />

                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row md:gap-10 px-4 md:px-20 py-10">
                        {/* Left Side - Form */}
                        <div className="flex-1">
                            <PaymentForm
                                bookingForm={paymentState.bookingForm}
                                onPaymentMethodSelect={
                                    handlePaymentMethodSelect
                                }
                                selectedPaymentMethod={selectedPaymentMethod}
                                totalAmount={paymentState.totalAmount}
                            />
                        </div>

                        {/* Right Side - Payment Summary */}
                        <div className="w-full md:w-96 mt-13 px-6 md:px-0">
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
