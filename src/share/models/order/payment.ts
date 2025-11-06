import { PaymentMethod } from '@share/constants/paymentMethod';
import { BaseHttpResponse } from '../common/response';

export interface CreatePaymentRequest {
    order_id: string;
    payment_method: PaymentMethod;
}

export interface CreatePaymentResponseData {
    gateway: PaymentMethod;
    payment_url: string;
    transaction_id: string;
}

export type CreatePaymentResponse = BaseHttpResponse<CreatePaymentResponseData>;
