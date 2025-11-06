import DivClick from '@share/components/atoms/DivClick';
import InputValidate from '@share/components/molecules/InputValidate';
import React, { useRef, useState, useEffect } from 'react';
import Input from '@share/components/atoms/Input';
import RadioButton from '@share/components/atoms/RaddioButton';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { Editor } from '@tinymce/tinymce-react';
import { envConfig } from '@configs/env';
import {
    EVENT_DESCRIPTION_TEMPLATE,
    ImageType,
    IMAGE_TYPE,
    TICKET_STATUS,
} from '@share/constants/commons';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';
import MultiSelect from '@share/components/atoms/MultiSelect';
import useCreateEventStoreSelector from './hooks/useCreateEventStoreSelector';
import {
    createEventSchema,
    CreateEventInput,
} from '@share/schemas/event/createEvent';
import { useFormContext } from 'react-hook-form';

const InfoEventSection = () => {
    const createEventForm = useFormContext<CreateEventInput>();
    const { eventTypes } = useCreateEventStoreSelector();
    const schema = createEventSchema();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Sync selectedCategories với form state khi component mount
    useEffect(() => {
        const categoryId = createEventForm.getValues('category_id');
        if (categoryId && categoryId.trim()) {
            const categories = categoryId
                .split(',')
                .map(cat => cat.trim())
                .filter(cat => cat);
            setSelectedCategories(categories);
        }
    }, [createEventForm.watch('category_id')]);

    const editorRef = useRef(null);

    const imgRef = useRef<HTMLInputElement>(null);
    const imgRef2 = useRef<HTMLInputElement>(null);

    // State để lưu trữ preview ảnh
    const [selectedImages, setSelectedImages] = useState<{
        banner: string | null;
        card: string | null;
    }>({
        banner: null,
        card: null,
    });

    // Sync selectedImages với form values khi component mount hoặc form images thay đổi
    useEffect(() => {
        const images = createEventForm.getValues('images') || [];
        const newPreview: { banner: string | null; card: string | null } = {
            banner: null,
            card: null,
        };

        images.forEach(image => {
            if (image.image_data instanceof File) {
                const imageUrl = URL.createObjectURL(image.image_data);
                if (image.image_type === IMAGE_TYPE.BANNER) {
                    newPreview.banner = imageUrl;
                } else if (image.image_type === IMAGE_TYPE.CARD) {
                    newPreview.card = imageUrl;
                }
            }
        });

        setSelectedImages(prev => {
            // Cleanup old URLs before setting new ones
            if (prev.banner && prev.banner.startsWith('blob:')) {
                URL.revokeObjectURL(prev.banner);
            }
            if (prev.card && prev.card.startsWith('blob:')) {
                URL.revokeObjectURL(prev.card);
            }
            return newPreview;
        });
    }, [createEventForm.watch('images')]);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        imageType: ImageType
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Tạo URL để preview
        const imageUrl = URL.createObjectURL(file);
        setSelectedImages(prev => {
            // Cleanup old URL if exists
            if (
                imageType === IMAGE_TYPE.BANNER &&
                prev.banner &&
                prev.banner.startsWith('blob:')
            ) {
                URL.revokeObjectURL(prev.banner);
            }
            if (
                imageType === IMAGE_TYPE.CARD &&
                prev.card &&
                prev.card.startsWith('blob:')
            ) {
                URL.revokeObjectURL(prev.card);
            }
            return {
                ...prev,
                ...(imageType === IMAGE_TYPE.BANNER
                    ? { banner: imageUrl }
                    : { card: imageUrl }),
            };
        });

        // Đồng bộ vào form images để validate
        const images = createEventForm.getValues('images') || [];
        const idx = images.findIndex(img => img.image_type === imageType);
        const next = [...images];
        if (idx >= 0) {
            next[idx] = {
                ...next[idx],
                filename: file.name,
                image_data: file, // Lưu File object để upload lên Cloudinary
                image_type: imageType,
            };
        } else {
            next.push({
                filename: file.name,
                image_data: file, // Lưu File object để upload lên Cloudinary
                image_type: imageType,
            });
        }
        createEventForm.setValue('images', next, { shouldValidate: true });
    };

    const [ticketTypes, setTicketTypes] = useState<
        Array<{
            description: string;
            id: number;
            price: number;
            quantity: number;
            type: string;
        }>
    >([{ description: '', id: Date.now(), price: 0, quantity: 0, type: '' }]);

    const isSyncingToFormRef = useRef(false);

    // Restore tickets từ form khi mount hoặc khi state rỗng
    useEffect(() => {
        const formTickets = createEventForm.getValues('tickets') || [];

        // Kiểm tra state có rỗng không (chỉ có 1 item default)
        const isEmptyState =
            ticketTypes.length === 1 &&
            !ticketTypes[0].type &&
            ticketTypes[0].price === 0 &&
            ticketTypes[0].quantity === 0 &&
            !ticketTypes[0].description;

        // Nếu form có data và state rỗng → restore
        if (
            formTickets.length > 0 &&
            isEmptyState &&
            !isSyncingToFormRef.current
        ) {
            const restoredTickets = formTickets.map((ticket, index) => ({
                description: ticket.description || '',
                id: Date.now() + index,
                price: Number(ticket.price) || 0,
                quantity: Number(ticket.initial_quantity) || 0,
                type: ticket.name || '',
            }));
            isSyncingToFormRef.current = true;
            setTicketTypes(restoredTickets);
            setTimeout(() => {
                isSyncingToFormRef.current = false;
            }, 0);
        }
    }, [ticketTypes.length]); // Chỉ watch length để detect khi state reset

    // Đồng bộ ticketTypes với form khi user thay đổi
    useEffect(() => {
        // Bỏ qua nếu đang restore
        if (isSyncingToFormRef.current) {
            return;
        }

        const formTickets = createEventForm.getValues('tickets') || [];
        const currentFormTickets = ticketTypes.map(t => ({
            description: t.description || '',
            initial_quantity: Number(t.quantity) || 0,
            name: t.type,
            price: Number(t.price) || 0,
            status: TICKET_STATUS.ACTIVE,
        }));

        // update form nếu có thay đổi
        const hasChanged =
            formTickets.length !== currentFormTickets.length ||
            formTickets.some((ft, idx) => {
                const ct = currentFormTickets[idx];
                if (!ct) return true;
                return (
                    ft.name !== ct.name ||
                    ft.price !== ct.price ||
                    ft.initial_quantity !== ct.initial_quantity ||
                    ft.description !== ct.description
                );
            });

        if (hasChanged) {
            isSyncingToFormRef.current = true;
            createEventForm.setValue('tickets', currentFormTickets, {
                shouldValidate: true,
            });
            // Reset flag sau khi sync
            setTimeout(() => {
                isSyncingToFormRef.current = false;
            }, 0);
        }
    }, [ticketTypes, createEventForm]);

    // Cleanup URLs khi component unmount
    useEffect(() => {
        return () => {
            if (selectedImages.banner) {
                URL.revokeObjectURL(selectedImages.banner);
            }
            if (selectedImages.card) {
                URL.revokeObjectURL(selectedImages.card);
            }
        };
    }, [selectedImages.banner, selectedImages.card]);

    // Trạng thái sự kiện Online/Offline
    const isOnline = createEventForm.watch('is_online');

    const addTicketType = () => {
        setTicketTypes([
            ...ticketTypes,
            {
                description: '',
                id: Date.now(),
                price: 0,
                quantity: 1,
                type: '',
            },
        ]);
    };

    const deleteTicketType = (id: number) => {
        setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto px-6 py-10 pb-10">
            {/* Upload hình ảnh */}
            <div className="flex flex-col gap-8 flex-1 h-full bg-bg-black-2 mt-16 rounded-2xl">
                <div className="flex flex-col gap-4 px-6 py-4 h-fit">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        <span className="text-text-red">* </span>
                        Upload hình ảnh
                    </Text>
                    <div className="flex h-full gap-4">
                        {/* Card Image Upload */}
                        <DivClick
                            onClick={() => {
                                imgRef.current?.click();
                            }}
                            className="flex flex-col flex-1 max-w-[25%] h-[400px] justify-center items-center gap-2 bg-bg-gray 
                                    border border-white border-dashed hover:border-bg-yellow rounded-2xl relative overflow-hidden"
                        >
                            {selectedImages.card ? (
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={selectedImages.card}
                                        alt="Banner preview"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
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
                                >
                                    Thêm ảnh card
                                </Text>
                            )}
                            <input
                                ref={imgRef}
                                type="file"
                                className="hidden"
                                onChange={e =>
                                    handleFileChange(e, IMAGE_TYPE.CARD)
                                }
                                accept="image/*"
                            />
                        </DivClick>

                        {/* Banner Image Upload */}
                        <DivClick
                            onClick={() => {
                                imgRef2.current?.click();
                            }}
                            className="flex flex-col flex-1 h-[400px] justify-center items-center gap-2 bg-bg-gray 
                                    border border-white border-dashed hover:border-bg-yellow rounded-2xl relative overflow-hidden"
                        >
                            {selectedImages.banner ? (
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={selectedImages.banner}
                                        alt="Card preview"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
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
                                >
                                    Thêm ảnh banner
                                </Text>
                            )}
                            <input
                                ref={imgRef2}
                                type="file"
                                className="hidden"
                                onChange={e =>
                                    handleFileChange(e, IMAGE_TYPE.BANNER)
                                }
                                accept="image/*"
                            />
                        </DivClick>
                    </div>

                    <div className="flex flex-col gap-4 py-2 mt-4 h-fit">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Tiêu đề sự kiện
                        </Text>
                        <InputValidate
                            control={createEventForm.control}
                            inputName="title"
                            schema={schema}
                            placeholder="Nhập tiêu đề sự kiện"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Địa chỉ sự kiện và thời gian tổ chức */}
            <div className="flex flex-col gap-8 flex-1 h-full bg-bg-black-2 rounded-2xl">
                <div className="flex flex-col gap-4 px-6 py-4 h-fit">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        <span className="text-text-red">* </span>
                        Địa chỉ sự kiện
                    </Text>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <RadioButton
                                name="event_mode"
                                value="offline"
                                checked={!isOnline}
                                onChange={() =>
                                    createEventForm.setValue(
                                        'is_online',
                                        false,
                                        { shouldValidate: true }
                                    )
                                }
                            />
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Sự kiện Offline
                            </Text>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioButton
                                name="event_mode"
                                value="online"
                                checked={isOnline}
                                onChange={() =>
                                    createEventForm.setValue(
                                        'is_online',
                                        true,
                                        { shouldValidate: true }
                                    )
                                }
                            />
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Sự kiện Online
                            </Text>
                        </div>
                    </div>

                    {!isOnline && (
                        <>
                            <div className="flex flex-col gap-4 py-2 h-fit">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    <span className="text-text-red">* </span>
                                    Tên địa điểm
                                </Text>
                                <InputValidate
                                    control={createEventForm.control}
                                    inputName="location"
                                    schema={schema}
                                    placeholder="Nhập tên địa điểm"
                                    className="w-full"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pb-2 h-fit">
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        <span className="text-text-red">
                                            *{' '}
                                        </span>
                                        Tỉnh/Thành
                                    </Text>
                                    <InputValidate
                                        control={createEventForm.control}
                                        inputName="city"
                                        schema={schema}
                                        placeholder="Tỉnh/Thành"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Quận/Huyện
                                    </Text>
                                    <InputValidate
                                        control={createEventForm.control}
                                        inputName="district"
                                        schema={schema}
                                        placeholder="Quận/Huyện"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Phường/Xã
                                    </Text>
                                    <InputValidate
                                        control={createEventForm.control}
                                        inputName="ward"
                                        schema={schema}
                                        placeholder="Phường/Xã"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        <span className="text-text-red">
                                            *{' '}
                                        </span>
                                        Số nhà, đường
                                    </Text>
                                    <InputValidate
                                        control={createEventForm.control}
                                        inputName="street_address"
                                        schema={schema}
                                        placeholder="Số nhà, đường"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Thời gian tổ chức */}
                    <div className="flex flex-col gap-4 py-2 h-fit">
                        <div className="grid grid-cols-2 gap-4 pb-2 h-fit">
                            <div className="flex flex-col gap-2">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    <span className="text-text-red">* </span>
                                    Ngày giờ tổ chức
                                </Text>
                                <InputValidate
                                    control={createEventForm.control}
                                    inputName="start_time"
                                    schema={schema}
                                    placeholder="Ngày giờ tổ chức"
                                    className="w-full"
                                    type="datetime-local"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    <span className="text-text-red">* </span>
                                    Ngày giờ kết thúc
                                </Text>
                                <InputValidate
                                    control={createEventForm.control}
                                    inputName="end_time"
                                    schema={schema}
                                    placeholder="Ngày giờ kết thúc"
                                    className="w-full"
                                    type="datetime-local"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thể loại sự kiện */}
            <div className="flex flex-col gap-4 flex-1 h-full bg-bg-black-2 pb-6 rounded-2xl px-6 py-4">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    <span className="text-text-red">* </span>
                    Thể loại sự kiện
                </Text>
                <MultiSelect
                    placeholder="Nhập thể loại sự kiện"
                    className="w-full"
                    options={
                        eventTypes?.map(type => ({
                            label: type.name,
                            value: type.id,
                        })) || []
                    }
                    value={selectedCategories}
                    onChange={(value: string[] | null) => {
                        const arrayValue = value || [];

                        setSelectedCategories(arrayValue);
                        createEventForm.setValue(
                            'category_id',
                            arrayValue.join(','),
                            {
                                shouldValidate: true,
                            }
                        );
                    }}
                    onClear={() => {
                        setSelectedCategories([]);
                        createEventForm.setValue('category_id', '', {
                            shouldValidate: true,
                        });
                    }}
                    filter
                    filterBy="label"
                    showClear
                />
            </div>

            {/* Thông tin sự kiện */}
            <div className="flex flex-col gap-6 flex-1 h-full bg-bg-black-2 pb-6 rounded-2xl px-6 py-4">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    <span className="text-text-red">* </span>
                    Thông tin sự kiện
                </Text>

                <Editor
                    apiKey={envConfig.tinyMceApiKey}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    onEditorChange={content => {
                        createEventForm.setValue('description', content, {
                            shouldValidate: true,
                        });
                    }}
                    initialValue={EVENT_DESCRIPTION_TEMPLATE}
                    init={{
                        content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'preview',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'code',
                            'help',
                            'wordcount',
                        ],
                        toolbar:
                            'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'image media | removeformat | help',
                    }}
                />
            </div>

            <div className="flex items-center justify-between flex-1 gap-4">
                <div className="w-full h-1 bg-bg-yellow" />
                <Text
                    modeColor={MODE_COLOR_TEXT.YELLOW}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeSize={MODE_SIZE[20]}
                    className="text-center min-w-[160px]"
                >
                    Các hạng vé
                </Text>
                <div className="w-full h-1 bg-bg-yellow" />
            </div>

            {/* Loại vé */}
            <div className="flex flex-col gap-6">
                {ticketTypes.map(ticket => (
                    <div
                        key={ticket.id}
                        className="relative flex flex-col gap-4 flex-1 h-full bg-bg-black-2 pb-6 rounded-2xl px-6 py-4"
                    >
                        <DivClick
                            onClick={() => {
                                deleteTicketType(ticket.id);
                            }}
                            className={`absolute top-2 right-2 ${ticket.id === ticketTypes[0].id ? 'hidden' : ''}`}
                        >
                            <XCircleIcon
                                mode={MODE_X_CIRCLE_ICON.YELLOW}
                                size={28}
                            />
                        </DivClick>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Loại vé
                        </Text>
                        <Input
                            key={ticket.id}
                            name="type"
                            placeholder="Nhập loại vé"
                            className="w-full"
                            value={ticket.type}
                            onChange={e => {
                                const newTicketTypes = ticketTypes.map(t =>
                                    t.id === ticket.id
                                        ? { ...t, type: e.target.value }
                                        : t
                                );
                                setTicketTypes(newTicketTypes);
                            }}
                        />
                        <div className="flex flex-col gap-4 py-2 h-fit">
                            <div className="grid grid-cols-2 gap-4 pb-2 h-fit">
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        <span className="text-text-red">
                                            *{' '}
                                        </span>
                                        Giá vé
                                    </Text>
                                    <Input
                                        key={ticket.id}
                                        name="price"
                                        placeholder="Giá vé"
                                        className="w-full"
                                        type="number"
                                        value={String(ticket.price)}
                                        onChange={e => {
                                            const newTicketTypes =
                                                ticketTypes.map(t =>
                                                    t.id === ticket.id
                                                        ? {
                                                              ...t,
                                                              price:
                                                                  Number(
                                                                      e.target
                                                                          .value
                                                                  ) || 0,
                                                          }
                                                        : t
                                                );
                                            setTicketTypes(newTicketTypes);
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        <span className="text-text-red">
                                            *{' '}
                                        </span>
                                        Số lượng vé
                                    </Text>
                                    <Input
                                        key={ticket.id}
                                        name="quantity"
                                        placeholder="Số lượng vé"
                                        className="w-full"
                                        type="number"
                                        value={String(ticket.quantity)}
                                        onChange={e => {
                                            const newTicketTypes =
                                                ticketTypes.map(t =>
                                                    t.id === ticket.id
                                                        ? {
                                                              ...t,
                                                              quantity:
                                                                  Number(
                                                                      e.target
                                                                          .value
                                                                  ) || 1,
                                                          }
                                                        : t
                                                );
                                            setTicketTypes(newTicketTypes);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Mô tả loại vé (Ưu đãi, đặc biệt, ...)
                        </Text>
                        <textarea
                            name="description"
                            placeholder="Mô tả loại vé"
                            className="w-full bg-white rounded-lg px-4 py-2"
                            rows={3}
                            value={ticket.description || ''}
                            onChange={e => {
                                const newTicketTypes = ticketTypes.map(t =>
                                    t.id === ticket.id
                                        ? { ...t, description: e.target.value }
                                        : t
                                );
                                setTicketTypes(newTicketTypes);
                            }}
                        />
                    </div>
                ))}

                {/* Button cộng thêm loại vé  */}
                <div className="flex items-center justify-between gap-4">
                    <div className="w-full h-1 bg-bg-yellow" />
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        modeSize={MODE_SIZE[20]}
                        onClick={addTicketType}
                        className="cursor-pointer w-fit whitespace-nowrap text-center hover:text-bg-yellow transition-all duration-200"
                    >
                        + Thêm loại vé
                    </Text>
                    <div className="w-full h-1 bg-bg-yellow" />
                </div>
            </div>
        </div>
    );
};

export default InfoEventSection;
