import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyTicketModel } from '@share/models/event/myTicket';

type MyTicketState = {
    myTickets: MyTicketModel | null;
    selectedTicketId: string | null;
};

const initialState: MyTicketState = {
    myTickets: null,
    selectedTicketId: null,
};

const myTicketSlice = createSlice({
    initialState,
    name: 'my_ticket',
    reducers: {
        setMyTickets: (state, action: PayloadAction<MyTicketModel | null>) => {
            state.myTickets = action.payload;
        },
        setSelectedTicketId: (state, action: PayloadAction<string | null>) => {
            state.selectedTicketId = action.payload;
        },
    },
});

export const { setMyTickets, setSelectedTicketId } = myTicketSlice.actions;
export default myTicketSlice.reducer;
