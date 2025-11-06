import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { User, UserInfo } from '@share/models/auth/user';
import { BaseHttpResponse } from '@share/models/common/response';
import { Role } from '../constants/commons';

export type UpdateUserInfoRequest = {
    address?: string;
    avatar_url?: string;
    date_of_birth?: string;
    full_name?: string;
    gender?: boolean;
    id: string;
    phone?: string;
    role?: Role;
};

export const userApi = {
    getAllUsers: async (): Promise<BaseHttpResponse<User[]>> => {
        const response = await httpClient.get<BaseHttpResponse<User[]>>(
            API_PATH.GET_ALL_USERS
        );
        return response.data;
    },

    updateUserInfo: async (
        data: UpdateUserInfoRequest,
    ): Promise<BaseHttpResponse<UserInfo>> => {
        const response = await httpClient.patch<BaseHttpResponse<UserInfo>>(
            API_PATH.UPDATE_USER_INFO,
            data
        );
        return response.data;
    },
};
