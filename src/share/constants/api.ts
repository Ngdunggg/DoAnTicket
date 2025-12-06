export const API_PATH = {
    ALL_EVENT_TYPES: 'categories',

    // AUTH
    CHANGE_PASSWORD: 'auth/change-password',
    CHECK_EMAIL: 'auth/check-email',
    COMPLETE_FREE_ORDER: 'payments/complete-free-order',
    CREATE_EVENT: 'events/create-event',
    // ORDER
    CREATE_ORDER: 'orders',
    CREATE_PAYMENT_URL: 'payments/create-url',
    DELETE_MY_EVENT: 'events/:id',
    EVENT_REPORT: 'events/report/:id',
    EVENTS_BY_ORGANIZER_ID: 'events/organizer/:userId',
    EVENTS_DETAIL: 'events/:id',
    // EVENT
    EVENTS_LIST: 'events/list-events',
    GET_ALL_USERS: 'users',
    GET_EVENT_DATA: 'events/event-by-admin',
    LOGIN: 'auth/login',
    LOGIN_GOOGLE: 'auth/google',

    LOGOUT: 'auth/logout',
    MY_TICKETS: 'purchased-tickets/my-tickets',

    // ORGANIZER
    ORGANIZER_PROFILE: 'organizers/profile/:id',
    REGISTER: 'auth/register',
    SEND_OTP: 'auth/send-otp',
    UPDATE_EVENT: 'events/update-event/:id',
    UPDATE_EVENT_STATUS: 'events/update-event-status/:id',
    // USER
    UPDATE_USER_INFO: 'users/profile',

    UPLOAD_SIGNATURE: 'uploads/signature',

    USER_INFO: 'users/user-info',

    VERIFY_OTP: 'auth/verify-otp',

    VERIFY_PASSWORD: 'auth/verify-password',
};
