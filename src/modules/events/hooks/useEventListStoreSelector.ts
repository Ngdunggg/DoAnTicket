import { useAppSelector } from '@configs/store';

const useEventListStoreSelector = () => {
    return {
        dateRangeEnd: useAppSelector(state => state.event_list.date_range_end),
        dateRangeStart: useAppSelector(
            state => state.event_list.date_range_start
        ),
        filterLocation: useAppSelector(
            state => state.event_list.filter_location
        ),
        filterPriceFree: useAppSelector(
            state => state.event_list.filter_price_free
        ),
        filterType: useAppSelector(state => state.event_list.filter_type),
        isOpenFilterPopup: useAppSelector(
            state => state.event_list.is_open_filter_popup
        ),
    };
};

export default useEventListStoreSelector;
