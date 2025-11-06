import { useAppDispatch } from '@configs/store';
import {
    setIsOpenCreateEvent,
    resetCreateEventState,
    setActiveTab,
    setOrganizerProfile,
    setEventTypes,
    setIsLoading,
} from '../../../stores/createEventSlice';
import { OrganizerProfileWithPaymentMethod } from '@share/types/organizer';
import { Category } from '@share/api/categoriesApi';

const useCreateEventStoreAction = () => {
    const dispatch = useAppDispatch();

    const setIsOpenCreateEventStore = (data: boolean) => {
        dispatch(setIsOpenCreateEvent(data));
    };
    const setIsLoadingStore = (data: boolean) => {
        dispatch(setIsLoading(data));
    };
    const resetCreateEventStateStore = () => {
        dispatch(resetCreateEventState());
    };
    const setActiveTabStore = (data: string) => {
        dispatch(setActiveTab(data));
    };
    const setOrganizerProfileStore = (
        data: OrganizerProfileWithPaymentMethod | null
    ) => {
        dispatch(setOrganizerProfile(data));
    };
    const setEventTypesStore = (data: Category[] | null) => {
        dispatch(setEventTypes(data));
    };

    return {
        resetCreateEventStateStore,
        setActiveTabStore,
        setEventTypesStore,
        setIsLoadingStore,
        setIsOpenCreateEventStore,
        setOrganizerProfileStore,
    };
};

export default useCreateEventStoreAction;
