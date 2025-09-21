import useEventListStoreSelector from '@modules/manager-event/hooks/useEventListStoreSelector';
import { FILTER_STATUS } from '@share/constants/commons';
import { useMemo } from 'react';
import useToolBarEvent from './useToolBarEvent';
import useFetchEventList from '@modules/manager-event/hooks/useFetchEventList';

const useEventList = () => {
    const { allEvents } = useEventListStoreSelector();
    const { activeFilter } = useToolBarEvent();

    useFetchEventList();
    // Filter events based on selected status
    const filteredEvents = useMemo(() => {
        if (activeFilter === FILTER_STATUS.ALL) {
            return allEvents;
        }
        return allEvents.filter(event => event.status === activeFilter);
    }, [allEvents, activeFilter]);

    return {
        allEvents,
        filteredEvents,
    };
};

export default useEventList;
