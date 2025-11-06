import { useAppDispatch } from '@configs/store';
import {
    resetManagerEventListState,
    setActiveFilter,
    setAllEventsByOrganizer,
} from '../../../stores/eventListSlice';
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
    const setAllEventsByOrganizerStore = (data: Event[]) => {
        dispatch(setAllEventsByOrganizer(data));
    };

    return {
        resetManagerEventListStateStore,
        setActiveFilterStore,
        setAllEventsByOrganizerStore,
    };
};

export default useEventListStoreAction;
