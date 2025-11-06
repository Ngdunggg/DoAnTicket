import { PurchasedTicket } from './purchasedTicket';

// Interface cho dữ liệu thô từ Prisma
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
        status: string;
    }>;
    title: string;
}

// Interface cho order_items với relations
export interface OrderItemWithRelations {
    created_at: Date;
    id: string;
    order_id: string;
    orders: {
        buyer_email: string;
        buyer_phone: string;
        created_at: Date;
        id: string;
        status: string;
        total_amount: number;
    };
    price: number;
    quantity: number;
    ticket_type_id: string;
    ticket_types: {
        name: string;
        price: number;
    };
    updated_at: Date;
}

// Interface cho dữ liệu đã format - dễ sử dụng
export interface Event {
    categories: { id: string; name: string }[];
    created_at: Date;
    dates: { end_at: Date; id: string; start_at: Date }[];
    description: string;
    end_time: Date;
    event_views: {
        event_id: string;
        id: string;
        viewed_at: Date;
    }[];
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
        status: string;
    }[];
    title: string;
    total_views: number;
}

export interface EventReport {
    daily_stats: {
        revenue: {
            count: number;
            date: Date;
            orders: number;
            revenue: number;
        }[];
        views: {
            count: number;
            date: Date;
        }[];
    };
    event: Event;
    order_items: OrderItemWithRelations[];
    purchased_tickets: PurchasedTicket[];
    summary: {
        total_orders: number;
        total_revenue: number;
        total_tickets_available: number;
        total_tickets_remaining: number;
        total_views: number;
    };
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
        status: string;
    }[];
}
