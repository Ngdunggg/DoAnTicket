import { AUTH_MODE, AuthMode } from '@share/constants/commons';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@share/constants/regax';
import { validateMaxLength, validatePhoneNumber } from '@share/utils/zodUtils';
import { z } from 'zod';

/**
 * Creates and returns the authentication validation schema.
 *
 * @param mode - The authentication mode: 'login' or 'register'
 * @returns A Zod schema object for validating authentication form data
 */
export const createAccountSchema = (mode: AuthMode = AUTH_MODE.LOGIN) => {
    const baseSchema = {
        email: validateMaxLength('auth.email', 255)
            .min(1, { message: 'Email không được để trống' })
            .refine(email => EMAIL_REGEX.test(email), {
                message: 'Email không hợp lệ',
            }),
        password: z
            .string()
            .trim()
            .min(1, {
                message: 'Mật khẩu không được để trống',
            })
            .refine(
                password => {
                    return PASSWORD_REGEX.test(password);
                },
                {
                    message:
                        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số',
                }
            ),
    };

    // For register mode, add additional fields
    if (mode === AUTH_MODE.REGISTER) {
        const registerSchema = {
            ...baseSchema,
            name: validateMaxLength('auth.name', 255).min(1, {
                message: 'Họ tên không được để trống',
            }),
            passwordConfirm: z.string().trim().min(1, {
                message: 'Xác nhận mật khẩu không được để trống',
            }),
            phone: z
                .string()
                .trim()
                .min(1, {
                    message: 'Số điện thoại không được để trống',
                })
                .refine(
                    phone => {
                        return validatePhoneNumber('auth.phone', 15).safeParse(
                            phone
                        ).success;
                    },
                    {
                        message: 'Số điện thoại không hợp lệ',
                    }
                ),
        };

        return z
            .object(registerSchema)
            .refine(data => data.password === data.passwordConfirm, {
                message: 'Mật khẩu xác nhận không khớp',
                path: ['passwordConfirm'],
            });
    }

    // For login mode, only email and password
    return z.object(baseSchema);
};

/**
 * Type definition for the login form input data.
 */
export type LoginInput = {
    email: string;
    password: string;
};

/**
 * Type definition for the register form input data.
 */
export type RegisterInput = {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
    phone: string;
};

/**
 * Union type for authentication form input data.
 */
export type AuthInput = LoginInput | RegisterInput;
