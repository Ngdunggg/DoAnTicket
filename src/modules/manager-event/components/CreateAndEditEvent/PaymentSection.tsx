import React, { useRef } from 'react';
import Input from '@share/components/atoms/Input';
import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';

const PaymentSection = () => {
    const logoRef = useRef<HTMLInputElement>(null);
    const qrRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        console.log('Logo file:', file);
    };

    const handleQRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        console.log('QR file:', file);
    };

    return (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-10 pb-10 mt-12">
            {/* Thông tin ban tổ chức */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin ban tổ chức
                </Text>

                <div className="flex items-center gap-4">
                    <DivClick
                        onClick={() => {
                            logoRef.current?.click();
                        }}
                        className="flex flex-col flex-1 max-w-[20%] min-h-[240px] justify-center items-center gap-2 bg-bg-gray 
                            border border-white border-dashed hover:border-bg-yellow rounded-2xl"
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="text-center"
                        >
                            Thêm logo ban tổ chức <br /> (270 x 270)
                        </Text>
                        <input
                            ref={logoRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </DivClick>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                <span className="text-text-red">* </span>
                                Tên ban tổ chức
                            </Text>
                            <Input
                                name="organizationName"
                                placeholder="Nhập tên ban tổ chức"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                <span className="text-text-red">* </span>
                                Thông tin ban tổ chức
                            </Text>
                            <textarea
                                name="organizationInfo"
                                placeholder="Nhập thông tin ban tổ chức"
                                className="w-full h-[120px] px-4 py-2 bg-white border rounded-lg outline-none transition-colors border-gray-300 focus:border-bg-yellow"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông tin tài khoản nhận tiền */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin tài khoản nhận tiền
                </Text>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Số tài khoản ngân hàng
                        </Text>
                        <Input
                            name="bankAccount"
                            placeholder="Nhập số tài khoản ngân hàng"
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Tên chủ tài khoản
                        </Text>
                        <Input
                            name="accountHolder"
                            placeholder="Nhập tên chủ tài khoản"
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col flex-1 gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                <span className="text-text-red">* </span>
                                Ngân hàng
                            </Text>
                            <Input
                                name="bankName"
                                placeholder="Tên ngân hàng"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Chi nhánh
                            </Text>
                            <Input
                                name="branch"
                                placeholder="Chi nhánh (tùy chọn)"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mã QR thanh toán VNPay */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Mã QR thanh toán VNPay
                </Text>

                <div className="flex items-center gap-4">
                    <DivClick
                        onClick={() => {
                            qrRef.current?.click();
                        }}
                        className="flex flex-col flex-1 max-w-[20%] min-h-[240px] justify-center items-center gap-2 bg-bg-gray 
                            border border-white border-dashed hover:border-bg-yellow rounded-2xl"
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="text-center"
                        >
                            Đăng mã QR VNPay <br /> (270 x 270)
                        </Text>
                        <input
                            ref={qrRef}
                            type="file"
                            className="hidden"
                            onChange={handleQRChange}
                            accept="image/*"
                        />
                    </DivClick>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeSize={MODE_SIZE[16]}
                            >
                                💡 Hướng dẫn tạo mã QR VNPay:
                            </Text>
                            <div className="flex flex-col gap-1">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    1. Đăng nhập vào ứng dụng ngân hàng của bạn
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    2. Tìm chức năng "Tạo mã QR" hoặc "QR Code"
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    3. Nhập số tài khoản và tên chủ tài khoản
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    4. Tải xuống và đăng lên đây
                                </Text>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeSize={MODE_SIZE[16]}
                            >
                                🔄 Hoặc sử dụng QR tự động:
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeSize={MODE_SIZE[14]}
                            >
                                Hệ thống sẽ tự động tạo mã QR dựa trên thông tin
                                tài khoản bạn đã nhập ở trên
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phương thức thanh toán cho người mua */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Phương thức thanh toán cho người mua vé
                </Text>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-bg-gray/20 border border-bg-yellow/30">
                    <div className="flex items-center gap-3">
                        <Text modeSize={MODE_SIZE[24]}>🏦</Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            VNPAY/Ứng dụng ngân hàng
                        </Text>
                    </div>
                    <div className="ml-auto">
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[14]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            ✓ Đã chọn
                        </Text>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Người mua vé có thể thanh toán qua ứng dụng ngân hàng
                        bằng cách quét mã QR
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Hoặc chuyển khoản trực tiếp đến tài khoản của bạn
                    </Text>
                </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Thông tin liên hệ
                </Text>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Họ và tên người liên hệ
                        </Text>
                        <Input
                            name="contactName"
                            placeholder="Nhập họ và tên"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Email liên hệ
                        </Text>
                        <Input
                            name="contactEmail"
                            placeholder="Nhập email"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Số điện thoại liên hệ
                        </Text>
                        <Input
                            name="contactPhone"
                            placeholder="Nhập số điện thoại"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Website/Fanpage
                        </Text>
                        <Input
                            name="website"
                            placeholder="Nhập website hoặc fanpage (tùy chọn)"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Lưu ý và chính sách */}
            <div className="flex flex-col gap-4 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.YELLOW}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Lưu ý quan trọng
                </Text>

                <div className="flex flex-col gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Tiền từ việc bán vé sẽ được chuyển vào tài khoản ngân
                        hàng của bạn
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Thời gian chuyển tiền:{' '}
                        <span className="text-bg-yellow font-bold">
                            1-3 ngày làm việc
                        </span>{' '}
                        sau khi sự kiện kết thúc
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Phí dịch vụ platform sẽ được trừ trực tiếp từ tổng
                        tiền bán vé
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Vui lòng đảm bảo thông tin tài khoản chính xác để nhận
                        tiền
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[14]}
                    >
                        • Nếu có thắc mắc, vui lòng liên hệ hotline:{' '}
                        <span className="text-bg-yellow font-bold">
                            1900 1234
                        </span>
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
