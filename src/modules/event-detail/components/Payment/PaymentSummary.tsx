import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import useFormQuestionHandler from '@modules/event-detail/components/QuestionForm/hooks/useFormQuestionHandler';

interface SelectedTicket {
    quantity: number;
    ticketType: {
        id: string;
        name: string;
        price: number;
    };
}

interface PaymentSummaryProps {
    isLoading: boolean;
    onPayment: () => void;
    selectedTickets: SelectedTicket[];
    totalAmount: number;
}

const PaymentSummary = ({
    isLoading,
    onPayment,
    selectedTickets,
    totalAmount,
}: PaymentSummaryProps) => {
    const { handleBackToSelectTicket } = useFormQuestionHandler();
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            style: 'currency',
        }).format(price);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-bg-gray border border-bg-gray rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Thông tin đặt vé
                    </Text>
                    <DivClick onClick={handleBackToSelectTicket}>
                        <Text
                            modeColor={MODE_COLOR_TEXT.GREEN}
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Chọn lại vé
                        </Text>
                    </DivClick>
                </div>
                {/* Chi tiết vé */}
                <div className="flex-1 flex flex-col gap-5 mt-6">
                    <div className="flex justify-between items-center">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Loại vé
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Số lượng
                        </Text>
                    </div>
                    <div className="flex flex-col gap-4">
                        {selectedTickets.map(selectedTicket => (
                            <div
                                key={selectedTicket.ticketType.id}
                                className="flex flex-col gap-1"
                            >
                                <div className="flex justify-between items-start">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                        className="truncate"
                                    >
                                        {selectedTicket.ticketType.name}
                                    </Text>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {selectedTicket.quantity}
                                    </Text>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                        {formatPrice(
                                            selectedTicket.ticketType.price
                                        )}
                                    </Text>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {formatPrice(
                                            selectedTicket.ticketType.price *
                                                selectedTicket.quantity
                                        )}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Total */}
            <div className="bg-bg-gray border border-bg-gray rounded-lg flex flex-col gap-10 p-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin đơn hàng
                </Text>
                <div className="flex justify-between items-center border-b border-white border-dashed pb-4">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.SMALL}
                    >
                        Tạm tính
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.SMALL}
                    >
                        {formatPrice(totalAmount)}
                    </Text>
                </div>
                <div className="flex justify-between items-center">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Tổng cộng
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        {formatPrice(totalAmount)}
                    </Text>
                </div>

                {/* Payment Button */}
                <Button
                    onClick={onPayment}
                    disabled={isLoading}
                    mode={MODE_BUTTON.YELLOW}
                    className="w-full py-4"
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
        </div>
    );
};

export default PaymentSummary;
