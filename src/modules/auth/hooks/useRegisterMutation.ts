import { authApi } from '@share/api/authApi';
import {
    CreateAccountResponse,
    CreateAccountRequest,
} from '@share/models/auth/createAccount';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

/**
 * Props for the useLogin hook.
 *
 * @property onError - Callback function to be called when an error occurs during login.
 * @property onSuccess - Callback function to be called when login is successful.
 * @property loginInput - The input data for the login.
 */
type Props = {
    onError?: (_error: AxiosError) => void;
    onSuccess?: (_data?: CreateAccountResponse) => void;
};

/**
 * Custom hook for handling register functionality.
 *
 * @param {Props} options - The options for the hook.
 * @param {Function} options.onError - The error callback function.
 * @param {Function} options.onSuccess - The success callback function.
 * @param {CreateAccountRequest} options.registerInput - The register input data.
 */
export default function useRegisterMutation({ onError, onSuccess }: Props) {
    return useMutation({
        mutationFn: async (registerInput: CreateAccountRequest) =>
            await authApi.createAccount(registerInput),
        onError: async (error: AxiosError) => {
            onError?.(error);
        },
        onSuccess: async data => {
            onSuccess?.(data);
        },
    });
}
