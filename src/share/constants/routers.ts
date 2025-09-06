export const Path = {
  PathEventDetail: "/event-detail/:id",
  PathHome: "/",
  PathLogin: "/login",
  PathMyProfile: "/my-ticket/my-profile",
  PathMyTicket: "/my-ticket",
  PathResetPassword: "/reset-password",
  PathRoot: "",
} as const;
export type PathType = (typeof Path)[keyof typeof Path];
