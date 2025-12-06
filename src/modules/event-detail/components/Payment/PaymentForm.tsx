import { useState } from 'react';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';
import DivClick from '@share/components/atoms/DivClick';
import AlertCircleIcon from '@share/components/atoms/icons/AlertCircleIcon';
import RadioButton from '@share/components/atoms/RaddioButton';
import { PAYMENT_METHOD } from '@share/constants/paymentMethod';
import useUpdateInfoUser from './hooks/useUpdateInfoUser';
import { VNPAY_ICON, MOMO_ICON, ZALOPAY_ICON } from '@share/constants/image';

interface BookingFormData {
    agreeToTerms: boolean;
    email: string;
    phone: string;
}

interface PaymentFormProps {
    bookingForm: BookingFormData;
    onPaymentMethodSelect: (_method: string) => void;
    selectedPaymentMethod: string;
    totalAmount: number;
}

const PaymentForm = ({
    bookingForm,
    onPaymentMethodSelect,
    selectedPaymentMethod,
    totalAmount,
}: PaymentFormProps) => {
    const isFree = totalAmount === 0;
    const [isShowWarning, setIsShowWarning] = useState(true);
    const { handleOpenUpdateInfoUser } = useUpdateInfoUser();
    const paymentMethods = [
        {
            icon: VNPAY_ICON,
            id: PAYMENT_METHOD.VNPAY,
            label: 'VNPAY/Ứng dụng ngân hàng',
        },
        {
            icon: MOMO_ICON,
            id: PAYMENT_METHOD.MOMO,
            label: 'Momo',
        },
        {
            icon: ZALOPAY_ICON,
            id: PAYMENT_METHOD.ZALOPAY,
            label: 'Zalopay',
        },
    ];

    return (
        <div className="flex flex-col gap-8 px-6">
            <Text
                modeColor={MODE_COLOR_TEXT.YELLOW}
                modeSize={MODE_SIZE[24]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                THÔNG TIN THANH TOÁN
            </Text>
            {isShowWarning && (
                <div className="flex flex-1 justify-between items-center gap-5 bg-white rounded-lg px-5 py-6">
                    <div className="flex items-center gap-2">
                        <AlertCircleIcon size={24} />
                        <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                            Lưu ý kiểm tra thông tin nhận vé. Nếu có thay đổi,
                            vui lòng{' '}
                            <span
                                className="cursor-pointer text-blue-500"
                                onClick={handleOpenUpdateInfoUser}
                            >
                                cập nhật tại đây
                            </span>
                        </Text>
                    </div>
                    <DivClick
                        onClick={() => {
                            setIsShowWarning(false);
                        }}
                    >
                        <XCircleIcon
                            size={24}
                            mode={MODE_X_CIRCLE_ICON.BLACK}
                        />
                    </DivClick>
                </div>
            )}
            <div className="flex flex-col gap-5 px-4 py-6 bg-bg-gray border border-bg-gray rounded-lg">
                <Text
                    modeColor={MODE_COLOR_TEXT.YELLOW}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin nhận vé
                </Text>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Email
                        </Text>
                        <div className="px-4 py-3 bg-bg-black border border-bg-gray rounded-lg">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                {bookingForm.email}
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Số điện thoại
                        </Text>
                        <div className="px-4 py-3 bg-bg-black border border-bg-gray rounded-lg">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                {bookingForm.phone}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
            {!isFree && (
                <div className="flex flex-col gap-4 bg-bg-gray border border-bg-gray rounded-lg px-4 py-6">
                    <Text
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Phương thức thanh toán
                    </Text>

                    <div className="flex flex-col gap-3">
                        {paymentMethods.map(method => (
                            <DivClick
                                key={method.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-black/30 cursor-pointer"
                                onClick={() => onPaymentMethodSelect(method.id)}
                            >
                                <RadioButton
                                    inputId={method.id}
                                    name="payment-method"
                                    value={method.id}
                                    checked={
                                        selectedPaymentMethod === method.id
                                    }
                                    onChange={() => {}}
                                />
                                <div className="flex items-center gap-3">
                                    {method.id !== PAYMENT_METHOD.MOMO ? (
                                        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl p-1">
                                            <img
                                                src={method.icon}
                                                alt={method.label}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={method.icon}
                                            alt={method.label}
                                            className="w-14 h-14 object-contain"
                                        />
                                    )}

                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeSize={MODE_SIZE[14]}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        {method.label}
                                    </Text>
                                </div>
                            </DivClick>
                        ))}
                    </div>
                </div>
            )}
            {isFree && (
                <div className="flex flex-col gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-6">
                    <Text
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Vé miễn phí
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                    >
                        Bạn sẽ nhận vé ngay sau khi xác nhận đặt vé. Vé sẽ được
                        gửi đến email của bạn.
                    </Text>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
