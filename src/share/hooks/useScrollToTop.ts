import { useEffect } from 'react';

/**
 * Custom hook để scroll về đầu trang khi component mount
 * Sử dụng trong các page components để đảm bảo trang luôn bắt đầu từ đầu
 */
const useScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useScrollToTop;
