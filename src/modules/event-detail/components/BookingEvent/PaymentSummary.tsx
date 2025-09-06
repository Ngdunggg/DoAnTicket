import { SelectedTicket, PaymentInfo } from '../../types/ticketPurchase';
import Button from '@share/components/atoms/Button';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';

interface PaymentSummaryProps {
    selectedTickets: SelectedTicket[];
    totalAmount: number;
    paymentInfo: PaymentInfo;
    onPaymentInfoChange: (info: PaymentInfo) => void;
    onPayment: () => void;
    isLoading?: boolean;
}

const PaymentSummary = ({
    selectedTickets,
    totalAmount,
    paymentInfo,
    onPaymentInfoChange,
    onPayment,
    isLoading = false,
}: PaymentSummaryProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const handleInputChange = (field: keyof PaymentInfo, value: string) => {
        onPaymentInfoChange({
            ...paymentInfo,
            [field]: value,
        });
    };

    const isFormValid = () => {
        return (
            paymentInfo.fullName.trim() !== '' &&
            paymentInfo.email.trim() !== '' &&
            paymentInfo.phone.trim() !== '' &&
            selectedTickets.length > 0
        );
    };

    return (
        <div className="bg-bg-gray border border-bg-gray px-6 py-12 h-full ">
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[20]}
                modeWeight={MODE_WEIGHT.LARGE}
                className="mb-6"
            >
                Thông tin thanh toán
            </Text>

            {/* Thông tin cá nhân */}
            <div className="space-y-4 mb-6">
                <div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="mb-2"
                    >
                        Họ và tên *
                    </Text>
                    <input
                        type="text"
                        value={paymentInfo.fullName}
                        onChange={e =>
                            handleInputChange('fullName', e.target.value)
                        }
                        className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-text-yellow"
                        placeholder="Nhập họ và tên"
                    />
                </div>

                <div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="mb-2"
                    >
                        Email *
                    </Text>
                    <input
                        type="email"
                        value={paymentInfo.email}
                        onChange={e =>
                            handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-text-yellow"
                        placeholder="Nhập email"
                    />
                </div>

                <div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="mb-2"
                    >
                        Số điện thoại *
                    </Text>
                    <input
                        type="tel"
                        value={paymentInfo.phone}
                        onChange={e =>
                            handleInputChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-text-yellow"
                        placeholder="Nhập số điện thoại"
                    />
                </div>

                <div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="mb-2"
                    >
                        Phương thức thanh toán
                    </Text>
                    <select
                        value={paymentInfo.paymentMethod}
                        onChange={e =>
                            handleInputChange(
                                'paymentMethod',
                                e.target.value as PaymentInfo['paymentMethod']
                            )
                        }
                        className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg text-white focus:outline-none focus:border-text-yellow"
                    >
                        <option value="card">Thẻ tín dụng/ghi nợ</option>
                        <option value="bank_transfer">
                            Chuyển khoản ngân hàng
                        </option>
                        <option value="momo">Ví MoMo</option>
                    </select>
                </div>
            </div>

            {/* Chi tiết vé đã chọn */}
            <div className="border-t border-bg-gray pt-4 mb-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[16]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                    className="mb-3"
                >
                    Chi tiết vé
                </Text>

                {selectedTickets.map(selectedTicket => (
                    <div
                        key={selectedTicket.ticketType.id}
                        className="flex justify-between items-center mb-2"
                    >
                        <div>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                {selectedTicket.ticketType.name}
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY}
                                modeSize={MODE_SIZE[12]}
                            >
                                {selectedTicket.quantity} vé ×{' '}
                                {formatPrice(selectedTicket.ticketType.price)}
                            </Text>
                        </div>
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[14]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            {formatPrice(
                                selectedTicket.ticketType.price *
                                    selectedTicket.quantity
                            )}
                        </Text>
                    </div>
                ))}
            </div>

            {/* Tổng tiền */}
            <div className="border-t border-bg-gray pt-4 mb-6">
                <div className="flex justify-between items-center">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Tổng cộng:
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        {formatPrice(totalAmount)}
                    </Text>
                </div>
            </div>

            {/* Button thanh toán */}
            <Button
                onClick={onPayment}
                disabled={!isFormValid() || isLoading}
                className="w-full py-4 bg-text-yellow hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeSize={MODE_SIZE[16]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
                </Text>
            </Button>
        </div>
    );
};

export default PaymentSummary;
