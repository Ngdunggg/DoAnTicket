import useFetchEventListQuery from '@modules/home/hooks/useFetchEventListQuery';
import useHomeEventListStoreAction from '@modules/home/hooks/useHomeEventListStoreAction';
import useHomeEventListStoreSelector from '@modules/home/hooks/useHomeEventListStoreSelector';
import { useEffect, useMemo } from 'react';
import { Event } from '@share/types/event';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

const useHomeHandler = () => {
    const { allEvents } = useHomeEventListStoreSelector();
    const { setAllEventsStore } = useHomeEventListStoreAction();
    const navigate = useNavigate();
    const { data } = useFetchEventListQuery();

    useEffect(() => {
        if (data) {
            setAllEventsStore(data);
        }
    }, [data]);

    const eventToTrending = (events: Event[]) => {
        return [...events]
            .sort((a, b) => b.total_views - a.total_views)
            .slice(0, 10);
    };

    const trendingEvents = useMemo(
        () => eventToTrending(allEvents),
        [allEvents]
    );

    const getEventsByCategory = (
        categoryName: string,
        limit: number = 10
    ): Event[] => {
        if (!categoryName || !allEvents.length) {
            return [];
        }

        return allEvents
            .filter(event =>
                event.categories?.some(
                    category =>
                        category.name?.toLowerCase() ===
                        categoryName.toLowerCase()
                )
            )
            .slice(0, limit);
    };

    const getEventsByMultipleCategories = (
        categoryNames: string[]
    ): Event[] => {
        if (!categoryNames.length || !allEvents.length) {
            return [];
        }

        return allEvents.filter(event =>
            event.categories?.some(category =>
                categoryNames.some(
                    name => category.name?.toLowerCase() === name.toLowerCase()
                )
            )
        );
    };

    const getFeaturedEvents = (limit: number = 10): Event[] => {
        return [...allEvents]
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            )
            .slice(0, limit);
    };

    const getUpcomingEvents = (limit: number = 10): Event[] => {
        const now = new Date();
        return [...allEvents]
            .filter(event => {
                const startTime = new Date(event.start_time);
                return startTime > now;
            })
            .sort(
                (a, b) =>
                    new Date(a.start_time).getTime() -
                    new Date(b.start_time).getTime()
            )
            .slice(0, limit);
    };

    const getEventsThisWeek = (limit: number = 10): Event[] => {
        const now = new Date();
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + 7); // 7 ngày tới

        return [...allEvents]
            .filter(event => {
                const startTime = new Date(event.start_time);
                return startTime > now && startTime <= endOfWeek;
            })
            .sort(
                (a, b) =>
                    new Date(a.start_time).getTime() -
                    new Date(b.start_time).getTime()
            )
            .slice(0, limit);
    };

    const getEventsThisMonth = (limit: number = 10): Event[] => {
        const now = new Date();
        const endOfMonth = new Date(now);
        endOfMonth.setMonth(now.getMonth() + 1); // 1 tháng tới

        return [...allEvents]
            .filter(event => {
                const startTime = new Date(event.start_time);
                return startTime > now && startTime <= endOfMonth;
            })
            .sort(
                (a, b) =>
                    new Date(a.start_time).getTime() -
                    new Date(b.start_time).getTime()
            )
            .slice(0, limit);
    };

    const handleViewEvent = (eventId: string) => {
        navigate(SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId));
    };

    return {
        allEvents,
        getEventsByCategory,
        getEventsByMultipleCategories,
        getEventsThisMonth,
        getEventsThisWeek,
        getFeaturedEvents,
        getUpcomingEvents,
        handleViewEvent,
        trendingEvents,
    };
};

export default useHomeHandler;
