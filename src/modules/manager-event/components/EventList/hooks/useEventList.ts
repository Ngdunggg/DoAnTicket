import useEventListStoreSelector from '@modules/manager-event/components/EventList/hooks/useEventListStoreSelector';
import { FILTER_STATUS } from '@share/constants/commons';
import { useMemo } from 'react';
import useToolBarEvent from './useToolBarEvent';
import useFetchEventList from '@modules/manager-event/hooks/useFetchEventList';

const useEventList = () => {
    const { allEventsByOrganizer } = useEventListStoreSelector();
    const { activeFilter } = useToolBarEvent();

    useFetchEventList();

    // Filter events based on selected status
    const filteredEvents = useMemo(() => {
        if (!allEventsByOrganizer.length) return [];

        // Early return for ALL filter
        if (activeFilter === FILTER_STATUS.ALL) {
            return [...allEventsByOrganizer].sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
        }

        // Cache current time for UPCOMING and PAST filters
        const now = new Date().getTime();

        let events: typeof allEventsByOrganizer;

        switch (activeFilter) {
            case FILTER_STATUS.PENDING:
            case FILTER_STATUS.REJECTED:
            case FILTER_STATUS.APPROVED:
                events = allEventsByOrganizer.filter(
                    event => event.status === activeFilter
                );
                break;

            case FILTER_STATUS.UPCOMING:
                events = allEventsByOrganizer.filter(event => {
                    return (
                        event.status === FILTER_STATUS.APPROVED &&
                        new Date(event.start_time).getTime() > now
                    );
                });
                break;

            case FILTER_STATUS.PAST:
                events = allEventsByOrganizer.filter(event => {
                    return (
                        event.status === FILTER_STATUS.APPROVED &&
                        new Date(event.start_time).getTime() <= now
                    );
                });
                break;

            default:
                events = allEventsByOrganizer;
        }

        // Sort by created_at descending (newest first)
        return [...events].sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
    }, [allEventsByOrganizer, activeFilter]);

    return {
        allEventsByOrganizer,
        filteredEvents,
    };
};

export default useEventList;
