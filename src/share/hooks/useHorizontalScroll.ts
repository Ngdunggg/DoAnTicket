import { useRef, useState, useEffect, useCallback } from 'react';

interface UseHorizontalScrollOptions {
    gap?: number; // Chiều rộng mỗi item
    itemsPerScroll?: number; // Khoảng cách giữa các items
    itemWidth?: number; // Số items scroll mỗi lần
}

export const useHorizontalScroll = (
    options: UseHorizontalScrollOptions = {}
) => {
    const { gap = 16, itemsPerScroll = 3, itemWidth = 300 } = options;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    // Tính toán scroll amount
    const scrollAmount = itemsPerScroll * (itemWidth + gap) - gap;

    const scrollToDirection = useCallback(
        (direction: 'left' | 'right') => {
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const scrollValue =
                direction === 'left' ? -scrollAmount : scrollAmount;

            container.scrollBy({
                behavior: 'smooth',
                left: scrollValue,
            });
        },
        [scrollAmount]
    );

    const updateButtonVisibility = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const { clientWidth, scrollLeft, scrollWidth } = container;

        setShowLeftButton(scrollLeft > 5);
        setShowRightButton(scrollLeft + 10 < scrollWidth - clientWidth);
    }, []);

    // Update button visibility khi component mount
    useEffect(() => {
        const timer = setTimeout(updateButtonVisibility, 100);
        return () => clearTimeout(timer);
    }, [updateButtonVisibility]);

    // Update button visibility khi scroll hoặc resize
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleUpdate = () => updateButtonVisibility();

        container.addEventListener('scroll', handleUpdate, { passive: true });
        window.addEventListener('resize', handleUpdate);

        return () => {
            container.removeEventListener('scroll', handleUpdate);
            window.removeEventListener('resize', handleUpdate);
        };
    }, [updateButtonVisibility]);

    return {
        scrollContainerRef,
        scrollToDirection,
        showLeftButton,
        showRightButton,
    };
};
