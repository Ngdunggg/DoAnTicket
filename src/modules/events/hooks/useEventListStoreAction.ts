import { useAppDispatch } from '@configs/store';
import {
    setIsOpenFilterPopup,
    resetEventListState,
    setFilterType,
    setFilterPriceFree,
    setFilterLocation,
} from '../stores/EventListSlice';

const useEventListStoreAction = () => {
    const dispatch = useAppDispatch();

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
        setFilterLocationStore,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    };
};

export default useEventListStoreAction;
