export const Path = {
    PathHome: "/",
    PathEventDetail: "/event-detail",
    PathLogin: "/login",
    PathResetPassword: "/reset-password",
    PathMyTicket: "/my-ticket",
    PathMyProfile: "/my-ticket/my-profile",
    PathRoot: "",
} as const;
export type PathType = (typeof Path)[keyof typeof Path];
