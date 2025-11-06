import { User } from '@share/models/auth/user';
import { Event } from './event';
import { PaymentMethod } from '@share/constants/paymentMethod';
import { OrdersStatus } from '@share/constants/commons';

export interface Order {
    buyer_email: string;
    buyer_phone: string;
    created_at: Date;
    id: string;
    payment_method: PaymentMethod;
    status: OrdersStatus;
    total_amount: number;
    user_id: string;
}

export interface ListData {
    events: Event[];
    orders: Order[];
    users: User[];
}
