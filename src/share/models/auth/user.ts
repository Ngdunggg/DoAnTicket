import { BaseHttpResponse } from '../common/response';

export type User = {
    address?: string | null;
    avatar_url?: string | null;
    created_at: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: boolean | null;
    google_id?: string | null;
    id: string;
    is_active: boolean;
    phone: string;
    role: string;
    status: string;
};

export type UserStore = {
    address?: string | null;
    avatar_url?: string | null;
    created_at: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: boolean | null;
    google_id?: string | null;
    id: string;
    is_active: boolean;
    phone: string;
    role: string;
    status: string;
};

export type UserInfo = {
    address?: string | null;
    avatar_url?: string | null;
    created_at: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: boolean | null;
    google_id?: string | null;
    id: string;
    is_active: boolean;
    phone: string;
    role: string;
    status: string;
};

export type UserModel = {
    address?: string | null;
    avatar_url?: string | null;
    created_at: string;
    date_of_birth: string;
    email: string;
    full_name: string;
    gender: boolean | null;
    google_id?: string | null;
    id: string;
    is_active: boolean;
    phone: string;
    role: string;
    status: string;
};

export type UserResponse = BaseHttpResponse<UserModel>;
