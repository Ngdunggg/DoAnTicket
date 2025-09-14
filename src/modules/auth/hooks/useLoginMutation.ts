// import { LoginResponse, LoginRequest } from '@share/models/auth/login';
// import { authRepository } from '@share/repositories/authRepository';
// import { useMutation } from '@tanstack/react-query';

// /**
//  * Props for the useLogin hook.
//  *
//  * @property onError - Callback function to be called when an error occurs during login.
//  * @property onSuccess - Callback function to be called when login is successful.
//  * @property loginInput - The input data for the login.
//  */
// type Props = {
//     onError?: (_error: Error) => void;
//     onSuccess?: (_data?: LoginResponse) => void;
// };

// /**
//  * Custom hook for handling login functionality.
//  *
//  * @param {Props} options - The options for the hook.
//  * @param {Function} options.onError - The error callback function.
//  * @param {Function} options.onSuccess - The success callback function.
//  * @param {LoginRequest} options.loginInput - The login input data.
//  */
// export default function useLoginMutation({ onError, onSuccess }: Props) {
//     return useMutation({
//         mutationFn: async (loginInput: LoginRequest) =>
//             await authRepository.login(loginInput),
//         onError: async (error: Error) => {
//             onError?.(error);
//         },
//         onSuccess: async data => {
//             onSuccess?.(data);
//         },
//     });
// }
