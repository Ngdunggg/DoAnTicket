import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import { toast } from 'react-toastify';

interface PaymentResult {
    message: string;
    order_id: string;
    status: 'success' | 'pending' | 'failed';
}

const PaymentCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
        null
    );
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const handlePaymentCallback = async () => {
            try {
                // Backend has already processed the payment and inserted the data
                // Backend redirects to: /payment/result?status=success&orderId=xxx
                // But our route is /payment/callback
                const orderId =
                    searchParams.get('orderId') || searchParams.get('order_id');
                const status = searchParams.get('status');

                console.log('Payment callback params:', {
                    allParams: Object.fromEntries(searchParams),
                    orderId,
                    status,
                });

                // Determine payment status from backend redirect
                const paymentStatus =
                    status === 'success' ? 'success' : 'failed';

                if (orderId && paymentStatus === 'success') {
                    setPaymentResult({
                        message: 'Thanh toán thành công',
                        order_id: orderId,
                        status: 'success',
                    });
                    setIsVerified(true);
                    toast.success('Thanh toán thành công!');
                } else {
                    setPaymentResult({
                        message: 'Thanh toán thất bại',
                        order_id: orderId || '',
                        status: 'failed',
                    });
                    toast.error('Thanh toán thất bại');
                }
            } catch (error) {
                console.error('Payment callback error:', error);
                toast.error('Có lỗi xảy ra khi xử lý thanh toán');
            } finally {
                setIsProcessing(false);
            }
        };

        handlePaymentCallback();
    }, [searchParams]);

    const handleBackToHome = () => {
        navigate(SCREEN_PATH.HOME);
    };

    const handleViewTickets = () => {
        navigate(SCREEN_PATH.MY_TICKET);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-black-2 px-4">
            <div className="max-w-2xl w-full shadow-lg bg-zinc-200 px-8 py-20 rounded-2xl">
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Đang xử lý thanh toán...
                            </h2>
                            <p className="text-gray-600">
                                Vui lòng đợi trong giây lát
                            </p>
                        </>
                    ) : paymentResult &&
                      isVerified &&
                      paymentResult.status === 'success' ? (
                        <>
                            <div className="flex justify-center items-center px-1 mb-4 w-fit h-fit rounded-full border-2 border-green-500">
                                <div className="text-6xl text-green-500">✓</div>
                            </div>
                            <h2 className="text-3xl font-bold text-green-600 mb-2">
                                Thanh toán thành công!
                            </h2>
                            {paymentResult.order_id && (
                                <p className="text-sm text-gray-500 mb-6">
                                    Mã đơn hàng: {paymentResult.order_id}
                                </p>
                            )}
                            <div className="flex gap-4 justify-center">
                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={handleViewTickets}
                                >
                                    Xem vé của tôi
                                </button>
                                <button
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    onClick={handleBackToHome}
                                >
                                    Về trang chủ
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center items-center px-1 mb-4 w-fit h-fit rounded-full border-2 border-red-500">
                                <div className="text-6xl text-red-500">✗</div>
                            </div>
                            <h2 className="text-3xl font-bold text-red-600 mb-2">
                                Thanh toán thất bại
                            </h2>
                            <div className="flex gap-4 justify-center">
                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={handleBackToHome}
                                >
                                    Về trang chủ
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentCallback;

