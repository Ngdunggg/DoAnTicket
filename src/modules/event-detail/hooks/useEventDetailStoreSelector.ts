import { useAppSelector } from '@configs/store';

const useEventDetailStoreSelector = () => {
    return {
        eventDetail: useAppSelector(state => state.event_detail.eventDetail),
        isOpenUpdateInfoUser: useAppSelector(
            state => state.event_detail.is_open_update_info_user
        ),
        selectedTickets: useAppSelector(
            state => state.event_detail.selected_tickets
        ),
    };
};

export default useEventDetailStoreSelector;
