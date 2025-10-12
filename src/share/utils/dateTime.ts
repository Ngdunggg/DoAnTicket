import { format } from 'date-fns-tz';

/**
 * Creates a Date object with timezone override applied if available
 */
export function createDateWithTimezoneOverride(dateInput: string | Date): Date {
    if (!dateInput) return new Date();
    const raw = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const override = (
        globalThis as unknown as { __TZ_OVERRIDE_MINUTES?: number }
    ).__TZ_OVERRIDE_MINUTES;
    const jsOffset = new Date().getTimezoneOffset();
    return typeof override === 'number'
        ? new Date(raw.getTime() - (override - jsOffset) * 60 * 1000)
        : raw;
}

const withTimezoneOverride = (date: Date): Date =>
    createDateWithTimezoneOverride(date);

/**
 * Format a given datetime to specified format
 *
 * @param datetime - The datetime to be formatted (Date object, string, or number)
 * @param formatString - The desired format string
 * @returns Formatted datetime string if input is invalid
 */
export function formatDateTime(
    datetime: Date | string | number,
    formatString: string
) {
    const date = new Date(datetime);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    const displayDate = withTimezoneOverride(date);
    return format(displayDate, formatString);
}
