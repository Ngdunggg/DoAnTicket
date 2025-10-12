import { PurchasedTicket } from './purchasedTicket';
import { PurchasedTicketStatus } from '@share/constants/commons';

// Interface cho dữ liệu đã format - dễ sử dụng
export interface Event {
    categories: { id: string; name: string }[];
    created_at: Date;
    dates: { end_at: Date; id: string; start_at: Date }[];
    description: string;
    end_time: Date;
    id: string;
    images: { image_type: string; image_url: string }[];
    is_online: boolean;
    location: string | null;
    organizer_id: string;
    start_time: Date;
    status: string;
    ticket_types: {
        id: string;
        initial_quantity: number;
        name: string;
        price: number;
        remaining_quantity: number;
        status: PurchasedTicketStatus;
    }[];
    title: string;
    total_views: number;
}

// Interface cho dữ liệu thô từ Prisma (nếu cần)
export interface RawEvent {
    created_at: Date;
    description: string;
    end_time: Date;
    event_categories: Array<{
        categories: {
            id: string;
            name: string;
        };
        category_id: string;
        event_id: string;
        id: string;
    }>;
    event_dates: Array<{
        end_at: Date;
        event_id: string;
        id: string;
        start_at: Date;
    }>;
    event_images: Array<{
        event_id: string;
        id: string;
        image_type: string;
        image_url: string;
    }>;
    event_views: Array<{
        date: Date;
        event_id: string;
        id: string;
        view_count: number;
    }>;
    id: string;
    is_online: boolean;
    location: string | null;
    organizer_id: string;
    start_time: Date;
    status: string;
    ticket_types: Array<{
        event_id: string;
        id: string;
        initial_quantity: number;
        name: string;
        price: number;
        remaining_quantity: number;
        status: PurchasedTicketStatus;
    }>;
    title: string;
}

// Interface cho Event Report
export interface EventReport {
    daily_stats: {
        views: {
            count: number;
            date: Date;
        }[];
    };

    // Thông tin cơ bản
    event: Event;

    // Raw data cho frontend xử lý
    purchased_tickets: PurchasedTicket[];

    // Thống kê tổng quan
    summary: {
        total_tickets_available: number;
        total_tickets_remaining: number;
        total_views: number;
    };

    // Thống kê vé theo loại
    ticket_types: {
        id: string;
        initial_quantity: number;
        name: string;
        price: number;
        remaining_percentage: number;
        remaining_quantity: number;
        sold_count: number;
        sold_percentage: number;
        sold_quantity: number;
        status: PurchasedTicketStatus;
    }[];
}
