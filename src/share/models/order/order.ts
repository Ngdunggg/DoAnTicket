import { PaymentMethod } from '@share/constants/paymentMethod';
import { BaseHttpResponse } from '../common/response';

export interface OrderItem {
    quantity: number;
    ticket_type_id: string;
}

export interface CreateOrderRequest {
    buyer_email: string;
    buyer_phone: string;
    order_items: OrderItem[];
    payment_method: PaymentMethod;
}

export interface CreateOrderResponseData {
    order_id: string;
}

export type CreateOrderResponse = BaseHttpResponse<CreateOrderResponseData>;
