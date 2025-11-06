import DataTable, {
    DataTableColumn,
} from '@share/components/organisms/DataTable';
import {
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
    Text,
} from '@share/components/atoms/Text';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import InputValidate from '@share/components/molecules/InputValidate';
import { MODE_INPUT } from '@share/components/atoms/Input';
import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { EventStatus, EVENT_STATUS } from '@share/constants/commons';
import useEventHandler from './hooks/useEventHandler';
import EventDetailPreview from './EventDetailPreview';

const EventsPage = () => {
    const {
        eventList,
        filteredList,
        handleBackFromDetail,
        handleUpdateEventStatus,
        handleViewEvent,
        hasMore,
        isLoadingMore,
        pageSize,
        searchFormSchema,
        selectedEventId,
        setIsLoadingMore,
        setSearch,
        setSortField,
        setSortOrder,
        setStatusFilter,
        setVisibleRows,
        sortField,
        sortOrder,
        statusFilter,
        visibleRows,
    } = useEventHandler();

    // Nếu đang xem detail, hiển thị EventDetail
    if (selectedEventId) {
        return (
            <EventDetailPreview
                eventId={selectedEventId}
                onBack={handleBackFromDetail}
            />
        );
    }

    const columns: Array<DataTableColumn<(typeof eventList)[number]>> = [
        { header: 'Tiêu đề', key: 'title', sortable: true },
        { header: 'Địa điểm', key: 'location', sortable: true },
        {
            header: 'Ngày bắt đầu',
            key: 'start_time',
            render: event =>
                formatDateTime(event.start_time, DATE_TIME_FORMAT_ISO),
            sortable: true,
        },
        {
            header: 'Ngày kết thúc',
            key: 'end_time',
            render: event =>
                formatDateTime(event.end_time, DATE_TIME_FORMAT_ISO),
            sortable: true,
        },
        { header: 'Trạng thái', key: 'status', sortable: true },
        {
            header: 'Thao tác',
            key: 'actions',
            render: event => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleViewEvent(event.id)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                        View
                    </button>
                    <button
                        onClick={() =>
                            handleUpdateEventStatus(
                                event.id,
                                EVENT_STATUS.APPROVED
                            )
                        }
                        disabled={event.status === EVENT_STATUS.APPROVED}
                        className="rounded-md border border-emerald-300 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() =>
                            handleUpdateEventStatus(
                                event.id,
                                EVENT_STATUS.REJECTED
                            )
                        }
                        disabled={
                            event.status === EVENT_STATUS.REJECTED ||
                            event.status === EVENT_STATUS.APPROVED
                        }
                        className="rounded-md border border-blue-300 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Reject
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <div className="p-6 md:p-10 h-full overflow-y-auto">
            <div className="flex items-center justify-between">
                <Text
                    modeSize={MODE_SIZE[28]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeColor={MODE_COLOR_TEXT.BLACK}
                >
                    Sự kiện
                </Text>
                <div className="flex items-center gap-3">
                    <select
                        className="rounded-xl border border-gray-300 bg-white px-2 py-2.5"
                        value={statusFilter}
                        onChange={e => {
                            const v = e.target.value as EventStatus;
                            setStatusFilter(v);
                        }}
                    >
                        <option value="all">Tất cả sự kiện</option>
                        <option value={EVENT_STATUS.PENDING}>
                            Đang chờ phê duyệt
                        </option>
                        <option value={EVENT_STATUS.APPROVED}>
                            Đã phê duyệt
                        </option>
                        <option value={EVENT_STATUS.REJECTED}>
                            Đã từ chối
                        </option>
                    </select>
                    <InputValidate
                        control={searchFormSchema.control}
                        inputName="search"
                        schema={searchToolBarSchema}
                        placeholder="Search"
                        mode={MODE_INPUT.ROUNDED}
                        className="!h-11.5 !w-[450px] flex items-center justify-center rounded-full"
                        iconClassName="bottom-2.5"
                        icon={<SearchIcon />}
                        onBlur={() => {
                            setSearch(
                                searchFormSchema.getValues('search') || ''
                            );
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                setSearch(
                                    searchFormSchema.getValues('search') || ''
                                );
                            }
                        }}
                    />
                </div>
            </div>
            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={visibleRows}
                    maxHeight="72vh"
                    hasMore={hasMore}
                    isLoadingMore={isLoadingMore}
                    onLoadMore={() => {
                        if (isLoadingMore || !hasMore) return;
                        setIsLoadingMore(true);
                        const next = filteredList.slice(
                            visibleRows.length,
                            visibleRows.length + pageSize
                        );
                        setVisibleRows(prev => [...prev, ...next]);
                        setIsLoadingMore(false);
                    }}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSortChange={({ field, order }) => {
                        setSortField(field);
                        setSortOrder(order);
                    }}
                />
            </div>
        </div>
    );
};

export default EventsPage;
