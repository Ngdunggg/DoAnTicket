import { BaseHttpResponse } from '@share/models/common/response';

export type VerifyOtpUser = {
    message: string;
};

export type VerifyOtpModel = {
    user: VerifyOtpUser;
};

export type VerifyOtpResponse = BaseHttpResponse<VerifyOtpModel>;

export type VerifyOtpRequest = {
    email: string;
    otp: string;
};

export type SendOtpRequest = {
    email: string;
};

export type SendOtpResponse = BaseHttpResponse<SendOtpModel>;

export type SendOtpModel = {
    message: string;
};
