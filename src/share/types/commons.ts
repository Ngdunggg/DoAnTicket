import { User } from "@share/models/user";

export type PageSize = { offset: number; size: number };
export type CustomError = {
    message: string;
    status?: string;
};
export type MessageContent = {
    text: string;
    title: string;
};

export type CommonState = {
    is_loading: boolean;
    is_online: boolean;
    is_show_menu: boolean;
    is_show_modal_logout: boolean;
    message: MessageContent | null;
};

export type AuthState = {
    token: string | null;
};

export type UserState = {
    user: User | null;
};
