import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EventHeaderInfo from '@share/components/organisms/EventHeaderInfo';
import FormBooking from '../components/QuestionForm/FormBooking';
import ToolBarRight from '../components/QuestionForm/ToolBarRight';
import useFormQuestionHandler from '../components/QuestionForm/hooks/useFormQuestionHandler';
import { SCREEN_PATH } from '@share/constants/routers';
import { useAppSelector } from '@configs/store';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import useEventDetailStoreSelector from '../hooks/useEventDetailStoreSelector';
import useEventDetailStoreAction from '../hooks/useEventDetailStoreAction';

const QuestionForm = () => {
    const navigate = useNavigate();
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    const { handleBackToSelectTicket, questionForm } = useFormQuestionHandler();
    const { eventDetail, selectedTickets } = useEventDetailStoreSelector();
    const { setSelectedTicketsStore } = useEventDetailStoreAction();

    if (
        !selectedTickets ||
        !eventDetail ||
        !isNotNullOrUndefinedOrBlank(token) ||
        !isNotNullOrUndefinedOrBlank(user)
    ) {
        // Clear stale state when guard fails
        setSelectedTicketsStore(null);
        navigate(SCREEN_PATH.HOME);
        return null;
    }

    // Optimized form validation
    const isFormValid =
        questionForm.formState.isValid && questionForm.watch('agreeToTerms');

    // Memoized navigation handler
    const handleContinue = useCallback(() => {
        questionForm.handleSubmit(validData => {
            const paymentState = {
                ...selectedTickets,
                bookingForm: validData,
            };

            navigate(
                SCREEN_PATH.EVENT_PAYMENT.replace(
                    ':event_id',
                    eventDetail?.id || ''
                ),
                { state: paymentState }
            );
        })();
    }, [questionForm, eventDetail?.id]);

    return (
        <div className="min-h-screen bg-bg-black-2 flex flex-1 w-full pb-10">
            <div className="flex-1 flex flex-col">
                {/* Event Header Info */}
                <EventHeaderInfo eventInfo={eventDetail} />

                {/* Main Content */}
                <div className="flex flex-col md:flex-row md:gap-10 px-4 md:px-20 py-10">
                    {/* Left Side - Form */}
                    <div className="flex-1">
                        <FormBooking questionForm={questionForm} />
                    </div>

                    {/* Right Side - Booking Info */}
                    <div className="w-full md:w-96 mt-13 px-6 md:px-0">
                        <ToolBarRight
                            handleBackToSelectTicket={handleBackToSelectTicket}
                            selectedTickets={selectedTickets.selectedTickets}
                            totalAmount={selectedTickets.totalAmount}
                            onContinue={handleContinue}
                            isFormValid={isFormValid}
                            isLoading={questionForm.formState.isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
