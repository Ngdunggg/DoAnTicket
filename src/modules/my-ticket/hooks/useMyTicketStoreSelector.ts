import { useAppSelector } from '@configs/store';

const useMyTicketStoreSelector = () => {
    return {
        myTickets: useAppSelector(state => state.my_ticket.myTickets),
        selectedTicketId: useAppSelector(
            state => state.my_ticket.selectedTicketId
        ),
    };
};

export default useMyTicketStoreSelector;
