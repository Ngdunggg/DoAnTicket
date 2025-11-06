import { useAppDispatch } from '@configs/store';
import { setMyTickets, setSelectedTicketId } from '../stores/myTicketSlice';
import { MyTicketModel } from '@share/models/event/myTicket';

const useMyTicketStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        setMyTicketsStore: (data: MyTicketModel | null) =>
            dispatch(setMyTickets(data)),
        setSelectedTicketIdStore: (ticketId: string | null) =>
            dispatch(setSelectedTicketId(ticketId)),
    };
};

export default useMyTicketStoreAction;
