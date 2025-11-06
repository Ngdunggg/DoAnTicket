import { PurchasedTicket } from '@share/types/purchasedTicket';
import { Event } from '@share/types/event';
import { BaseHttpResponse } from '../common/response';

export interface MyTicketModel {
    event_items: Event[];
    ticket_items: PurchasedTicket[];
};

export type MyTicketResponse = BaseHttpResponse<MyTicketModel>;
