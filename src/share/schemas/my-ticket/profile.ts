import { z } from 'zod';
import { validateMaxLength, validatePhoneNumber } from '@share/utils/zodUtils';
import { EMAIL_REGEX } from '@share/constants/regax';

/**
 * Schema validation cho profile form
 */
export const profileSchema = () =>
    z.object({
        address: validateMaxLength('Địa chỉ không quá 200 ký tự', 200)
            .min(1, { message: 'Địa chỉ không được để trống' })
            .min(5, { message: 'Địa chỉ phải có ít nhất 5 ký tự' }),

        avatar: z.string().optional(),

        dateOfBirth: z
            .string()
            .min(1, { message: 'Ngày sinh không được để trống' })
            .refine(
                date => {
                    const birthDate = new Date(date);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return age >= 0 && age <= 120;
                },
                { message: 'Ngày sinh không hợp lệ' }
            ),

        email: z
            .string()
            .min(1, { message: 'Email không được để trống' })
            .refine(email => EMAIL_REGEX.test(email), {
                message: 'Email không hợp lệ',
            }),

        fullName: validateMaxLength('Họ và tên không quá 100 ký tự', 100)
            .min(1, { message: 'Họ và tên không được để trống' })
            .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' }),

        gender: z.enum(['male', 'female', 'other'], {
            required_error: 'Vui lòng chọn giới tính',
        }),

        phone: validatePhoneNumber('Số điện thoại không quá 10 ký tự', 10).min(
            1,
            { message: 'Số điện thoại không được để trống' }
        ),
    });

/**
 * Type cho profile input
 */
export type ProfileInput = z.infer<ReturnType<typeof profileSchema>>;

/**
 * Type cho profile data (bao gồm cả avatar)
 */
export type ProfileData = ProfileInput & {
    avatar?: string;
};
