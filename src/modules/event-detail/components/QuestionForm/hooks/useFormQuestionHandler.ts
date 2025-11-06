import { questionSchema } from '@modules/event-detail/models/QuestionForm';
import useDetectMobile from '@share/hooks/useDetectMobile';
import useFormQuestion from './useFormQuestion';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import useEventDetailStoreSelector from '@modules/event-detail/hooks/useEventDetailStoreSelector';

/**
 * Custom hook for handling login form functionality.
 */
export default function useFormQuestionHandler() {
    //#region dependencies
    const isMobile = useDetectMobile();
    const questionForm = useFormQuestion();
    const schemaQuestion = questionSchema();
    const navigate = useNavigate();
    const { eventDetail } = useEventDetailStoreSelector();
    //#endregion

    const handleBackToSelectTicket = () => {
        navigate(
            SCREEN_PATH.EVENT_TICKET_SELECTION.replace(
                ':event_id',
                eventDetail?.id || ''
            )
        );
    };

    return {
        handleBackToSelectTicket,
        isMobile,
        questionForm,
        schemaQuestion,
    };
}
