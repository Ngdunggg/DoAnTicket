import { useEffect, useMemo, useState } from 'react';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import { SortOrder } from '@share/components/organisms/DataTable';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import z from 'zod';
import { adminApi } from '@share/api/admin';
import { RESULT_CODE, EventStatus } from '@share/constants/commons';
import { toast } from 'react-toastify';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';

const useEventHandler = () => {
    const { eventList, selectedReportEventId } = useAdminStoreSelector();
    const { setEventListStore, setSelectedReportEventIdStore } =
        useAdminStoreAction();
    const [visibleRows, setVisibleRows] = useState<typeof eventList>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<EventStatus>('all');
    const [search, setSearch] = useState<string>('');
    const pageSize = 10;

    const filteredList = useMemo(() => {
        let result = [...eventList];

        // Filter by status first
        if (statusFilter !== 'all') {
            result = result.filter(ev => ev.status === statusFilter);
        }

        // Filter by search
        if (search) {
            result = result.filter(
                ev =>
                    ev.title?.toLowerCase().includes(search.toLowerCase()) ||
                    ev.location?.toLowerCase().includes(search.toLowerCase()) ||
                    ev.description
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    ev.categories?.some(c =>
                        c.name?.toLowerCase().includes(search.toLowerCase())
                    )
            );
        }

        return result;
    }, [eventList, statusFilter, search]);

    useEffect(() => {
        setVisibleRows(filteredList.slice(0, pageSize));
    }, [filteredList]);

    const hasMore = useMemo(
        () => visibleRows.length < filteredList.length,
        [visibleRows.length, filteredList.length]
    );

    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const searchFormSchema = useForm<z.infer<typeof searchToolBarSchema>>({
        defaultValues: {
            search: search,
        },
        mode: 'onSubmit',
        resolver: zodResolver(searchToolBarSchema),
        reValidateMode: 'onSubmit',
    });

    const handleUpdateEventStatus = async (id: string, status: EventStatus) => {
        const response = await adminApi.updateEventStatus(id, status);
        if (response.result.code === RESULT_CODE.SUCCESS) {
            // Update global store
            const updatedList = eventList.map(ev =>
                ev.id === id ? { ...ev, status } : ev
            );
            setEventListStore(updatedList);
            // Update current visible rows
            setVisibleRows(prev =>
                prev.map(ev => (ev.id === id ? { ...ev, status } : ev))
            );
            toast.success('Cập nhật trạng thái sự kiện thành công');
        } else {
            toast.error('Cập nhật trạng thái sự kiện thất bại');
        }
    };

    const handleViewEvent = (id: string) => {
        setSelectedEventId(id);
    };

    const handleBackFromDetail = () => {
        setSelectedEventId(null);
    };

    const handleViewReport = (id: string) => {
        setSelectedReportEventIdStore(id);
    };

    return {
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
        setEventListStore,
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
    };
};

export default useEventHandler;
