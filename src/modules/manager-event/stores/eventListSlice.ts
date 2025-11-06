import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FILTER_STATUS, FilterStatus } from '@share/constants/commons';
import { Event } from '@share/types/event';

type ManagerEventListState = {
    activeFilter: FilterStatus;
    allEventsByOrganizer: Event[];
};

/**
 * Initial state: eventList is empty by default.
 */
const initialState: ManagerEventListState = {
    activeFilter: FILTER_STATUS.ALL,
    allEventsByOrganizer: [],
};

const managerEventListSlice = createSlice({
    initialState,
    name: 'manager_event_list',
    reducers: {
        resetManagerEventListState: () => {
            return initialState;
        },
        setActiveFilter: (state, action: PayloadAction<FilterStatus>) => {
            state.activeFilter = action.payload;
        },
        setAllEventsByOrganizer: (state, action: PayloadAction<Event[]>) => {
            state.allEventsByOrganizer = action.payload;
        },
    },
});

// Exports
export const {
    resetManagerEventListState,
    setActiveFilter,
    setAllEventsByOrganizer,
} = managerEventListSlice.actions;
export default managerEventListSlice.reducer;
