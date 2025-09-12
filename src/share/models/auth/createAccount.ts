import { BaseHttpResponse } from '@share/models/common/response';

export type CreateAccountUser = {
    company_address: string;
    company_id: string;
    company_name: string;
    email: string;
    full_name: string;
    full_name_kana: string;
    id: string;
    phone_number: string;
    status: string;
};

export type CreateAccountModel = {
    user: CreateAccountUser;
};

export type CreateAccountResponse = BaseHttpResponse<CreateAccountModel>;

export type CreateAccountRequest = {
    company_address?: string | null;
    company_id?: string | null;
    company_name?: string | null;
    email: string;
    full_name: string;
    full_name_kana?: string | null;
    invitation_id?: string | null;
    password: string;
    phone_number?: string | null;
};

export type Invitation = {
    company_id?: string | null;
    email: string;
    full_name: string;
    full_name_kana: string;
    invitation_id: string;
    phone_number: string;
};

export type InvitationDataModel = {
    invitation: Invitation;
};

export type InvitationResponse = BaseHttpResponse<InvitationDataModel>;
