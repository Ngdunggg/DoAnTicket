import z from 'zod';
import { validateMaxLength } from '@share/utils/zodUtils';

export const searchToolBarSchema = z.object({
    search: validateMaxLength('Search is required', 255)
        .min(1, {
            message: 'Search is required',
        })
        .trim()
        .optional(),
});
