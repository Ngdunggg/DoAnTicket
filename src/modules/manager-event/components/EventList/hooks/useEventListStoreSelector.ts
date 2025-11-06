import { useAppSelector } from '@configs/store';

const useEventListStoreSelector = () => {
    return {
        activeFilter: useAppSelector(
            state => state.manager_event_list.activeFilter
        ),
        allEventsByOrganizer: useAppSelector(
            state => state.manager_event_list.allEventsByOrganizer
        ),
    };
};

export default useEventListStoreSelector;
