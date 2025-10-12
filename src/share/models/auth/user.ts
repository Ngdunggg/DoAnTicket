import { BaseHttpResponse } from '../common/response';

export type User = {
    address: string;
    avatar?: string | null;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: string;
    id: string;
    phone_number: string;
    role: string;
    status: string;
};

export type UserStore = {
    address: string;
    avatar?: string | null;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: string;
    id: string;
    phone_number: string;
    role: string;
    status: string;
};

export type UserInfo = {
    address: string;
    avatar?: string | null;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: string;
    id: string;
    phone_number: string;
    role: string;
    status: string;
};

export type UserModel = {
    user: UserInfo;
};

export type UserResponse = BaseHttpResponse<UserModel>;
