import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component để tự động scroll về đầu trang khi route thay đổi
 * Sử dụng trong Layout để áp dụng cho toàn bộ ứng dụng
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
