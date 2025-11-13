import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@share/models/auth/user';
import { Event } from '@share/types/event';
import { Order } from '@share/types/admin';
import { ADMIN_TAB, AdminTab } from '@share/constants/commons';
import { Category } from '@share/api/categoriesApi';

type AdminState = {
    activeTab: AdminTab;
    categoryList: Category[];
    eventList: Event[];
    orderList: Order[];
    selectedReportEventId: string | null;
    userList: User[];
};

const initialState: AdminState = {
    activeTab: ADMIN_TAB.DASHBOARD,
    categoryList: [],
    eventList: [],
    orderList: [],
    selectedReportEventId: null,
    userList: [],
};

const adminSlice = createSlice({
    initialState,
    name: 'admin',
    reducers: {
        setActiveTab: (state, action: PayloadAction<AdminTab>) => {
            state.activeTab = action.payload;
        },
        setCategoryList: (state, action: PayloadAction<Category[]>) => {
            state.categoryList = action.payload;
        },
        setEventList: (state, action: PayloadAction<Event[]>) => {
            state.eventList = action.payload;
        },
        setOrderList: (state, action: PayloadAction<Order[]>) => {
            state.orderList = action.payload;
        },
        setSelectedReportEventId: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.selectedReportEventId = action.payload;
        },
        setUserList: (state, action: PayloadAction<User[]>) => {
            state.userList = action.payload;
        },
    },
});

export const {
    setActiveTab,
    setCategoryList,
    setEventList,
    setOrderList,
    setSelectedReportEventId,
    setUserList,
} = adminSlice.actions;
export default adminSlice.reducer;
