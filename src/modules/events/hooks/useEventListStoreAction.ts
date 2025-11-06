import { useAppDispatch } from '@configs/store';
import {
    resetEventListState,
    setDateRangeEnd,
    setDateRangeStart,
    setIsOpenFilterPopup,
    setFilterLocation,
    setFilterPriceFree,
    setFilterType,
} from '../stores/EventListSlice';

const useEventListStoreAction = () => {
    const dispatch = useAppDispatch();

    const setDateRangeEndStore = (data: string | null) => {
        dispatch(setDateRangeEnd(data));
    };

    const setDateRangeStartStore = (data: string | null) => {
        dispatch(setDateRangeStart(data));
    };

    const setIsOpenFilterPopupStore = (data: boolean) => {
        dispatch(setIsOpenFilterPopup(data));
    };

    const setFilterLocationStore = (data: string) => {
        dispatch(setFilterLocation(data));
    };

    const setFilterPriceFreeStore = (data: boolean) => {
        dispatch(setFilterPriceFree(data));
    };

    const setFilterTypeStore = (data: string) => {
        dispatch(setFilterType(data));
    };

    const resetEventListStateStore = () => {
        dispatch(resetEventListState());
    };

    return {
        resetEventListStateStore,
        setDateRangeEndStore,
        setDateRangeStartStore,
        setFilterLocationStore,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    };
};

export default useEventListStoreAction;
