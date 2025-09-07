import { zodResolver } from '@hookform/resolvers/zod';
import {
    QuestionInput,
    questionSchema,
} from '@modules/event-detail/models/QuestionForm';
import { useForm } from 'react-hook-form';

/**
 * Custom hook for handling login form logic.
 *
 * @returns An object containing the control, errors, handleSubmit, isValid, setValue, and trigger properties.
 */
export default function useFormQuestion() {
    return useForm<QuestionInput>({
        defaultValues: { agreeToTerms: false, email: '', phone: '' },
        mode: 'onSubmit',
        resolver: zodResolver(questionSchema()),
        reValidateMode: 'onSubmit',
    });
}
