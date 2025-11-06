import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@share/types/event';
import { TicketPurchaseState } from '../types/ticketPurchase';

type EventDetailState = {
    eventDetail: Event | null;
    is_open_update_info_user: boolean;
    selected_tickets: TicketPurchaseState | null;
};

const initialState: EventDetailState = {
    eventDetail: null,
    is_open_update_info_user: false,
    selected_tickets: null,
};

const eventDetailSlice = createSlice({
    initialState,
    name: 'event_detail',
    reducers: {
        setEventDetail: (state, action: PayloadAction<Event>) => {
            state.eventDetail = action.payload;
        },
        setIsOpenUpdateInfoUser: (state, action: PayloadAction<boolean>) => {
            state.is_open_update_info_user = action.payload;
        },
        setSelectedTickets: (
            state,
            action: PayloadAction<TicketPurchaseState | null>
        ) => {
            state.selected_tickets = action.payload;
        },
    },
});

export const { setEventDetail, setIsOpenUpdateInfoUser, setSelectedTickets } =
    eventDetailSlice.actions;
export default eventDetailSlice.reducer;
