import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonState, MessageContent } from '@share/types/commons';

/**
 * Initial state: message is null when nothing to show.
 */
const initialState: CommonState = {
    is_loading: false,
    is_online: true,
    is_show_menu: false,
    is_show_modal_logout: false,
    message: null,
};

const commonSlice = createSlice({
    initialState,
    name: 'main',
    reducers: {
        clearMessage: state => {
            state.message = null;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.is_loading = action.payload;
        },
        setIsOnline(state, action: PayloadAction<boolean>) {
            state.is_online = action.payload;
        },
        setIsShowModalLogout(state, action: PayloadAction<boolean>) {
            state.is_show_modal_logout = action.payload;
        },
        setMessage: (state, action: PayloadAction<MessageContent>) => {
            state.message = action.payload;
        },
        setShowMenu(state, action: PayloadAction<boolean>) {
            state.is_show_menu = action.payload;
        },
    },
});

// Exports
export const {
    clearMessage,
    setIsLoading,
    setIsOnline,
    setIsShowModalLogout,
    setMessage,
    setShowMenu,
} = commonSlice.actions;
export default commonSlice.reducer;
