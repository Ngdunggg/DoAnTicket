import { useAppDispatch } from '@configs/store';
import {
    setActiveTab,
    setCategoryList,
    setEventList,
    setOrderList,
    setSelectedReportEventId,
    setUserList,
} from '../store/adminSlice';
import { Event } from '@share/types/event';
import { User } from '@share/models/auth/user';
import { Order } from '@share/types/admin';
import { AdminTab } from '@share/constants/commons';
import { Category } from '@share/api/categoriesApi';

const useAdminStoreAction = () => {
    const dispatch = useAppDispatch();

    const setActiveTabStore = (data: AdminTab) => {
        dispatch(setActiveTab(data));
    };

    const setCategoryListStore = (data: Category[]) => {
        dispatch(setCategoryList(data));
    };

    const setEventListStore = (data: Event[]) => {
        dispatch(setEventList(data));
    };

    const setSelectedReportEventIdStore = (data: string | null) => {
        dispatch(setSelectedReportEventId(data));
    };

    const setUserListStore = (data: User[]) => {
        dispatch(setUserList(data));
    };

    const setOrderListStore = (data: Order[]) => {
        dispatch(setOrderList(data));
    };

    return {
        setActiveTabStore,
        setCategoryListStore,
        setEventListStore,
        setOrderListStore,
        setSelectedReportEventIdStore,
        setUserListStore,
    };
};

export default useAdminStoreAction;
