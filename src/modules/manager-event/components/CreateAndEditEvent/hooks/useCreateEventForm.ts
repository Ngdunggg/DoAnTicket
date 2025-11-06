import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    createEventSchema,
    CreateEventInput,
} from '@share/schemas/event/createEvent';
import { TICKET_STATUS } from '@share/constants/commons';
import { PAYMENT_METHOD } from '@share/constants/paymentMethod';

/**
 * Custom hook for handling create event form logic.
 *
 * @returns React Hook Form object with control, errors, handleSubmit, isValid, setValue, and trigger properties.
 */
export default function useCreateEventForm() {
    return useForm<CreateEventInput>({
        defaultValues: {
            account_holder_name: '',
            account_number: '',
            bank_branch: '',
            bank_name: '',
            category_id: '',
            city: '',
            contact_email: '',
            contact_phone: '',
            description: '',
            description_organization: '',
            district: '',
            end_time: '',
            full_name: '',
            images: [],
            is_online: false,
            location: '',
            logo_data: undefined,
            logo_url: '',
            organization_name: '',
            payment_method: PAYMENT_METHOD.VNPAY,
            start_time: '',
            street_address: '',
            tickets: [
                {
                    description: '',
                    initial_quantity: 0,
                    name: '',
                    price: 0,
                    status: TICKET_STATUS.ACTIVE,
                },
            ],
            title: '',
            ward: '',
            website: '',
        },
        mode: 'onChange',
        resolver: zodResolver(createEventSchema()),
        reValidateMode: 'onChange',
    });
}
