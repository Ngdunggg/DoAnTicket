import useEventListStoreAction from './useEventListStoreAction';
import useEventListStoreSelector from './useEventListStoreSelector';
import { useEffect, useState } from 'react';
import { LOCATION, TYPE } from '@share/constants/commons';

type filterOptions = {
    location: string;
    priceFree: boolean;
    type: string;
};

const useEventListHandler = () => {
    const { filterLocation, filterPriceFree, filterType, isOpenFilterPopup } =
        useEventListStoreSelector();
    const {
        resetEventListStateStore,
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

    return {
        filterLocation,
        filterOptions,
        filterPriceFree,
        filterType,
        handleFilter,
        handleResetFilter,
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
