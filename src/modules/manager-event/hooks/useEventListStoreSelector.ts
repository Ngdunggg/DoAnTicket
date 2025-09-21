import { useAppSelector } from '@configs/store';

const useEventListStoreSelector = () => {
    return {
        activeFilter: useAppSelector(
            state => state.manager_event_list.activeFilter
        ),
        allEvents: useAppSelector(state => state.manager_event_list.allEvents),
    };
};

export default useEventListStoreSelector;
