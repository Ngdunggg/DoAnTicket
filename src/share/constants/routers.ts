export const SCREEN_PATH = {
    AUTH_CALLBACK: '/auth/callback',
    // AUTH
    AUTH_LOGIN: '/login',
    AUTH_REGISTER: '/register',
    AUTH_RESET_PASSWORD: '/reset-password',

    // MANAGER EVENT
    CREATE_EVENT: '/organizer/create-event',

    // EVENT
    EVENT_DETAIL: '/event-detail/:event_id',

    EVENT_LIST: '/events',
    EVENT_PAYMENT: '/event-detail/:event_id/booking/:booking_id/payment',
    EVENT_QUESTION_FORM:
        '/event-detail/:event_id/booking/:booking_id/question-form',
    EVENT_TICKET_SELECTION:
        '/event-detail/:event_id/booking/:booking_id/selection',

    // HOME
    HOME: '/',
    // MANAGER EVENT
    MANAGER_EVENT: '/organizer/events',
    MANAGER_EVENT_DETAIL: '/organizer/events/:event_id',
    MANAGER_LEGAL: '/organizer/legal-document',
    MANAGER_LEGAL_BUSINESS: '/organizer/legal-document/business',
    MANAGER_LEGAL_IMAGE: '/organizer/legal-document/contentImage',
    MANAGER_REPORT: '/organizer/report',
    MANAGER_REPORT_DETAIL: '/organizer/report/:event_id',
    // MY TICKET
    MY_TICKET: '/my-ticket',
    MY_TICKET_PROFILE: '/my-ticket/my-profile',

    // ROOT
    ROOT: '/',
} as const;

export type ScreenPathType = (typeof SCREEN_PATH)[keyof typeof SCREEN_PATH];

export const EVENT_PATH_PATTERNS = [
    SCREEN_PATH.EVENT_DETAIL,
    SCREEN_PATH.EVENT_TICKET_SELECTION,
    SCREEN_PATH.EVENT_QUESTION_FORM,
    SCREEN_PATH.EVENT_PAYMENT,
    SCREEN_PATH.MANAGER_EVENT_DETAIL,
    SCREEN_PATH.MANAGER_REPORT_DETAIL,
];

export const AUTH_PATH_PATTERNS = [
    SCREEN_PATH.AUTH_LOGIN,
    SCREEN_PATH.AUTH_REGISTER,
    SCREEN_PATH.AUTH_RESET_PASSWORD,
    SCREEN_PATH.AUTH_CALLBACK,
];

export const MY_TICKET_PATH_PATTERNS = [
    SCREEN_PATH.MY_TICKET,
    SCREEN_PATH.MY_TICKET_PROFILE,
];
