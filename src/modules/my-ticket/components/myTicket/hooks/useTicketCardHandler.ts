import useMyTicketStoreAction from '@modules/my-ticket/hooks/useMyTicketStoreAction';
import {
    MY_TICKET_TAB,
    PURCHASED_TICKET_STATUS,
    PurchasedTicketStatus,
} from '@share/constants/commons';
import { Event } from '@share/types/event';
import { useState, useEffect, useRef } from 'react';

const useTicketCardHandler = (ticketId: string) => {
    const { setSelectedTicketIdStore } = useMyTicketStoreAction();
    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getStatus = (ticketEvent: Event) => {
        const now = new Date();
        const eventDate = new Date(ticketEvent.start_time || '');
        return eventDate > now ? MY_TICKET_TAB.UPCOMING : MY_TICKET_TAB.PAST;
    };

    const getDisplayStatusText = (
        ticketEvent: Event,
        ticketStatus: PurchasedTicketStatus
    ) => {
        const now = new Date();
        const eventEndDate = new Date(ticketEvent.end_time || '');
        const isEventNotEnded = eventEndDate > now;

        if (ticketStatus === PURCHASED_TICKET_STATUS.USED && isEventNotEnded) {
            return 'Đã dùng';
        }

        const eventStatus = getStatus(ticketEvent);
        return eventStatus === MY_TICKET_TAB.UPCOMING
            ? 'Sắp diễn ra'
            : 'Đã diễn ra';
    };

    const handleOpenQrPopup = () => {
        setSelectedTicketIdStore(ticketId);
    };

    const handleCloseQrPopup = () => {
        setSelectedTicketIdStore(null);
    };

    return {
        getDisplayStatusText,
        getStatus,
        handleCloseQrPopup,
        handleOpenQrPopup,
        menuRef,
        setShowMenu,
        showMenu,
    };
};

export default useTicketCardHandler;
