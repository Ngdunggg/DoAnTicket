import DivClick from '@share/components/atoms/DivClick';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import ChevronIcon, {
    MODE_CHEVRON,
} from '@share/components/atoms/icons/ChevronIcon';
import FilterIcon, {
    MODE_FILTER,
} from '@share/components/atoms/icons/FilterIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import EventGrid from '@share/components/organisms/EventGrid';
import useEventListHandler from '../hooks/useEventListHandler';
import FilterPopup from './FilterPopup';
import { RefObject, useRef } from 'react';
import Button, { MODE_BUTTON, SIZE_ICON } from '@share/components/atoms/Button';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';
import { LOCATION, TYPE } from '@share/constants/commons';
import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

const EventListContainer = () => {
    const location = useLocation();
    const {
        allEvents,
        dateRangeEnd,
        dateRangeStart,
        filterLocation,
        filterPriceFree,
        filterType,
        handleDateRangeChange,
        handleViewEvent,
        isOpenFilterPopup,
        setFilterLocationStore,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    } = useEventListHandler();

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const filterButtonRef = useRef<HTMLDivElement>(null);

    // Lấy search keyword từ navigation state
    const searchKeyword = location.state?.searchKeyword || '';

    // Format date for display
    const formatDateDisplay = (dateStr: string | null) => {
        if (!dateStr) return 'Tất cả các ngày';
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    };
    // Filter events by search keyword and filters
    const normalizedKeyword = searchKeyword.toLowerCase();
    const filteredEvents = useMemo(
        () =>
            allEvents
                .filter(event => {
                    if (!searchKeyword) return true;
                    const inTitle = event.title
                        ?.toLowerCase()
                        .includes(normalizedKeyword);
                    const inLocation = event.location
                        ?.toLowerCase()
                        .includes(normalizedKeyword);
                    const inDescription = event.description
                        ?.toLowerCase()
                        .includes(normalizedKeyword);
                    const inCategory = event.categories?.some(
                        c => c.name?.toLowerCase() === normalizedKeyword
                    );
                    return inTitle || inLocation || inDescription || inCategory;
                })
                .filter(event => {
                    // Location filter
                    if (filterLocation === LOCATION.ALL) return true;
                    if (!event.location) return false;
                    if (filterLocation === LOCATION.OTHER) {
                        // Not in predefined cities
                        const knownCities = [
                            LOCATION.HANOI,
                            LOCATION.HCM,
                            LOCATION.DANANG,
                        ];
                        return !knownCities.some(city =>
                            event.location
                                ?.toLowerCase()
                                .includes(city.toLowerCase())
                        );
                    }
                    return event.location
                        .toLowerCase()
                        .includes(filterLocation.toLowerCase());
                })
                .filter(event => {
                    // Type filter by category name
                    if (!filterType) return true;
                    return filterType === TYPE.OTHER
                        ? event.categories?.some(
                              c =>
                                  c.name?.toLowerCase() !== TYPE.ART &&
                                  c.name?.toLowerCase() !== TYPE.MUSIC &&
                                  c.name?.toLowerCase() !== TYPE.SPORT
                          )
                        : event.categories?.some(
                              c =>
                                  c.name?.toLowerCase() ===
                                  filterType.toLowerCase()
                          ) || false;
                })
                .filter(event => {
                    // Price free filter: at least one ticket price === 0
                    if (!filterPriceFree) return true;
                    return (
                        event.ticket_types?.some(tt => tt.price === 0) || false
                    );
                })
                .filter(event => {
                    // Date range filter based on start_time
                    if (!dateRangeStart || !dateRangeEnd) return true;

                    const eventStartTime = new Date(event.start_time).getTime();
                    const filterStartTime = new Date(dateRangeStart).getTime();
                    const filterEndTime = new Date(dateRangeEnd).getTime();

                    return (
                        eventStartTime >= filterStartTime &&
                        eventStartTime <= filterEndTime
                    );
                }),
        [
            allEvents,
            dateRangeEnd,
            dateRangeStart,
            filterLocation,
            filterPriceFree,
            filterType,
            searchKeyword,
        ]
    );

    return (
        <>
            <div className="w-full min-h-screen bg-bg-black-2 py-16 px-12">
                <div className="flex items-center w-full gap-2 justify-between mb-8">
                    {/* Hiển thị search keyword nếu có */}
                    {searchKeyword ? (
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[20]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                Kết quả tìm kiếm cho: "{searchKeyword}"
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY}
                                modeSize={MODE_SIZE[14]}
                            >
                                Tìm thấy {filteredEvents.length} sự kiện
                            </Text>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="flex items-center gap-2 justify-end mb-8">
                        <div className="relative">
                            <DivClick
                                onClick={() => {
                                    setIsDatePickerOpen(!isDatePickerOpen);
                                    setIsOpenFilterPopupStore(false);
                                }}
                                className="flex items-center gap-2 py-3 px-4 bg-bg-gray rounded-full hover:bg-bg-gray-2 transition-all duration-200"
                            >
                                <CalendarIcon
                                    size={22}
                                    mode={MODE_CALENDAR.WHITE}
                                />
                                <Text
                                    modeSize={MODE_SIZE[18]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    className="hover:text-text-yellow transition-colors duration-200"
                                >
                                    {dateRangeStart && dateRangeEnd
                                        ? `${formatDateDisplay(dateRangeStart)} - ${formatDateDisplay(dateRangeEnd)}`
                                        : 'Tất cả các ngày'}
                                </Text>
                                <ChevronIcon
                                    size={22}
                                    mode={MODE_CHEVRON.WHITE}
                                />
                            </DivClick>

                            {isDatePickerOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-bg-gray p-5 rounded-lg shadow-lg z-10 min-w-[300px]">
                                    <div className="flex flex-col gap-6">
                                        <Text
                                            modeSize={MODE_SIZE[18]}
                                            modeWeight={MODE_WEIGHT.LARGE}
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                        >
                                            Chọn khoảng thời gian
                                        </Text>
                                        <div className="flex flex-col gap-2">
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                            >
                                                Từ ngày
                                            </Text>
                                            <input
                                                type="date"
                                                value={dateRangeStart || ''}
                                                onChange={e =>
                                                    handleDateRangeChange(
                                                        e.target.value,
                                                        dateRangeEnd
                                                    )
                                                }
                                                className="bg-white text-black px-3 py-2 rounded-lg border border-bg-gray focus:border-text-yellow outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                            >
                                                Đến ngày
                                            </Text>
                                            <input
                                                type="date"
                                                value={dateRangeEnd || ''}
                                                onChange={e =>
                                                    handleDateRangeChange(
                                                        dateRangeStart,
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-white text-black px-3 py-2 rounded-lg border border-bg-gray focus:border-text-yellow outline-none"
                                            />
                                        </div>
                                        {(dateRangeStart || dateRangeEnd) && (
                                            <Button
                                                mode={MODE_BUTTON.YELLOW}
                                                onClick={() => {
                                                    handleDateRangeChange(
                                                        null,
                                                        null
                                                    );
                                                    setIsDatePickerOpen(false);
                                                }}
                                            >
                                                <Text
                                                    modeWeight={
                                                        MODE_WEIGHT.LARGE
                                                    }
                                                >
                                                    Thiết lập lại
                                                </Text>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <DivClick
                            ref={filterButtonRef}
                            onClick={() => {
                                setIsOpenFilterPopupStore(!isOpenFilterPopup);
                                setIsDatePickerOpen(false);
                            }}
                            className="flex items-center gap-2 py-3 px-4 bg-bg-gray rounded-full hover:bg-bg-gray-2 transition-all duration-200"
                        >
                            <FilterIcon size={22} mode={MODE_FILTER.WHITE} />
                            <Text
                                modeSize={MODE_SIZE[18]}
                                modeWeight={MODE_WEIGHT.LARGE}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                className="hover:text-text-yellow transition-colors duration-200"
                            >
                                Bộ lọc
                            </Text>
                            <ChevronIcon size={22} mode={MODE_CHEVRON.WHITE} />
                        </DivClick>
                        {filterLocation !== LOCATION.ALL && (
                            <Button
                                mode={MODE_BUTTON.YELLOW}
                                icon={
                                    <XCircleIcon
                                        mode={MODE_X_CIRCLE_ICON.BLACK}
                                        size={18}
                                    />
                                }
                                sizeIcon={SIZE_ICON.SMALL}
                                onClick={() => {
                                    setFilterLocationStore(LOCATION.ALL);
                                }}
                            >
                                <Text modeWeight={MODE_WEIGHT.MEDIUM}>
                                    {filterLocation}
                                </Text>
                            </Button>
                        )}
                        {filterPriceFree && (
                            <Button
                                mode={MODE_BUTTON.YELLOW}
                                icon={
                                    <XCircleIcon
                                        mode={MODE_X_CIRCLE_ICON.BLACK}
                                        size={18}
                                    />
                                }
                                sizeIcon={SIZE_ICON.SMALL}
                                onClick={() => {
                                    setFilterPriceFreeStore(false);
                                }}
                            >
                                <Text modeWeight={MODE_WEIGHT.MEDIUM}>
                                    Miễn phí
                                </Text>
                            </Button>
                        )}
                        {filterType !== '' && (
                            <Button
                                mode={MODE_BUTTON.YELLOW}
                                icon={
                                    <XCircleIcon
                                        mode={MODE_X_CIRCLE_ICON.BLACK}
                                        size={18}
                                    />
                                }
                                sizeIcon={SIZE_ICON.SMALL}
                                onClick={() => {
                                    setFilterTypeStore('');
                                }}
                            >
                                <Text modeWeight={MODE_WEIGHT.MEDIUM}>
                                    {filterType}
                                </Text>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="h-full w-full">
                    <div>
                        <EventGrid
                            events={filteredEvents}
                            onViewEvent={handleViewEvent}
                        />
                    </div>
                </div>
            </div>
            <FilterPopup
                filterButtonRef={filterButtonRef as RefObject<HTMLDivElement>}
            />
        </>
    );
};

export default EventListContainer;
