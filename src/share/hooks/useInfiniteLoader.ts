import { MutableRefObject, useEffect, useRef } from 'react';

type UseInfiniteLoaderParams = {
    disabled?: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
};

export function useInfiniteLoader({
    disabled,
    hasMore,
    onLoadMore,
    root,
    rootMargin = '0px 0px 200px 0px',
    threshold = 0,
}: UseInfiniteLoaderParams): MutableRefObject<HTMLDivElement | null> {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const callbackRef = useRef(onLoadMore);
    callbackRef.current = onLoadMore;

    useEffect(() => {
        if (disabled || !hasMore) return;
        const node = sentinelRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        callbackRef.current();
                    }
                });
            },
            { root: root ?? null, rootMargin, threshold }
        );
        observer.observe(node);
        return () => {
            observer.disconnect();
        };
    }, [disabled, hasMore, root, rootMargin, threshold]);

    return sentinelRef;
}

export default useInfiniteLoader;
