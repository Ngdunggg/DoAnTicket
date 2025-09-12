import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { profileSchema, ProfileInput } from '@share/schemas/my-ticket/profile';

/**
 * Custom hook for handling profile form logic.
 *
 * @returns React Hook Form object with control, errors, handleSubmit, isValid, setValue, and trigger properties.
 */
export default function useProfileForm() {
    return useForm<ProfileInput>({
        defaultValues: {
            address: '',
            avatar: '',
            dateOfBirth: '',
            email: '',
            fullName: '',
            gender: 'male',
            phone: '',
        },
        mode: 'onChange',
        resolver: zodResolver(profileSchema()),
        reValidateMode: 'onChange',
    });
}
