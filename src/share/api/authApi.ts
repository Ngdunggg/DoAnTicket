import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import {
    ChangePasswordRequest,
    ChangePasswordResponse,
    CheckEmailRequest,
    VerifyPasswordRequest,
} from '@share/models/auth/changePassword';
import {
    CreateAccountRequest,
    CreateAccountResponse,
} from '@share/models/auth/createAccount';
import { LoginRequest, LoginResponse } from '@share/models/auth/login';
import { UserResponse } from '@share/models/auth/user';
import {
    VerifyOtpRequest,
    VerifyOtpResponse,
    SendOtpRequest,
    SendOtpResponse,
} from '@share/models/auth/verifyotp';
import { BaseHttpResponse } from '@share/models/common/response';

/**
 * Logs in the user with the provided login data.
 *
 * @param data - The login input data.
 * @returns A promise that resolves to the login response.
 */
export const authApi = {
    changePassword: async (
        data: ChangePasswordRequest
    ): Promise<ChangePasswordResponse> => {
        const response = await httpClient.post<ChangePasswordResponse>(
            API_PATH.CHANGE_PASSWORD,
            data
        );
        return response.data;
    },

    checkEmail: async (data: CheckEmailRequest): Promise<BaseHttpResponse> => {
        const response = await httpClient.post<BaseHttpResponse>(
            API_PATH.CHECK_EMAIL,
            data
        );
        return response.data;
    },

    /**
     * Creates a new account with the provided data.
     *
     * @param data - The account creation input data.
     * @returns A promise that resolves to the create account response.
     */
    createAccount: async (
        data: CreateAccountRequest
    ): Promise<CreateAccountResponse> => {
        const response = await httpClient.post<CreateAccountResponse>(
            API_PATH.REGISTER,
            data
        );
        return response.data;
    },

    /**
     * Gets user info.
     *
     * @returns A promise that resolves to the user info response.
     */
    getUserInfo: async (id: string | undefined): Promise<UserResponse> => {
        const response = await httpClient.get<UserResponse>(
            API_PATH.USER_INFO,
            { params: { id } }
        );
        return response.data;
    },

    /**
     * Logs in.
     *
     * @returns A promise that resolves to the login response.
     */
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await httpClient.post<LoginResponse>(
            API_PATH.LOGIN,
            data
        );
        return response.data;
    },

    /**
     * Logs out the user.
     *
     * @param request - The logout request data.
     * @returns A promise that resolves to the logout response.
     */
    logout: async (): Promise<BaseHttpResponse> => {
        const response = await httpClient.post<BaseHttpResponse>(
            API_PATH.LOGOUT
        );
        return response.data;
    },

    /**
     * Sends OTP.
     *
     * @param data - The OTP request data.
     * @returns A promise that resolves to the OTP response.
     */
    sendOtp: async (data: SendOtpRequest): Promise<SendOtpResponse> => {
        const response = await httpClient.post<SendOtpResponse>(
            API_PATH.SEND_OTP,
            data
        );
        return response.data;
    },

    /**
     * Creates a new account with the provided data.
     *
     * @param data - The account creation input data.
     * @returns A promise that resolves to the create account response.
     */
    verifyOtp: async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
        const response = await httpClient.post<VerifyOtpResponse>(
            API_PATH.VERIFY_OTP,
            data
        );
        return response.data;
    },

    verifyPassword: async (
        data: VerifyPasswordRequest
    ): Promise<BaseHttpResponse> => {
        const response = await httpClient.post<BaseHttpResponse>(
            API_PATH.VERIFY_PASSWORD,
            data
        );
        return response.data;
    },
};
