import { BaseHttpResponse } from '@share/models/common/response';

export type CreateAccountUser = {
    message: string;
    status: string;
};

export type CreateAccountModel = {
    user: CreateAccountUser;
};

export type CreateAccountResponse = BaseHttpResponse<CreateAccountModel>;

export type CreateAccountRequest = {
    address?: string;
    avatar?: string;
    email: string;
    full_name: string;
    password: string;
    phone_number: string;
};
