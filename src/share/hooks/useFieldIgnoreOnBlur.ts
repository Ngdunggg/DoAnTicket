import React, { RefObject, useCallback } from 'react';

/**
 * Custom hook that ignores the onBlur event if the next focused element is inside the ignored elements.
 *
 * @param onBlur - Callback function to be executed on blur event.
 * @param ignoreRefs - Array of RefObjects representing the elements to be ignored.
 * @returns An object containing the handleBlur function.
 */
export function useFieldIgnoreOnBlur(
    onBlur: () => void,
    ignoreRefs: RefObject<HTMLElement | null>[]
) {
    const handleBlur = useCallback(
        (e: React.FocusEvent) => {
            const nextFocused = e.relatedTarget as HTMLElement | null;

            const isInsideIgnored = ignoreRefs.some(ref =>
                ref.current?.contains(nextFocused)
            );

            if (!isInsideIgnored) {
                onBlur();
            }
        },
        [onBlur, ignoreRefs]
    );

    return { handleBlur };
}
