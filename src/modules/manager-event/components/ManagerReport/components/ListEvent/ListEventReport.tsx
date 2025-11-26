import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { MODE_INPUT } from '@share/components/atoms/Input';
import useEventList from '../../../EventList/hooks/useEventList';
import EventListCard from '@share/components/organisms/EventListCard';
import useToolBarEvent from '@modules/manager-event/components/EventList/hooks/useToolBarEvent';
import InputValidate from '@share/components/molecules/InputValidate';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';

const ListEventReport = () => {
    const navigate = useNavigate();
    const { schemaSearch, searchForm, searchText, setSearchTextStore } =
        useToolBarEvent();
    const { allEventsByOrganizer } = useEventList();
    const handleViewEventClick = (eventId: string) => {
        navigate(
            SCREEN_PATH.MANAGER_REPORT_DETAIL.replace(':event_id', eventId)
        );
    };
    return (
        <div className="flex flex-col gap-6 max-h-screen overflow-y-auto py-4 px-10">
            <div className="flex w-full items-center justify-end">
                <InputValidate
                    control={searchForm.control}
                    inputName="search"
                    schema={schemaSearch}
                    placeholder="Tìm kiếm sự kiện"
                    className="!h-10.5 !w-full md:!w-[450px] flex items-center justify-center"
                    iconClassName="bottom-2.5"
                    mode={MODE_INPUT.ROUNDED}
                    icon={<SearchIcon />}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            const searchValue = searchForm.getValues('search');
                            setSearchTextStore?.(searchValue || '');
                        }
                    }}
                    onBlurIgnoreClearIcon={() => {
                        const searchValue = searchForm.getValues('search');
                        setSearchTextStore?.(searchValue || '');
                    }}
                    onFocus={() => {
                        // When focusing on search input, ensure we're in SEARCH view if there's search text
                        const currentSearchText =
                            searchForm.getValues('search');
                        if (currentSearchText?.trim()) {
                            // Set search text to store to trigger search
                            setSearchTextStore?.(currentSearchText);
                        }
                    }}
                    isShowClear={isNotNullOrUndefinedOrBlank(
                        searchForm.watch('search')
                    )}
                    onClearInput={() => {
                        searchForm.setValue('search', '');
                        setSearchTextStore?.('');
                    }}
                    // TODO
                />
            </div>
            <div className="py-2 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-4">
                    {allEventsByOrganizer.length > 0 ? (
                        [...allEventsByOrganizer]
                            .sort(
                                (a, b) =>
                                    new Date(b.start_time).getTime() -
                                    new Date(a.start_time).getTime()
                            )
                            .filter(event =>
                                event.title
                                    .trim()
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase().trim())
                            )
                            .map(event => (
                                <EventListCard
                                    key={event.id}
                                    event={event}
                                    onViewEvent={() =>
                                        handleViewEventClick(event.id)
                                    }
                                    showMenu={false}
                                />
                            ))
                    ) : (
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[20]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            className="text-center"
                        >
                            không có sự kiện nào
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListEventReport;
