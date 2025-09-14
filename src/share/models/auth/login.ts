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
    token: string;
};

export type LoginModel = {
    user: LoginUser;
};

export type LoginResponse = BaseHttpResponse<LoginModel>;

export type LoginRequest = {
    email: string;
    password: string;
};
