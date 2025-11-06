import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    Text,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import InputValidate from '@share/components/molecules/InputValidate';
import React, { useRef } from 'react';
import DivClick from '@share/components/atoms/DivClick';
import CameraIcon, {
    MODE_CAMERA,
} from '@share/components/atoms/icons/CameraIcon';
import RadioButton from '@share/components/atoms/RaddioButton';
import useProfileFormHandler from './hooks/useProfileFormHandler';
import Image from '@share/components/atoms/Image';

const GENDER_OPTIONS = [
    { label: 'Nam', value: true },
    { label: 'Nữ', value: false },
];

const ProfileForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        avatarPreview,
        handleAvatarChange,
        handleSubmit,
        isLoading,
        profileForm,
        schemaProfile,
    } = useProfileFormHandler();

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        handleAvatarChange(file);
    };

    const renderAvatarSection = () => (
        <div className="flex items-center justify-center flex-col gap-10">
            <DivClick
                className="w-fit h-fit relative cursor-pointer"
                onClick={handleAvatarClick}
            >
                <Image
                    src={avatarPreview}
                    alt="avatar"
                    className="w-40 h-40 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-bg-yellow rounded-full p-2">
                    <CameraIcon mode={MODE_CAMERA.WHITE} />
                </div>
            </DivClick>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeWeight={MODE_WEIGHT.SMALL}
                className="text-center px-10"
            >
                Cung cấp thông tin chính xác sẽ hỗ trợ bạn trong quá trình mua
                vé, hoặc khi cần xác thực vé
            </Text>
        </div>
    );

    const renderGenderSection = () => (
        <div className="flex flex-col gap-3">
            <Text modeColor={MODE_COLOR_TEXT.WHITE}>Giới tính *</Text>

            <div className="flex gap-14">
                {GENDER_OPTIONS.map(({ label, value }) => (
                    <div
                        key={String(value)}
                        className="flex items-center gap-2"
                    >
                        <RadioButton
                            inputId={`gender-${value}`}
                            name="gender"
                            value={value}
                            checked={profileForm.watch('gender') === value}
                            onChange={e =>
                                profileForm.setValue('gender', Boolean(e.value))
                            }
                        />
                        <label
                            htmlFor={`gender-${value}`}
                            className="text-white cursor-pointer"
                        >
                            {label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 py-14 px-6">
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[28]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                Thông tin tài khoản
            </Text>
            <div className="h-px w-full bg-bg-gray mt-4 mb-8" />

            <form
                onSubmit={profileForm.handleSubmit(handleSubmit)}
                className="flex flex-col items-center flex-1 gap-6"
            >
                <div className="flex flex-col max-w-lg w-full gap-6">
                    {renderAvatarSection()}

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Họ và tên *
                        </Text>
                        <InputValidate
                            control={profileForm.control}
                            inputName="fullName"
                            schema={schemaProfile}
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Email *
                        </Text>
                        <InputValidate
                            control={profileForm.control}
                            inputName="email"
                            schema={schemaProfile}
                            placeholder="Nhập email"
                            disabled={true}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Số điện thoại *
                        </Text>
                        <InputValidate
                            control={profileForm.control}
                            inputName="phone"
                            schema={schemaProfile}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Ngày sinh *
                        </Text>
                        <InputValidate
                            control={profileForm.control}
                            inputName="dateOfBirth"
                            schema={schemaProfile}
                            placeholder="Chọn ngày sinh"
                            type="date"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Địa chỉ *
                        </Text>
                        <InputValidate
                            control={profileForm.control}
                            inputName="address"
                            schema={schemaProfile}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    {renderGenderSection()}
                </div>

                <div className="flex pt-4">
                    <Button
                        type="submit"
                        mode={MODE_BUTTON.YELLOW}
                        className="!w-[240px] !h-[40px]"
                        disabled={isLoading}
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                        </Text>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
