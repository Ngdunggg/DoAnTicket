import { useAppSelector } from '@configs/store';

const useAdminStoreSelector = () => {
    return {
        activeTab: useAppSelector(state => state.admin.activeTab),
        categoryList: useAppSelector(state => state.admin.categoryList),
        eventList: useAppSelector(state => state.admin.eventList),
        orderList: useAppSelector(state => state.admin.orderList),
        userList: useAppSelector(state => state.admin.userList),
    };
};

export default useAdminStoreSelector;
