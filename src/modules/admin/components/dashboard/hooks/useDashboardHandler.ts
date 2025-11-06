import { useMemo } from 'react';
import { formatPrice } from '@modules/event-detail/utils/eventUtils';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import { ORDERS_STATUS } from '@share/constants/commons';

const useDashboardHandler = () => {
    const { eventList, orderList, userList } = useAdminStoreSelector();

    const stats = useMemo(() => {
        const events = eventList ?? [];
        const users = userList ?? [];
        const orders = orderList ?? [];

        const totalRevenue = orders
            .filter(order => order.status === ORDERS_STATUS.PAID)
            .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

        const totalVisits = events.reduce(
            (sum, event) => sum + (event.total_views || 0),
            0
        );

        return [
            { label: 'Tổng sự kiện', value: events.length },
            { label: 'Tổng người dùng', value: users.length },
            {
                label: 'Tổng doanh thu',
                value: formatPrice(totalRevenue),
            },
            { label: 'Tổng lượt truy cập', value: totalVisits },
        ];
    }, [eventList, userList, orderList]);

    const dailyVisits = useMemo(() => {
        const events = eventList ?? [];
        if (events.length === 0) {
            return Array.from({ length: 14 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (13 - i));
                return {
                    date: d.toISOString().slice(5, 10),
                    value: 0,
                };
            });
        }

        const days = 14;
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const start = new Date(end);
        start.setDate(end.getDate() - (days - 1));
        start.setHours(0, 0, 0, 0);

        const byDay: Record<string, number> = {};

        events.forEach(event => {
            const views = event.event_views;
            if (!Array.isArray(views) || views.length === 0) return;

            views.forEach(view => {
                if (!view.viewed_at) return;
                const viewDate = new Date(view.viewed_at);
                if (viewDate < start || viewDate > end) return;

                const key = viewDate.toISOString().slice(0, 10);
                byDay[key] = (byDay[key] || 0) + 1;
            });
        });

        const series = Array.from({ length: days }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const key = d.toISOString().slice(0, 10);
            return {
                date: key.slice(5, 10),
                value: byDay[key] || 0,
            };
        });

        // Fallback: if no views data, distribute total_views evenly
        const hasViews = series.some(p => p.value > 0);
        if (!hasViews) {
            const total = events.reduce(
                (sum, e) => sum + (e.total_views || 0),
                0
            );
            if (total > 0) {
                const base = Math.floor(total / days);
                const remainder = total - base * days;
                return series.map((p, idx) => ({
                    date: p.date,
                    value: base + (idx < remainder ? 1 : 0),
                }));
            }
        }

        return series;
    }, [eventList]);

    const topTen = useMemo(() => {
        const events = eventList ?? [];
        if (events.length === 0) return [];

        const sorted = [...events].sort(
            (a, b) => (b.total_views || 0) - (a.total_views || 0)
        );

        return sorted.slice(0, 10).map(event => ({
            eventId: event.id,
            title: event.title,
            views: event.total_views || 0,
        }));
    }, [eventList]);

    const topRevenueEvents = useMemo(() => {
        const events = eventList ?? [];
        if (events.length === 0) return [];

        // Tính revenue cho mỗi event từ ticket_types
        // Revenue = (initial_quantity - remaining_quantity) * price
        const eventsWithRevenue = events.map(event => {
            const revenue = (event.ticket_types || []).reduce(
                (sum, ticketType) => {
                    const soldQuantity =
                        (ticketType.initial_quantity || 0) -
                        (ticketType.remaining_quantity || 0);
                    return sum + soldQuantity * (ticketType.price || 0);
                },
                0
            );

            return {
                eventId: event.id,
                image: event.images?.[1]?.image_url || '',
                revenue,
                title: event.title,
            };
        });

        // Sắp xếp theo revenue giảm dần và lấy top 10
        const sorted = [...eventsWithRevenue].sort(
            (a, b) => b.revenue - a.revenue
        );

        return sorted.slice(0, 10).map(item => ({
            id: item.eventId,
            image: item.image,
            title: item.title,
            value: item.revenue,
        }));
    }, [eventList]);

    const revenueMonthly = useMemo(() => {
        const orders = orderList ?? [];
        const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
        const now = new Date();
        const currentYear = now.getFullYear();
        const prevYear = currentYear - 1;
        
        // Group orders by month/year (only paid orders)
        const byMonth: Record<string, number> = {};
        orders.forEach(order => {
            if (order.status !== ORDERS_STATUS.PAID) return;
            if (!order.created_at) return;
            const orderDate = new Date(order.created_at);
            if (isNaN(orderDate.getTime())) return;

            const key = `${orderDate.getFullYear()}-${orderDate.getMonth()}`;
            byMonth[key] =
                (byMonth[key] || 0) + Number(order.total_amount || 0);
        });

        // Build 24 months (prev year + current year)
        const result: Array<{ month: string; revenue: number; year: number }> =
            [];
        for (let year = prevYear; year <= currentYear; year++) {
            for (let month = 0; month < 12; month++) {
                const d = new Date(year, month, 1);
                const key = `${year}-${month}`;
                result.push({
                    month: formatter.format(d),
                    revenue: byMonth[key] || 0,
                    year,
                });
            }
        }
        return result;
    }, [orderList]);

    return {
        dailyVisits,
        eventList,
        orderList,
        revenueMonthly,
        stats,
        topRevenueEvents,
        topTen,
        userList,
    };
};

export default useDashboardHandler;
