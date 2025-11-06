import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import useCreateEventHandler from './hooks/useToolBarHeaderHandler';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
import { useFormContext } from 'react-hook-form';
import { CreateEventInput } from '@share/schemas/event/createEvent';
import { useEffect, useRef } from 'react';
import {
    formatPrice,
    getEventTypes,
} from '@modules/event-detail/utils/eventUtils';
import useCreateEventStoreSelector from './hooks/useCreateEventStoreSelector';
import LoadingContent from '@share/components/molecules/LoadingContent';

const PreviewSection = () => {
    const createEventForm = useFormContext<CreateEventInput>();
    const { setActiveTabStore } = useCreateEventHandler();
    const { eventTypes } = useCreateEventStoreSelector();
    const objectUrlsRef = useRef<string[]>([]);

    const handleEditInfo = () => {
        setActiveTabStore(CREATE_EVENT_TAB.INFO);
    };

    const handleEditPayment = () => {
        setActiveTabStore(CREATE_EVENT_TAB.PAYMENT);
    };

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    // Lấy dữ liệu thực từ form
    const eventData = {
        dateEnd: createEventForm.watch('end_time'),
        dateStart: createEventForm.watch('start_time'),
        description: createEventForm.watch('description'),
        image: createEventForm.watch('images'),
        location: createEventForm.watch('is_online')
            ? 'Sự kiện trực tuyến'
            : `${createEventForm.watch('street_address')} ${createEventForm.watch('ward')} ${createEventForm.watch('district')} ${createEventForm.watch('city')}`,
        title: createEventForm.watch('title'),
        type: createEventForm.watch('category_id'),
    };

    const ticketTypes = createEventForm.watch('tickets') || [];

    const paymentData = {
        accountHolder: createEventForm.watch('account_holder_name'),
        bankAccount: createEventForm.watch('account_number'),
        bankName: createEventForm.watch('bank_name'),
        branch: createEventForm.watch('bank_branch'),
        contactEmail: createEventForm.watch('contact_email'),
        contactName: createEventForm.watch('full_name'),
        contactPhone: createEventForm.watch('contact_phone'),
        hasQRCode: true,
        logoUrl: (() => {
            const logoData = createEventForm.watch('logo_data');
            const logoUrl = createEventForm.watch('logo_url');
            
            // Nếu có logo_data mới (File) → dùng file đó
            if (logoData instanceof File && logoData.size > 0) {
                return URL.createObjectURL(logoData);
            }
            // Nếu không có file mới nhưng có logo_url từ API → dùng URL đó
            if (logoUrl) {
                return logoUrl;
            }
            return null;
        })(),
        organizationInfo: createEventForm.watch('description_organization'),
        organizationName: createEventForm.watch('organization_name'),
        website: createEventForm.watch('website'),
    };

    const { isLoading } = useCreateEventStoreSelector();
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-10 pb-10 mt-12">
                <LoadingContent className="bg-transparent w-full h-full" />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-10 pb-10 mt-16">
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
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên sự kiện:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {eventData.title}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Địa điểm:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {eventData.location}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngày bắt đầu:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {eventData.dateStart}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngày kết thúc:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {eventData.dateEnd}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Loại sự kiện:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {getEventTypes(
                                    eventData.type,
                                    eventTypes ?? []
                                )}
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Hình ảnh sự kiện
                            </Text>
                            <div className="flex gap-2 flex-wrap">
                                {eventData.image.map(image => {
                                    // Handle both File objects and URL strings
                                    let imageSrc: string;
                                    if (image.image_data instanceof File) {
                                        imageSrc = URL.createObjectURL(
                                            image.image_data
                                        );
                                        // Track URL for cleanup
                                        if (
                                            !objectUrlsRef.current.includes(
                                                imageSrc
                                            )
                                        ) {
                                            objectUrlsRef.current.push(
                                                imageSrc
                                            );
                                        }
                                    } else {
                                        imageSrc = image.image_data;
                                    }

                                    return (
                                        <div
                                            key={image.image_type}
                                            className="w-60 h-60 bg-bg-gray rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={`Event ${image.image_type}`}
                                                className="w-full h-full object-cover"
                                                onError={e => {
                                                    e.currentTarget.style.display =
                                                        'none';
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Text
                        modeColor={MODE_COLOR_TEXT.YELLOW}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Mô tả sự kiện:
                    </Text>
                    <div
                        className="bg-white rounded-lg p-4 min-h-40 max-h-80 overflow-y-auto html-content"
                        dangerouslySetInnerHTML={{
                            __html: eventData.description || '',
                        }}
                    />
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
                                    {formatPrice(ticket.price)}
                                </Text>
                            </div>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
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
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Logo ban tổ chức
                            </Text>
                            {paymentData.logoUrl && (
                                <div className="w-60 h-60 bg-bg-gray rounded-lg overflow-hidden">
                                    <img
                                        src={paymentData.logoUrl}
                                        alt="Logo ban tổ chức"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên ban tổ chức:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {paymentData.organizationName}
                            </Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Số tài khoản:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {paymentData.bankAccount}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Tên chủ tài khoản:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {paymentData.accountHolder}
                            </Text>
                        </div>
                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Ngân hàng:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {paymentData.bankName}
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Chi nhánh:
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {paymentData.branch}
                            </Text>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Thông tin liên hệ
                    </Text>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                Người liên hệ: {paymentData.contactName}
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                Email: {paymentData.contactEmail}
                            </Text>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                SĐT: {paymentData.contactPhone}
                            </Text>
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                Website: {paymentData.website}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewSection;
