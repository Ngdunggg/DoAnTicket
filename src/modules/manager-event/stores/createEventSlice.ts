import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
import { OrganizerProfileWithPaymentMethod } from '@share/types/organizer';
import { Category } from '@share/api/categoriesApi';

type CreateEventState = {
    active_tab: string;
    event_types: Category[] | null;
    is_loading: boolean;
    is_open_create_event: boolean;
    organizer_profile: OrganizerProfileWithPaymentMethod | null;
};

/**
 * Initial state: eventList is empty by default.
 */
const initialState: CreateEventState = {
    active_tab: CREATE_EVENT_TAB.INFO,
    event_types: null,
    is_loading: false,
    is_open_create_event: false,
    organizer_profile: null,
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
        setEventTypes: (state, action: PayloadAction<Category[] | null>) => {
            state.event_types = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.is_loading = action.payload;
        },
        setIsOpenCreateEvent: (state, action: PayloadAction<boolean>) => {
            state.is_open_create_event = action.payload;
        },
        setOrganizerProfile: (
            state,
            action: PayloadAction<OrganizerProfileWithPaymentMethod | null>
        ) => {
            state.organizer_profile = action.payload;
        },
    },
});

// Exports
export const {
    resetCreateEventState,
    setActiveTab,
    setEventTypes,
    setIsLoading,
    setIsOpenCreateEvent,
    setOrganizerProfile,
} = createEventSlice.actions;
export default createEventSlice.reducer;
