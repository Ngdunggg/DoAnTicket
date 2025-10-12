import { BaseHttpResponse } from '@share/models/common/response';

export type ChangePasswordUser = {
    message: string;
};

export type ChangePasswordModel = {
    message: string;
};

export type ChangePasswordResponse = BaseHttpResponse<ChangePasswordModel>;

export type ChangePasswordRequest = {
    email: string;
    password: string;
};

export type VerifyPasswordRequest = {
    email: string;
    otp: string;
};

export type CheckEmailRequest = {
    email: string;
};
