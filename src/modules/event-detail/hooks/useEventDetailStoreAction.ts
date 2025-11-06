import { useAppDispatch } from '@configs/store';
import { setEventDetail } from '../stores/eventDetailSlice';
import { Event } from '@share/types/event';
import { TicketPurchaseState } from '../types/ticketPurchase';
import {
    setIsOpenUpdateInfoUser,
    setSelectedTickets,
} from '../stores/eventDetailSlice';

const useEventDetailStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        setEventDetailStore: (data: Event) => dispatch(setEventDetail(data)),
        setIsOpenUpdateInfoUserStore: (data: boolean) =>
            dispatch(setIsOpenUpdateInfoUser(data)),
        setSelectedTicketsStore: (data: TicketPurchaseState | null) =>
            dispatch(setSelectedTickets(data)),
    };
};

export default useEventDetailStoreAction;
