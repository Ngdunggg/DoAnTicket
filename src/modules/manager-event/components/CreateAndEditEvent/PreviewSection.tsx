import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import useCreateEventHandler from './hooks/useCreateEventHandler';
import { CREATE_EVENT_TAB } from '@share/constants/commons';

const PreviewSection = () => {
    const { setActiveTabStore } = useCreateEventHandler();

    const handleEditInfo = () => {
        setActiveTabStore(CREATE_EVENT_TAB.INFO);
    };

    const handleEditPayment = () => {
        setActiveTabStore(CREATE_EVENT_TAB.PAYMENT);
    };

    const handleSaveEvent = () => {
        // TODO: Implement save event logic
        console.log('Saving event...');
    };

    // Mock data - sẽ được thay thế bằng dữ liệu thực từ store
    const eventData = {
        dateEnd: '22/03/2024 18:00',
        dateStart: '20/03/2024 08:00',
        description:
            'Đây là hội nghị thường niên lớn nhất về công nghệ tại Việt Nam, quy tụ các chuyên gia hàng đầu...',
        image: null,
        location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
        title: 'Hội nghị Công nghệ Việt Nam 2024',
        type: 'Hội nghị',
    };

    const ticketTypes = [
        {
            description: 'Vé ưu đãi sớm với giá tốt nhất',
            name: 'Vé Early Bird',
            price: 500000,
        },
        {
            description: 'Vé tiêu chuẩn với đầy đủ quyền lợi',
            name: 'Vé Standard',
            price: 750000,
        },
        {
            description: 'Vé VIP với quyền lợi cao cấp',
            name: 'Vé VIP',
            price: 1200000,
        },
    ];

    const paymentData = {
        accountHolder: 'NGUYEN VAN A',
        bankAccount: '1234567890',
        bankName: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
        branch: 'Chi nhánh Hà Nội',
        contactEmail: 'contact@techvietnam.com',
        contactName: 'Nguyễn Thị B',
        contactPhone: '0987654321',
        hasQRCode: true,
        organizationInfo:
            'Công ty chuyên tổ chức các sự kiện công nghệ hàng đầu Việt Nam',
        organizationName: 'Công ty Cổ phần Công nghệ Việt Nam',
        website: 'www.techvietnam.com',
    };

    return (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-10 pb-10 mt-12">
            {/* Header */}
            <div className="flex items-center justify-center">
                <Text
                    modeColor={MODE_COLOR_TEXT.YELLOW}
                    modeSize={MODE_SIZE[28]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    XEM TRƯỚC SỰ KIỆN
                </Text>
            </div>

            {/* Event Info Preview */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <div className="flex items-center justify-between">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Thông tin sự kiện
                    </Text>
                    <Button
                        mode={MODE_BUTTON.WHITE}
                        onClick={handleEditInfo}
                        className="!h-8 !px-4 !text-sm"
                    >
                        Chỉnh sửa
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên sự kiện
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {eventData.title}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Địa điểm
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {eventData.location}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngày bắt đầu
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {eventData.dateStart}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngày kết thúc
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {eventData.dateEnd}
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Loại sự kiện
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {eventData.type}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Hình ảnh sự kiện
                            </Text>
                            <div className="w-32 h-32 bg-bg-gray rounded-lg flex items-center justify-center">
                                {eventData.image ? (
                                    <img
                                        src={eventData.image}
                                        alt="Event"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <Text
                                        modeColor={
                                            MODE_COLOR_TEXT.GRAY_SECONDARY
                                        }
                                        modeSize={MODE_SIZE[12]}
                                    >
                                        Chưa có hình ảnh
                                    </Text>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Mô tả sự kiện
                    </Text>
                    <div className="bg-bg-gray rounded-lg p-4 max-h-40 overflow-y-auto">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[14]}
                        >
                            {eventData.description}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Ticket Types Preview */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[20]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Loại vé
                </Text>

                <div className="space-y-4">
                    {ticketTypes.map((ticket, index) => (
                        <div key={index} className="bg-bg-gray rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[16]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {ticket.name}
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.YELLOW}
                                    modeSize={MODE_SIZE[16]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                >
                                    {ticket.price.toLocaleString('vi-VN')} ₫
                                </Text>
                            </div>
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                            >
                                {ticket.description}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Info Preview */}
            <div className="flex flex-col gap-6 bg-bg-black-2 rounded-2xl px-6 py-6">
                <div className="flex items-center justify-between">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Thông tin thanh toán
                    </Text>
                    <Button
                        mode={MODE_BUTTON.WHITE}
                        onClick={handleEditPayment}
                        className="!h-8 !px-4 !text-sm"
                    >
                        Chỉnh sửa
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên ban tổ chức
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {paymentData.organizationName}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Số tài khoản
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {paymentData.bankAccount}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên chủ tài khoản
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {paymentData.accountHolder}
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngân hàng
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {paymentData.bankName}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Chi nhánh
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                            >
                                {paymentData.branch}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Mã QR VNPay
                            </Text>
                            <div className="w-24 h-24 bg-bg-gray rounded-lg flex items-center justify-center">
                                {paymentData.hasQRCode ? (
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                        modeSize={MODE_SIZE[12]}
                                    >
                                        ✓ Đã đăng
                                    </Text>
                                ) : (
                                    <Text
                                        modeColor={
                                            MODE_COLOR_TEXT.GRAY_SECONDARY
                                        }
                                        modeSize={MODE_SIZE[12]}
                                    >
                                        Chưa đăng
                                    </Text>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                    <Text
                        modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Thông tin liên hệ
                    </Text>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                <span className="text-gray-400">
                                    Người liên hệ:
                                </span>{' '}
                                {paymentData.contactName}
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                <span className="text-gray-400">Email:</span>{' '}
                                {paymentData.contactEmail}
                            </Text>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                <span className="text-gray-400">SĐT:</span>{' '}
                                {paymentData.contactPhone}
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[14]}
                            >
                                <span className="text-gray-400">Website:</span>{' '}
                                {paymentData.website}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
                <Button
                    mode={MODE_BUTTON.WHITE}
                    onClick={handleEditInfo}
                    className="!h-12 !px-8"
                >
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Chỉnh sửa thông tin
                    </Text>
                </Button>

                <Button
                    mode={MODE_BUTTON.YELLOW}
                    onClick={handleSaveEvent}
                    className="!h-12 !px-8"
                >
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeSize={MODE_SIZE[16]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Lưu sự kiện
                    </Text>
                </Button>
            </div>
        </div>
    );
};

export default PreviewSection;
