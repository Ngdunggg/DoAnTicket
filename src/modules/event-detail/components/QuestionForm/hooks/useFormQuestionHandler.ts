import { useAppSelector } from '@configs/store';
import useQuestionMutation from '@modules/event-detail/components/QuestionForm/hooks/useFormQuestionMutation';
import {
    QuestionInput,
    QuestionResponse,
    questionSchema,
} from '@modules/event-detail/models/QuestionForm';
import useDetectMobile from '@share/hooks/useDetectMobile';
import useFormQuestion from './useFormQuestion';

/**
 * Custom hook for handling login form functionality.
 */
export default function useFormQuestionHandler() {
    //#region dependencies
    const isMobile = useDetectMobile();
    const isOnline = useAppSelector(state => state.common.is_online);
    const questionForm = useFormQuestion();
    const schemaQuestion = questionSchema();
    //#endregion

    /**
     * Handles the login error by setting an error message in the state.
     *
     * @param error - The error object representing the login error.
     */
    const handleQuestionError = (_error: Error) => {
        questionForm.setValue('agreeToTerms', false);
    };

    /**
     * Handles the successful login by initializing the user database, setting user info and token, and navigating to the worksites page.
     *
     * @param data - The response data from the login API.
     */
    const handleApiLoginSuccess = (data?: QuestionResponse) => {
        if (!data?.data) {
            return;
        }
    };

    /**
     * Handles the login API request by setting the login input data.
     *
     * @param data - The login input data.
     */
    const questionMutation = useQuestionMutation({
        onError: handleQuestionError,
        onSuccess: handleApiLoginSuccess,
    });

    /**
     * Handle login form submission
     * @param data login input values including email and password
     */
    const handleQuestion = (data: QuestionInput) => {
        if (!isOnline) {
            return Promise.resolve();
        }
        return questionMutation.mutateAsync(data);
    };

    return {
        handleApiLoginSuccess,
        handleQuestion,
        handleQuestionError,
        isMobile,
        questionForm,
        schemaQuestion,
    };
}
