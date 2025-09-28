import { useAppSelector } from '@configs/store';

const useCreateEventStoreSelector = () => {
    return {
        activeTab: useAppSelector(state => state.create_event.active_tab),
        isOpenCreateEvent: useAppSelector(
            state => state.create_event.is_open_create_event
        ),
    };
};

export default useCreateEventStoreSelector;
