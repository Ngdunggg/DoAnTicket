import { Event } from '@share/types/event';

/**
 * Format price to Vietnamese currency
 */
export const formatPrice = (price: number): string => {
    return `${price.toLocaleString('vi-VN')} ₫`;
};

/**
 * Get minimum price from event ticket types
 */
export const getMinPrice = (event: Event): string => {
    if (!event.ticket_types || event.ticket_types.length === 0) {
        return 'Liên hệ';
    }

    const minPrice = Math.min(
        ...event.ticket_types.map(ticket => ticket.price)
    );
    return formatPrice(minPrice);
};

/**
 * Get event main image URL
 */
export const getEventImage = (event: Event): string | undefined => {
    return event.images?.[0]?.image_url;
};

/**
 * Get event location with fallback
 */
export const getEventLocation = (event: Event): string => {
    return event.location || 'Online Event';
};

/**
 * Check if event has any available tickets
 */
export const hasAvailableTickets = (event: Event): boolean => {
    return event.ticket_types.some(ticket => ticket.remaining_quantity > 0);
};

/**
 * Get total available tickets count
 */
export const getTotalAvailableTickets = (event: Event): number => {
    return event.ticket_types.reduce(
        (total, ticket) => total + ticket.remaining_quantity,
        0
    );
};

/**
 * Get event status text
 */
export const getEventStatusText = (event: Event): string => {
    const now = new Date();
    const startTime = new Date(event.start_time);
    const endTime = new Date(event.end_time);

    if (now < startTime) {
        return 'Sắp diễn ra';
    } else if (now >= startTime && now <= endTime) {
        return 'Đang diễn ra';
    } else {
        return 'Đã kết thúc';
    }
};

/**
 * Check if event is upcoming
 */
export const isEventUpcoming = (event: Event): boolean => {
    const now = new Date();
    const startTime = new Date(event.start_time);
    return startTime > now;
};

/**
 * Check if event is ongoing
 */
export const isEventOngoing = (event: Event): boolean => {
    const now = new Date();
    const startTime = new Date(event.start_time);
    const endTime = new Date(event.end_time);
    return now >= startTime && now <= endTime;
};

/**
 * Check if event is finished
 */
export const isEventFinished = (event: Event): boolean => {
    const now = new Date();
    const endTime = new Date(event.end_time);
    return now > endTime;
};

/**
 * Get event card display data
 */
export const getEventCardData = (event: Event) => {
    return {
        date: event.start_time,
        hasAvailableTickets: hasAvailableTickets(event),
        id: event.id,
        image: getEventImage(event),
        isFinished: isEventFinished(event),
        isOngoing: isEventOngoing(event),
        isUpcoming: isEventUpcoming(event),
        location: getEventLocation(event),
        price: event.ticket_types.length > 0 ? getMinPrice(event) : 'Liên hệ',
        status: getEventStatusText(event),
        title: event.title,
        totalAvailableTickets: getTotalAvailableTickets(event),
    };
};
