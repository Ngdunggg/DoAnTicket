import { useRef, useState, useEffect } from 'react';

interface UseHorizontalScrollOptions {
    // Số pixel scroll mỗi lần
    gap?: number; // Chiều rộng mỗi item
    itemsPerScroll?: number; // Khoảng cách giữa các items
    itemWidth?: number;
    scrollAmount?: number; // Số items scroll mỗi lần
}

export const useHorizontalScroll = (
    options: UseHorizontalScrollOptions = {}
) => {
    const {
        gap = 16,
        itemsPerScroll = 3,
        itemWidth = 300,
        scrollAmount,
    } = options;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    // Tính toán scroll amount nếu không được cung cấp
    const calculatedScrollAmount =
        scrollAmount || itemsPerScroll * itemWidth + (itemsPerScroll - 1) * gap;

    const scrollToDirection = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollValue =
            direction === 'left'
                ? -calculatedScrollAmount
                : calculatedScrollAmount;

        container.scrollBy({
            behavior: 'smooth',
            left: scrollValue,
        });
    };

    const canScrollLeft = () => {
        if (!scrollContainerRef.current) return false;
        const container = scrollContainerRef.current;
        return container.scrollLeft > 0;
    };

    const canScrollRight = () => {
        if (!scrollContainerRef.current) return false;
        const container = scrollContainerRef.current;

        const totalWidth = container.scrollWidth;
        const visibleWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;

        const tolerance = 1;
        return (
            totalWidth > visibleWidth &&
            currentScroll + tolerance < totalWidth - visibleWidth
        );
    };

    const updateButtonVisibility = () => {
        if (!scrollContainerRef.current) return;

        setShowLeftButton(canScrollLeft());
        setShowRightButton(canScrollRight());
    };

    // Update button visibility khi items thay đổi
    useEffect(() => {
        updateButtonVisibility();
    }, []);

    // Effect để update button visibility khi component mount và window resize
    useEffect(() => {
        const handleResize = () => {
            updateButtonVisibility();
        };

        updateButtonVisibility();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Thêm scroll event listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            updateButtonVisibility();
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        scrollContainerRef,
        scrollToDirection,
        showLeftButton,
        showRightButton,
        updateButtonVisibility,
    };
};
