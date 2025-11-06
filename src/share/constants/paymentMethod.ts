export const PAYMENT_METHOD = {
    MOMO: 'momo',
    VNPAY: 'vnpay',
    ZALOPAY: 'zalopay',
};

export type PaymentMethod =
    | typeof PAYMENT_METHOD.MOMO
    | typeof PAYMENT_METHOD.VNPAY
    | typeof PAYMENT_METHOD.ZALOPAY;
