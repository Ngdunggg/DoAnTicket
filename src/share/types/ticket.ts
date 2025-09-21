import { Event } from './event';

export interface TicketType {
    description?: string;
    id: string;
    name: string;
    price: number;
    soldQuantity: number;
    totalQuantity: number;
}

export interface EventStats {
    conversionRate: number; // Tỷ lệ chuyển đổi từ view sang mua vé
    totalRevenue: number;
    totalTicketsAvailable: number;
    totalTicketsSold: number;
    viewCount: number;
}

export interface EventDetailData {
    event: Event;
    stats: EventStats;
    ticketTypes: TicketType[];
}
