//* Max length validate error type
export const MAX_LENGTH_VALIDATE_ERROR_TYPE = 'too_big';

//* Authentication mode
export const AUTH_MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};
export type AuthMode = typeof AUTH_MODE.LOGIN | typeof AUTH_MODE.REGISTER;

//* Location
export const LOCATION = {
    ALL: 'Toàn quốc',
    DANANG: 'Đà Nẵng',
    HANOI: 'Hà Nội',
    HCM: 'Hồ Chí Minh',
    OTHER: 'Vị trí khác',
};
export type Location =
    | typeof LOCATION.ALL
    | typeof LOCATION.HANOI
    | typeof LOCATION.HCM
    | typeof LOCATION.DANANG
    | typeof LOCATION.OTHER;

//* Type
export const TYPE = {
    ART: 'Sân khấu & nghệ thuật',
    MUSIC: 'Ca nhạc',
    OTHER: 'Khác',
    SPORT: 'Thể thao',
};
export type Type =
    | typeof TYPE.ART
    | typeof TYPE.MUSIC
    | typeof TYPE.SPORT
    | typeof TYPE.OTHER;

//* Filter status
export const FILTER_STATUS = {
    ALL: 'all',
    PAST: 'past',
    PENDING: 'pending',
    UPCOMING: 'upcoming',
};
export type FilterStatus =
    | typeof FILTER_STATUS.ALL
    | typeof FILTER_STATUS.UPCOMING
    | typeof FILTER_STATUS.PAST
    | typeof FILTER_STATUS.PENDING;
