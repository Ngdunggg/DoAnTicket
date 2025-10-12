import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@share/types/event';

type HomeEventListState = {
    allEvents: Event[];
};

const initialState: HomeEventListState = {
    allEvents: [],
};

const homeEventListSlice = createSlice({
    initialState,
    name: 'home_event_list',
    reducers: {
        setAllEvents: (state, action: PayloadAction<Event[]>) => {
            state.allEvents = action.payload;
        },
    },
});

export const { setAllEvents } = homeEventListSlice.actions;
export default homeEventListSlice.reducer;
