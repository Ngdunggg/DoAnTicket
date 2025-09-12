//* Max length validate error type
export const MAX_LENGTH_VALIDATE_ERROR_TYPE = 'too_big';

//* Authentication mode
export const AUTH_MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};
export type AuthMode = typeof AUTH_MODE.LOGIN | typeof AUTH_MODE.REGISTER;
