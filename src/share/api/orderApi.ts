import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import {
    CreateOrderRequest,
    CreateOrderResponseData,
} from '@share/models/order/order';
import {
    CreatePaymentRequest,
    CreatePaymentResponseData,
} from '@share/models/order/payment';

export const orderApi = {
    createOrder: async (
        data: CreateOrderRequest
    ): Promise<BaseHttpResponse<CreateOrderResponseData>> => {
        const response = await httpClient.post<
            BaseHttpResponse<CreateOrderResponseData>
        >(API_PATH.CREATE_ORDER, data);
        return response.data;
    },

    createPaymentUrl: async (
        data: CreatePaymentRequest
    ): Promise<BaseHttpResponse<CreatePaymentResponseData>> => {
        const response = await httpClient.post<
            BaseHttpResponse<CreatePaymentResponseData>
        >(API_PATH.CREATE_PAYMENT_URL, data);
        return response.data;
    },
};
