import { BaseHttpResponse } from '@share/models/common/response';

export type LoginUser = {
    address: string;
    avatar_url: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: boolean | null;
    google_id: string | null;
    id: string;
    phone: string;
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
