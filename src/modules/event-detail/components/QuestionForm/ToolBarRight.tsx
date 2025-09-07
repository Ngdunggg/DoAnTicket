import DoubleChevronIcon, {
    MODE_DOUBLE_CHEVRON,
} from '@share/components/atoms/icons/DoubleChevronIcon';
import { SelectedTicket } from '../../types/ticketPurchase';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import DivClick from '@share/components/atoms/DivClick';

interface ToolBarRightProps {
    isFormValid: boolean;
    isLoading?: boolean;
    onContinue: () => void;
    selectedTickets: SelectedTicket[];
    totalAmount: number;
}

const ToolBarRight = ({
    isFormValid,
    isLoading = false,
    onContinue,
    selectedTickets,
    totalAmount,
}: ToolBarRightProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            style: 'currency',
        }).format(price);
    };

    // Tính tổng số lượng vé đã chọn
    const totalTicketQuantity = selectedTickets.reduce(
        (total, selectedTicket) => {
            return total + selectedTicket.quantity;
        },
        0
    );

    return (
        <div className="bg-bg-gray px-6 py-8 h-fit flex flex-col rounded-lg">
            <div className="flex justify-between items-center">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin đặt vé
                </Text>
                <DivClick onClick={() => {}}>
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
                <div className="flex flex-col gap-4 mb-4">
                    {selectedTickets.map(selectedTicket => (
                        <div
                            key={selectedTicket.ticketType.id}
                            className="flex flex-col gap-1"
                        >
                            <div className="flex justify-between items-start">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {selectedTicket.ticketType.name}
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.YELLOW}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {totalTicketQuantity}
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

            {/* Tổng tiền và Button */}
            <div className="mt-auto">
                <div className="border-t border-white pt-4 mb-4 flex flex-col gap-3">
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
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {formatPrice(totalAmount)}
                        </Text>
                    </div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.GRAY}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="text-center"
                    >
                        Vui lòng trả lời câu hỏi để tiếp tục
                    </Text>
                </div>

                <Button
                    onClick={onContinue}
                    disabled={!isFormValid || isLoading}
                    mode={isFormValid ? MODE_BUTTON.YELLOW : MODE_BUTTON.BLACK}
                    className="w-full"
                >
                    <Text
                        modeColor={
                            isFormValid
                                ? MODE_COLOR_TEXT.BLACK
                                : MODE_COLOR_TEXT.WHITE
                        }
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Tiếp tục
                    </Text>
                    <DoubleChevronIcon
                        mode={
                            !isFormValid
                                ? MODE_DOUBLE_CHEVRON.WHITE
                                : MODE_DOUBLE_CHEVRON.BLACK
                        }
                        size={24}
                    />
                </Button>
            </div>
        </div>
    );
};

export default ToolBarRight;
