import useEventListStoreAction from './useEventListStoreAction';
import useEventListStoreSelector from './useEventListStoreSelector';
import { useEffect, useState } from 'react';
import { FILTER_STATUS, LOCATION, TYPE } from '@share/constants/commons';
import useHomeEventListStoreSelector from '@modules/home/hooks/useHomeEventListStoreSelector';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import useFetchEventListQuery from '@modules/home/hooks/useFetchEventListQuery';
import useHomeEventListStoreAction from '@modules/home/hooks/useHomeEventListStoreAction';

type filterOptions = {
    location: string;
    priceFree: boolean;
    type: string;
};

const useEventListHandler = () => {
    const navigate = useNavigate();
    const {
        dateRangeEnd,
        dateRangeStart,
        filterLocation,
        filterPriceFree,
        filterType,
        isOpenFilterPopup,
    } = useEventListStoreSelector();
    const { allEvents } = useHomeEventListStoreSelector();
    const { setAllEventsStore } = useHomeEventListStoreAction();
    const {
        resetEventListStateStore,
        setDateRangeEndStore,
        setDateRangeStartStore,
        setFilterLocationStore,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    } = useEventListStoreAction();

    const OPTIONS_LOCATION = [
        {
            label: 'Toàn quốc',
            value: LOCATION.ALL,
        },
        {
            label: 'Hà Nội',
            value: LOCATION.HANOI,
        },
        {
            label: 'Hồ Chí Minh',
            value: LOCATION.HCM,
        },
        {
            label: 'Đà Nẵng',
            value: LOCATION.DANANG,
        },
        {
            label: 'Vị trí khác',
            value: LOCATION.OTHER,
        },
    ];

    const OPTIONS_TYPE = [
        {
            label: 'Sân khấu & nghệ thuật',
            value: TYPE.ART,
        },
        {
            label: 'Ca nhạc',
            value: TYPE.MUSIC,
        },
        {
            label: 'Thể thao',
            value: TYPE.SPORT,
        },
        {
            label: 'Khác',
            value: TYPE.OTHER,
        },
    ];

    const [filterOptions, setFilterOptions] = useState<filterOptions>({
        location: filterLocation,
        priceFree: filterPriceFree,
        type: filterType,
    });

    const { data, isError, isLoading } = useFetchEventListQuery(
        allEvents.length === 0
    );

    useEffect(() => {
        if (allEvents.length === 0 && data && data.length > 0) {
            setAllEventsStore(
                data.filter(
                    event =>
                        event.status !== FILTER_STATUS.PENDING &&
                        event.status !== FILTER_STATUS.REJECTED
                )
            );
        }
    }, [data]);

    useEffect(() => {
        return () => {
            resetEventListStateStore();
        };
    }, []);

    const handleFilter = (
        location: string,
        priceFree: boolean,
        type: string
    ) => {
        setFilterLocationStore(location);
        setFilterPriceFreeStore(priceFree);
        setFilterTypeStore(type);
        handleResetFilter();

        setIsOpenFilterPopupStore(false);
    };

    const handleResetFilter = () => {
        setFilterOptions({
            location: LOCATION.ALL,
            priceFree: false,
            type: '',
        });
    };

    const handleViewEvent = (eventId: string) => {
        navigate(SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId));
    };

    const handleDateRangeChange = (
        start: string | null,
        end: string | null
    ) => {
        setDateRangeStartStore(start);
        setDateRangeEndStore(end);
    };

    return {
        allEvents,
        dateRangeEnd,
        dateRangeStart,
        filterLocation,
        filterOptions,
        filterPriceFree,
        filterType,
        handleDateRangeChange,
        handleFilter,
        handleResetFilter,
        handleViewEvent,
        isError,
        isLoading,
        isOpenFilterPopup,
        OPTIONS_LOCATION,
        OPTIONS_TYPE,
        setFilterLocationStore,
        setFilterOptions,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    };
};

export default useEventListHandler;
