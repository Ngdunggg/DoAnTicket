import { useAppDispatch } from '@configs/store';
import { Event } from '@share/types/event';
import { setAllEvents } from '../stores/homeEventListSlice';

const useHomeEventListStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        setAllEventsStore: (data: Event[]) => dispatch(setAllEvents(data)),
    };
};

export default useHomeEventListStoreAction;
