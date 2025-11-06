import { eventApi } from '@share/api/eventApi';
import { BaseHttpResponse } from '@share/models/common/response';
import { useMutation } from '@tanstack/react-query';
import {
    CreateEventRequest,
    CreateEventResponse,
} from '@share/models/event/createEvent';
import { AxiosError } from 'axios';

type Props = {
    onError?: (_error: AxiosError) => void;
    onSuccess?: (_data?: BaseHttpResponse<CreateEventResponse>) => void;
};

/**
 * Custom hook for handling create event functionality.
 *
 * @param {Props} options - The options for the hook.
 * @param {Function} options.onError - The error callback function.
 * @param {Function} options.onSuccess - The success callback function.
 * @param {CreateEventRequest} options.createEventInput - The create event input data.
 */
export default function useCreateEventMutation({ onError, onSuccess }: Props) {
    return useMutation({
        mutationFn: async (data: CreateEventRequest) =>
            await eventApi.createEvent(data),
        onError: async (error: AxiosError) => {
            onError?.(error);
        },
        onSuccess: async data => {
            onSuccess?.(data);
        },
    });
}
