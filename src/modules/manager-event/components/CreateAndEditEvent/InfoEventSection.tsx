import DivClick from '@share/components/atoms/DivClick';
import InputValidate from '@share/components/molecules/InputValidate';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useRef, useState } from 'react';
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
import { EVENT_DESCRIPTION_TEMPLATE } from '@share/constants/commons';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';

const InfoEventSection = () => {
    const { control } = useForm({
        defaultValues: {
            title: '',
        },
    });

    const editorRef = useRef(null);

    const imgRef = useRef<HTMLInputElement>(null);
    const imgRef2 = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        console.log(file);
    };

    const [ticketTypes, setTicketTypes] = useState([
        { id: Date.now(), price: '', quantity: '', type: '' },
    ]);

    const addTicketType = () => {
        setTicketTypes([
            ...ticketTypes,
            { id: Date.now(), price: '', quantity: '', type: '' },
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
                        <DivClick
                            onClick={() => {
                                imgRef.current?.click();
                            }}
                            className="flex flex-col flex-1 max-w-[25%] h-[400px] justify-center items-center gap-2 bg-bg-gray 
                                    border border-white border-dashed hover:border-bg-yellow rounded-2xl"
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Thêm ảnh sự kiện
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                (720 x 958)
                            </Text>
                            <input
                                ref={imgRef}
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </DivClick>
                        <DivClick
                            onClick={() => {
                                imgRef2.current?.click();
                            }}
                            className="flex flex-col flex-1 h-[400px] justify-center items-center gap-2 bg-bg-gray 
                                    border border-white border-dashed hover:border-bg-yellow rounded-2xl"
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Thêm ảnh sự kiện
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                (720 x 958)
                            </Text>
                            <input
                                ref={imgRef2}
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
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
                            control={control}
                            inputName="title"
                            schema={z.object({
                                title: z.string().min(1),
                            })}
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
                                name="location"
                                value="location"
                                checked={true}
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
                                name="location"
                                value="location"
                                checked={true}
                            />
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Sự kiện Online
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 py-2 h-fit">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            <span className="text-text-red">* </span>
                            Tên địa điểm
                        </Text>
                        <Input
                            name="location"
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
                                <span className="text-text-red">* </span>
                                Tỉnh/Thành
                            </Text>
                            <Input
                                name="location"
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
                            <Input
                                name="location"
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
                            <Input
                                name="location"
                                placeholder="Phường/Xã"
                                className="w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                <span className="text-text-red">* </span>
                                Số nhà, đường
                            </Text>
                            <Input
                                name="location"
                                placeholder="Số nhà, đường"
                                className="w-full"
                            />
                        </div>
                    </div>

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
                                <Input
                                    name="location"
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
                                <Input
                                    name="location"
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
                <Input
                    name="type"
                    placeholder="Nhập thể loại sự kiện"
                    className="w-full"
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
                            'removeformat | help',
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
                            className={`absolute -top-1 -right-2 ${ticket.id === ticketTypes[0].id ? 'hidden' : ''}`}
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
                                        name="location"
                                        placeholder="Giá vé"
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
                                        Số lượng vé
                                    </Text>
                                    <Input
                                        key={ticket.id}
                                        name="location"
                                        placeholder="Số lượng vé"
                                        className="w-full"
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
