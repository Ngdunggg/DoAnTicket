import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@share/models/auth/user';
import { createAccountSchema } from '@share/schemas/auth/login';
import { AuthMode } from '@share/constants/commons';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Custom hook for handling authentication form logic.
 *
 * @param user - Optional user data to pre-fill the form
 * @param mode - The authentication mode to determine which fields to validate
 * @returns An object containing the control, errors, handleSubmit, isValid, setValue, and trigger properties.
 */
export default function useAuthForm(user?: User | null, mode?: AuthMode) {
    const schema = createAccountSchema(mode);
    const form = useForm<z.infer<typeof schema>>({
        defaultValues: {
            email: '',
            full_name: '',
            password: '',
            password_confirm: '',
            phone: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        reValidateMode: 'onSubmit',
    });

    useEffect(() => {
        if (user) {
            form.setValue('full_name', user.full_name);
            form.setValue('email', user.email);
        } else {
            // Clear form when no user data to prevent auto-fill from previous sessions
            form.reset({
                email: '',
                full_name: '',
                password: '',
                password_confirm: '',
                phone: '',
            });
        }
    }, [user, form]);

    return form;
}
