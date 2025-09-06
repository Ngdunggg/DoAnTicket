import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    Text,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import FormField from '@share/components/molecules/FormField';
import { useState, useEffect, useRef } from 'react';
import DivClick from '@share/components/atoms/DivClick';
import CameraIcon, {
    MODE_CAMERA,
} from '@share/components/atoms/icons/CameraIcon';
import RadioButton from '@share/components/atoms/RaddioButton';

interface ProfileData {
    avatar: string;
    dateOfBirth: string;
    email: string;
    fullName: string;
    gender: string;
    phone: string;
}

const GENDER_OPTIONS = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'other' },
];

const ProfileForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<ProfileData>({
        avatar: 'https://static.ticketbox.vn/avatar.png',
        dateOfBirth: '1990-01-01',
        email: 'nguyenvana@example.com',
        fullName: 'Nguyễn Văn A',
        gender: 'male',
        phone: '0123456789',
    });

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
            return;
        }

        // Create preview URL
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, avatar: imageUrl }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Cập nhật thông tin:', formData);
        // TODO: Implement update profile logic
    };

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (formData.avatar?.startsWith('blob:')) {
                URL.revokeObjectURL(formData.avatar);
            }
        };
    }, [formData.avatar]);

    const renderAvatarSection = () => (
        <div className="flex items-center justify-center flex-col gap-10">
            <DivClick
                className="w-fit h-fit relative cursor-pointer"
                onClick={handleAvatarClick}
            >
                <img
                    src={formData.avatar}
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
                onChange={handleAvatarChange}
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
            <Text modeColor={MODE_COLOR_TEXT.WHITE}>Giới tính</Text>

            <div className="flex gap-14">
                {GENDER_OPTIONS.map(({ label, value }) => (
                    <div key={value} className="flex items-center gap-2">
                        <RadioButton
                            inputId={`gender-${value}`}
                            name="gender"
                            value={value}
                            checked={formData.gender === value}
                            onChange={e => handleInputChange('gender', e.value)}
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
                onSubmit={handleSubmit}
                className="flex flex-col items-center flex-1 gap-6"
            >
                <div className="flex flex-col max-w-lg w-full gap-6">
                    {renderAvatarSection()}

                    <FormField
                        label="Họ và tên"
                        value={formData.fullName}
                        onChange={value => handleInputChange('fullName', value)}
                        placeholder="Nhập họ và tên"
                    />

                    <FormField
                        label="Email"
                        value={formData.email}
                        onChange={value => handleInputChange('email', value)}
                        placeholder="Nhập email"
                        type="email"
                    />

                    <FormField
                        label="Số điện thoại"
                        value={formData.phone}
                        onChange={value => handleInputChange('phone', value)}
                        placeholder="Nhập số điện thoại"
                        type="text"
                    />

                    <FormField
                        label="Ngày sinh"
                        value={formData.dateOfBirth}
                        onChange={value =>
                            handleInputChange('dateOfBirth', value)
                        }
                        placeholder="Chọn ngày sinh"
                        type="date"
                    />

                    {renderGenderSection()}
                </div>

                <div className="flex pt-4">
                    <Button
                        type="submit"
                        mode={MODE_BUTTON.YELLOW}
                        className="!w-[240px] !h-[40px]"
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Cập nhật
                        </Text>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
