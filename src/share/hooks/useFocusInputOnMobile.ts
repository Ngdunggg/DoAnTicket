import { RefObject, useRef } from 'react';
import useDetectMobile from './useDetectMobile';

/**
 * Custom hook to handle focus and scrolling on mobile devices.
 *
 * @param inputRef - The reference to the input element.
 * @param isMobile - Flag to indicate if the device is mobile.
 * @returns A function that will focus the input and scroll it into view.
 */
export function useFocusInputOnMobile<T extends HTMLElement>(
    inputRef?: RefObject<T | null> | undefined
) {
    const defaultRef = useRef<T | null>(null);

    const isMobile = useDetectMobile();

    const resolvedRef = inputRef || defaultRef;

    const handleFocus = () => {
        if (!resolvedRef || !isMobile) {
            return;
        }
        const delay = 500;

        setTimeout(() => {
            resolvedRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, delay);
    };

    return { handleFocus, resolvedRef };
}
