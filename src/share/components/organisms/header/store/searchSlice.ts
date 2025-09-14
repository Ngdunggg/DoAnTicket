import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
    is_account_popup_open: boolean;
    is_search: boolean;
    is_search_popup_open: boolean;
    search_text: string;
};

/**
 * Initial state: worksitesList is empty by default.
 */
const initialState: SearchState = {
    is_account_popup_open: false,
    is_search: true,
    is_search_popup_open: false,
    search_text: '',
};

const searchSlice = createSlice({
    initialState,
    name: 'search',
    reducers: {
        resetSearchState: () => {
            return initialState;
        },
        setIsAccountPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.is_account_popup_open = action.payload;
        },
        setIsSearch: (state, action: PayloadAction<boolean>) => {
            state.is_search = action.payload;
        },
        setIsSearchPopupOpen: (state, action: PayloadAction<boolean>) => {
            state.is_search_popup_open = action.payload;
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.search_text = action.payload;
        },
    },
});

// Exports
export const {
    resetSearchState,
    setIsAccountPopupOpen,
    setIsSearch,
    setIsSearchPopupOpen,
    setSearchText,
} = searchSlice.actions;
export default searchSlice.reducer;
