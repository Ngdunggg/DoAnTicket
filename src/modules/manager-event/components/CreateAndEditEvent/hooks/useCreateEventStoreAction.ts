import { useAppDispatch } from '@configs/store';
import {
    setIsOpenCreateEvent,
    resetCreateEventState,
    setActiveTab,
} from '../../../stores/createEventSlice';

const useCreateEventStoreAction = () => {
    const dispatch = useAppDispatch();

    const setIsOpenCreateEventStore = (data: boolean) => {
        dispatch(setIsOpenCreateEvent(data));
    };
    const resetCreateEventStateStore = () => {
        dispatch(resetCreateEventState());
    };
    const setActiveTabStore = (data: string) => {
        dispatch(setActiveTab(data));
    };

    return {
        resetCreateEventStateStore,
        setActiveTabStore,
        setIsOpenCreateEventStore,
    };
};

export default useCreateEventStoreAction;
