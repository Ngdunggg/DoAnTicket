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
import DetailReport from '@modules/manager-event/components/ManagerReport/components/DetailEventReport/DetailReport';
import { useEffect, useMemo } from 'react';
import DropDown, { IDropDownOption } from '@share/components/atoms/DropDown';

const EventsPage = () => {
    const {
        eventList,
        filteredList,
        handleBackFromDetail,
        handleUpdateEventStatus,
        handleViewEvent,
        handleViewReport,
        hasMore,
        isLoadingMore,
        pageSize,
        searchFormSchema,
        selectedEventId,
        selectedReportEventId,
        setIsLoadingMore,
        setSearch,
        setSelectedReportEventIdStore,
        setSortField,
        setSortOrder,
        setStatusFilter,
        setVisibleRows,
        sortField,
        sortOrder,
        statusFilter,
        visibleRows,
    } = useEventHandler();

    useEffect(() => {
        return () => {
            setSelectedReportEventIdStore(null);
        };
    }, []);
    const getStatusText = (status: string) => {
        switch (status) {
            case EVENT_STATUS.PENDING:
                return 'Chờ phê duyệt';
            case EVENT_STATUS.APPROVED:
                return 'Chấp nhận';
            case EVENT_STATUS.REJECTED:
                return 'Từ chối';
        }
    };
    const statusOptions: IDropDownOption<EventStatus>[] = useMemo(
        () => [
            { label: 'Tất cả sự kiện', value: 'all' },
            { label: 'Đang chờ phê duyệt', value: EVENT_STATUS.PENDING },
            { label: 'Đã phê duyệt', value: EVENT_STATUS.APPROVED },
            { label: 'Đã từ chối', value: EVENT_STATUS.REJECTED },
        ],
        []
    );

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
        {
            header: 'Trạng thái',
            key: 'status',
            render: event => <Text>{getStatusText(event.status)}</Text>,
            sortable: true,
        },
        {
            header: 'Thao tác',
            key: 'actions',
            render: event => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleViewEvent(event.id)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                        Xem sự kiện
                    </button>
                    <button
                        onClick={() => {
                            handleViewReport(event.id);
                        }}
                        className="rounded-md border border-purple-300 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 cursor-pointer"
                    >
                        Xem doanh thu
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
                        Đồng ý
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
                        Từ chối
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    if (selectedReportEventId) {
        return (
            <div className="bg-bg-black-2 flex flex-col flex-1 max-h-screen overflow-hidden relative">
                <DetailReport
                    eventIdPorps={selectedReportEventId}
                    isAdmin={true}
                />
            </div>
        );
    }

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
                    <DropDown
                        className="!h-11.5 !w-[200px] rounded-xl"
                        mode="default"
                        onChange={value => {
                            if (value !== null && typeof value === 'string') {
                                setStatusFilter(value as EventStatus);
                            }
                        }}
                        options={statusOptions}
                        value={statusFilter}
                        panelClassName="rounded-xl"
                    />
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
