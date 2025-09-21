import { EventDetailData, TicketType, EventStats } from '@share/types/ticket';
import { Event } from '@share/types/event';
import { useEffect, useState } from 'react';
import useEventListStoreSelector from './useEventListStoreSelector';

const useFetchEventDetail = (eventId: string) => {
    const [eventDetail, setEventDetail] = useState<EventDetailData | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    const { allEvents } = useEventListStoreSelector();

    useEffect(() => {
        // Mock data - thay thế bằng API call thực tế
        const fetchEventDetail = async () => {
            setLoading(true);

            // Mock event data
            const event = allEvents.find(
                event => event.id === eventId
            ) as Event;

            // Mock ticket types
            const ticketTypes: TicketType[] = [
                {
                    description: 'Vé ưu đãi sớm với giá tốt nhất',
                    id: '1',
                    name: 'Vé Early Bird',
                    price: 200000,
                    soldQuantity: 85,
                    totalQuantity: 100,
                },
                {
                    description: 'Vé tiêu chuẩn với đầy đủ quyền lợi',
                    id: '2',
                    name: 'Vé Standard',
                    price: 300000,
                    soldQuantity: 120,
                    totalQuantity: 200,
                },
                {
                    description: 'Vé VIP với nhiều ưu đãi đặc biệt',
                    id: '3',
                    name: 'Vé VIP',
                    price: 500000,
                    soldQuantity: 30,
                    totalQuantity: 50,
                },
            ];

            // Calculate stats
            const totalRevenue = ticketTypes.reduce(
                (sum, ticket) => sum + ticket.price * ticket.soldQuantity,
                0
            );

            const totalTicketsSold = ticketTypes.reduce(
                (sum, ticket) => sum + ticket.soldQuantity,
                0
            );

            const totalTicketsAvailable = ticketTypes.reduce(
                (sum, ticket) => sum + ticket.totalQuantity,
                0
            );

            const stats: EventStats = {
                conversionRate:
                    totalTicketsAvailable > 0
                        ? (totalTicketsSold / totalTicketsAvailable) * 100
                        : 0,
                totalRevenue,
                totalTicketsAvailable,
                totalTicketsSold,
                viewCount: event.viewCount || 0,
            };

            const eventDetailData: EventDetailData = {
                event: event,
                stats,
                ticketTypes,
            };

            // Simulate API delay
            setTimeout(() => {
                setEventDetail(eventDetailData);
                setLoading(false);
            }, 500);
        };

        if (eventId) {
            fetchEventDetail();
        }
    }, [eventId]);

    return { eventDetail, loading };
};

export default useFetchEventDetail;
