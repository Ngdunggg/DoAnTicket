import { useAppDispatch } from '@configs/store';
import {
    resetManagerEventListState,
    setActiveFilter,
    setAllEvents,
} from '../stores/eventListSlice';
import { FilterStatus } from '@share/constants/commons';
import { Event } from '@share/types/event';

const useEventListStoreAction = () => {
    const dispatch = useAppDispatch();

    const setActiveFilterStore = (data: FilterStatus) => {
        dispatch(setActiveFilter(data));
    };
    const resetManagerEventListStateStore = () => {
        dispatch(resetManagerEventListState());
    };
    const setAllEventsStore = (data: Event[]) => {
        dispatch(setAllEvents(data));
    };

    return {
        resetManagerEventListStateStore,
        setActiveFilterStore,
        setAllEventsStore,
    };
};

export default useEventListStoreAction;
