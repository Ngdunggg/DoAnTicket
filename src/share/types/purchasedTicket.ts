import { PurchasedTicketStatus } from '@share/constants/commons';

export interface PurchasedTicket {
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
