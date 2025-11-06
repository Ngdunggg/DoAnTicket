import { PurchasedTicketStatus } from '@share/constants/commons';

export interface PurchasedTicket {
    buyer_id: string;
    check_in_at: Date | null;
    created_at: Date;
    event_date_id: string | null;
    event_dates?: {
        end_at: Date;
        event_id: string;
        id: string;
        start_at: Date;
    };
    event_id: string;
    id: string;
    order_id: string;
    price: number;
    serial_number: string;
    status: PurchasedTicketStatus;
    ticket_type_id: string;
    // Relations từ include
    ticket_types?: {
        description?: string | null;
        event_id: string;
        id: string;
        initial_quantity: number;
        name: string;
        price: number;
        remaining_quantity: number;
        status: string;
    };
}

export interface PurchasedTicketWithRelations {
    buyer_id: string;
    check_in_at: Date | null;
    created_at: Date;
    event_date_id: string | null;
    event_id: string;
    id: string;
    order_id: string;
    price: number;
    serial_number: string;
    status: PurchasedTicketStatus;
    ticket_type_id: string;
}