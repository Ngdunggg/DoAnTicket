import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCATION } from '@share/constants/commons';

type EventListState = {
    filter_location: string;
    filter_price_free: boolean;
    filter_type: string;
    is_open_filter_popup: boolean;
};

/**
 * Initial state: eventList is empty by default.
 */
const initialState: EventListState = {
    filter_location: LOCATION.ALL,
    filter_price_free: false,
    filter_type: '',
    is_open_filter_popup: false,
};

const eventListSlice = createSlice({
    initialState,
    name: 'event_list',
    reducers: {
        resetEventListState: () => {
            return initialState;
        },
        setFilterLocation: (state, action: PayloadAction<string>) => {
            state.filter_location = action.payload;
        },
        setFilterPriceFree: (state, action: PayloadAction<boolean>) => {
            state.filter_price_free = action.payload;
        },
        setFilterType: (state, action: PayloadAction<string>) => {
            state.filter_type = action.payload;
        },
        setIsOpenFilterPopup: (state, action: PayloadAction<boolean>) => {
            state.is_open_filter_popup = action.payload;
        },
    },
});

// Exports
export const {
    resetEventListState,
    setFilterLocation,
    setFilterPriceFree,
    setFilterType,
    setIsOpenFilterPopup,
} = eventListSlice.actions;
export default eventListSlice.reducer;
