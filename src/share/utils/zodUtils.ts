import { z } from 'zod';
import { TEL_REGEX } from '@share/constants/regax';

export function validateMaxLength(field: string, length: number) {
    return z.string({ message: field }).trim().max(length, {
        message: field,
    });
}

export function validatePhoneNumber(field: string, length: number) {
    return z
        .string({ message: field })
        .trim()
        .max(length, {
            message: field,
        })
        .regex(TEL_REGEX, {
            message: field,
        });
}
