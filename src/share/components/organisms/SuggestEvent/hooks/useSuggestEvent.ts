import { eventApi } from '@share/api/eventApi';
import { RESULT_CODE } from '@share/constants/commons';
import useHomeEventListStoreSelector from '@modules/home/hooks/useHomeEventListStoreSelector';
import useHomeEventListStoreAction from '@modules/home/hooks/useHomeEventListStoreAction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@share/types/event';
import { SCREEN_PATH } from '@share/constants/routers';
import useSearchStoreAction from '../../header/hooks/useSearchStoreAction';

const useSuggestEvent = (limit: number) => {
    const navigate = useNavigate();
    const { allEvents } = useHomeEventListStoreSelector();
    const { setAllEventsStore } = useHomeEventListStoreAction();
    const { setIsSearchPopupOpenStore } = useSearchStoreAction();
    const [suggestedEvents, setSuggestedEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestedEvents = async () => {
            try {
                let eventsToUse = allEvents;

                // Nếu store chưa có data thì gọi API
                if (allEvents.length === 0) {
                    const response = await eventApi.getEvents();
                    if (response.result.code === RESULT_CODE.SUCCESS) {
                        eventsToUse = response.data;
                        setAllEventsStore(response.data);
                    }
                }

                if (eventsToUse.length > 0) {
                    const shuffled = [...eventsToUse].sort(
                        () => 0.5 - Math.random()
                    );
                    setSuggestedEvents(shuffled.slice(0, limit));
                }
            } catch (error) {
                console.error('Error fetching suggested events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestedEvents();
    }, [allEvents]);

    const handleEventClick = (eventId: string) => {
        navigate(SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId));
        setIsSearchPopupOpenStore(false);
    };

    const handleMoreEvent = () => {
        navigate(SCREEN_PATH.EVENT_LIST);
        setIsSearchPopupOpenStore(false);
    };

    return {
        handleEventClick,
        handleMoreEvent,
        isLoading,
        suggestedEvents,
    };
};

export default useSuggestEvent;
