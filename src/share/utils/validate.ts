/**
 * Type guard function that checks if a value is neither null nor undefined.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is not null or undefined.
 * @typeParam T - The type of the value.
 */
export function isNotNullOrUndefined<T>(
    value: T | null | undefined
): value is T {
    return value !== null && value !== undefined;
}

/**
 * Type guard function that checks if a value is neither null, undefined, nor an empty string.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is not null, undefined, or an empty string.
 * @typeParam T - The type of the value.
 */
export function isNotNullOrUndefinedOrBlank<T>(
    value: T | null | undefined
): value is T {
    return value !== null && value !== undefined && value !== '';
}

/**
 * Type guard function that checks if a value is a valid number.
 * It also ensures the value is not null, undefined, an empty string, a boolean, or an array.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a number.
 * @typeParam T - The type of the value.
 */
export function isNumber<T>(value: T | null | undefined): value is T {
    return (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        typeof value !== 'boolean' &&
        !Array.isArray(value) &&
        !isNaN(Number(value))
    );
}
