import { BaseHttpResponse } from '@share/models/common/response';

export type LoginUser = {
    address: string;
    avatar: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: string;
    id: string;
    phone_number: string;
    role: string;
    status: string;
};

export type LoginModel = {
    token: string;
    user: LoginUser;
};

export type LoginResponse = BaseHttpResponse<LoginModel>;

export type LoginRequest = {
    email: string;
    password: string;
};
