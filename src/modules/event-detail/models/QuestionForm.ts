import { BaseHttpResponse } from '@share/models/response';
import { validateMaxLength, validatePhoneNumber } from '@share/utils/zodUtils';
import { z } from 'zod';
import { User } from '../../../share/models/user';
import { EMAIL_REGEX } from '@share/constants/regax';
/**
 * Represents the login schema for authentication.
 */
export const questionSchema = () =>
    z.object({
        agreeToTerms: z.boolean(),
        email: validateMaxLength('Email không quá 128 ký tự', 128)
            .min(1, { message: 'Email không được để trống' })
            .refine(email => EMAIL_REGEX.test(email), {
                message: 'Email không hợp lệ',
            }),
        phone: validatePhoneNumber('Số điện thoại không quá 10 ký tự', 10).min(
            1,
            { message: 'Số điện thoại không được để trống' }
        ),
    });

/**
 * Represents the type of the login input.
 */
export type QuestionInput = z.infer<ReturnType<typeof questionSchema>>;

/**
 * Represents the response object for a login operation.
 */
export type QuestionModel = {
    token: string;
    user: User;
};

export type QuestionResponse = BaseHttpResponse<QuestionModel>;
