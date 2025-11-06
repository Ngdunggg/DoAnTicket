import React, { useRef, useState, useEffect } from 'react';
import InputValidate from '@share/components/molecules/InputValidate';
import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { createEventSchema, CreateEventInput } from '@share/schemas/event/createEvent';
import { useFormContext } from 'react-hook-form';

const PaymentSection = () => {
    const createEventForm = useFormContext<CreateEventInput>();
    const schema = createEventSchema();
    
    const logoRef = useRef<HTMLInputElement>(null);
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);
    const logoUrl = createEventForm.watch('logo_url');
    const logoData = createEventForm.watch('logo_data');

    // Sync previewLogo với form values khi component mount hoặc form values thay đổi
    useEffect(() => {
        // Nếu có logo_data (File) → tạo preview từ File
        if (logoData instanceof File && logoData.size > 0) {
            const imageUrl = URL.createObjectURL(logoData);
            setPreviewLogo(prev => {
                // Cleanup old URL if exists
                if (prev && prev.startsWith('blob:')) {
                    URL.revokeObjectURL(prev);
                }
                return imageUrl;
            });
        }
        // Nếu không có file nhưng có logo_url → dùng URL
        else if (logoUrl && !logoData) {
            setPreviewLogo(prev => {
                // Cleanup old blob URL if exists
                if (prev && prev.startsWith('blob:')) {
                    URL.revokeObjectURL(prev);
                }
                return logoUrl;
            });
        }
        // Nếu không có cả hai → clear preview
        else if (!logoData && !logoUrl) {
            setPreviewLogo(prev => {
                if (prev && prev.startsWith('blob:')) {
                    URL.revokeObjectURL(prev);
                }
                return null;
            });
        }
    }, [logoData, logoUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        // Tạo URL để preview
        const imageUrl = URL.createObjectURL(file);
        setPreviewLogo(imageUrl);
        
        // Đồng bộ vào form (lưu File object)
        createEventForm.setValue('logo_data', file, { shouldValidate: true });
        // Clear logo_url khi upload file mới
        createEventForm.setValue('logo_url', '');
    };

    // Cleanup URLs khi component unmount
    useEffect(() => {
        return () => {
            if (previewLogo && previewLogo.startsWith('blob:')) {
                URL.revokeObjectURL(previewLogo);
            }
        };
    }, [previewLogo]);

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
                        className="flex relative flex-col flex-1 max-w-[20%] min-h-[240px] max-h-[300px] justify-center items-center gap-2 bg-bg-gray 
                            border border-white border-dashed hover:border-bg-yellow rounded-2xl"
                    >
                        {previewLogo ? (
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={previewLogo}
                                    alt="Logo preview"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                <div className="absolute rounded-2xl inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Thay đổi ảnh
                                    </Text>
                                </div>
                            </div>
                        ) : (
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                className="text-center"
                            >
                                Thêm logo ban tổ chức
                            </Text>
                        )}
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
                            <InputValidate
                                control={createEventForm.control}
                                inputName="organization_name"
                                schema={schema}
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
                                name="organization_info"
                                placeholder="Nhập thông tin ban tổ chức"
                                className="w-full h-[120px] px-4 py-2 bg-white border rounded-lg outline-none transition-colors border-gray-300 focus:border-bg-yellow"
                                value={createEventForm.watch('description_organization') || ''}
                                onChange={e => createEventForm.setValue('description_organization', e.target.value, { shouldValidate: true })}
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="account_number"
                            schema={schema}
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="account_holder_name"
                            schema={schema}
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
                            <InputValidate
                                control={createEventForm.control}
                                inputName="bank_name"
                                schema={schema}
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
                            <InputValidate
                                control={createEventForm.control}
                                inputName="bank_branch"
                                schema={schema}
                                placeholder="Chi nhánh (tùy chọn)"
                                className="w-full"
                            />
                        </div>
                    </div>
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="full_name"
                            schema={schema}
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="contact_email"
                            schema={schema}
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="contact_phone"
                            schema={schema}
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
                        <InputValidate
                            control={createEventForm.control}
                            inputName="website"
                            schema={schema}
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
