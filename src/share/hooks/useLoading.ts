import { useState, useCallback } from 'react';

interface IUseLoadingReturn {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

export const useLoading = (initialState = false): IUseLoadingReturn => {
    const [isLoading, setIsLoading] = useState(initialState);

    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const withLoading = useCallback(
        async <T>(asyncFn: () => Promise<T>): Promise<T> => {
            try {
                startLoading();
                const result = await asyncFn();
                return result;
            } finally {
                stopLoading();
            }
        },
        [startLoading, stopLoading]
    );

    return {
        isLoading,
        startLoading,
        stopLoading,
        withLoading,
    };
};
