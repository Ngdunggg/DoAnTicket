import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TicketPurchaseState } from '../types/ticketPurchase';
import EventHeaderInfo from '@share/components/organisms/EventHeaderInfo';
import FormBooking from '../components/QuestionForm/FormBooking';
import ToolBarRight from '../components/QuestionForm/ToolBarRight';
import useFormQuestionHandler from '../components/QuestionForm/hooks/useFormQuestionHandler';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { getCurrentEventId } from '@share/utils/path';
import { SCREEN_PATH } from '@share/constants/routers';

const QuestionForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const eventId = getCurrentEventId(pathname);

    // Lấy thông tin từ state được truyền từ TicketPurchase
    const purchaseState = location.state as TicketPurchaseState;

    const [isLoading, setIsLoading] = useState(false);
    const { questionForm } = useFormQuestionHandler();

    // Mock event data - trong thực tế sẽ fetch từ API
    const eventData = {
        date: '2024-12-25',
        id: eventId || '1',
        image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
        location: 'Nhà hát Hòa Bình, TP.HCM',
        title: 'Concert Nhạc Trẻ 2024',
    };

    const isFormValid = () => {
        const values = questionForm.getValues();
        return (
            values.email.trim() !== '' &&
            values.phone.trim() !== '' &&
            values.agreeToTerms
        );
    };

    const handleContinue = async () => {
        setIsLoading(true);

        try {
            // Tạo state để chuyển đến trang thanh toán
            const formValues = questionForm.getValues();
            const paymentState = {
                ...purchaseState,
                bookingForm: formValues,
            };

            // Navigate to payment page
            navigate(
                SCREEN_PATH.EVENT_PAYMENT.replace(
                    ':event_id',
                    eventId || ''
                ).replace(':booking_id', '1'),
                {
                    state: paymentState,
                }
            );
        } catch (error) {
            console.error('Navigation failed:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!purchaseState) {
        return (
            <div className="min-h-screen bg-bg-black-2 flex items-center justify-center">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    Không tìm thấy thông tin đơn hàng
                </Text>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-black-2 flex flex-1 w-full pb-10">
            <div className="flex-1 flex flex-col">
                {/* Event Header Info */}
                <EventHeaderInfo eventInfo={eventData} />

                {/* Main Content */}
                <div className="flex gap-10 px-20 py-10">
                    {/* Left Side - Form */}
                    <div className="flex-1">
                        <FormBooking questionForm={questionForm} />
                    </div>

                    {/* Right Side - Booking Info */}
                    <div className="w-96 mt-13">
                        <ToolBarRight
                            selectedTickets={purchaseState.selectedTickets}
                            totalAmount={purchaseState.totalAmount}
                            onContinue={handleContinue}
                            isFormValid={isFormValid()}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
