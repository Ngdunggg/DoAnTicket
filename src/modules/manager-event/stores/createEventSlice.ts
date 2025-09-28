import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CREATE_EVENT_TAB } from '@share/constants/commons';

type CreateEventState = {
    active_tab: string;
    is_open_create_event: boolean;
};

/**
 * Initial state: eventList is empty by default.
 */
const initialState: CreateEventState = {
    active_tab: CREATE_EVENT_TAB.INFO,
    is_open_create_event: false,
};

const createEventSlice = createSlice({
    initialState,
    name: 'create_event',
    reducers: {
        resetCreateEventState: () => {
            return initialState;
        },
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.active_tab = action.payload;
        },
        setIsOpenCreateEvent: (state, action: PayloadAction<boolean>) => {
            state.is_open_create_event = action.payload;
        },
    },
});

// Exports
export const { resetCreateEventState, setActiveTab, setIsOpenCreateEvent } =
    createEventSlice.actions;
export default createEventSlice.reducer;
