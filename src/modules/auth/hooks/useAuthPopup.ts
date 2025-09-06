import { useState, useCallback } from 'react';

export const useAuthPopup = () => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

    const openAuthPopup = useCallback(() => {
        setIsAuthPopupOpen(true);
    }, []);

    const closeAuthPopup = useCallback(() => {
        setIsAuthPopupOpen(false);
    }, []);

    return {
        closeAuthPopup,
        isAuthPopupOpen,
        openAuthPopup,
    };
};
