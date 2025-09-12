import { useState, useEffect } from 'react';
import useProfileForm from './useProfileForm';
import { ProfileInput } from '@share/schemas/my-ticket/profile';
import { profileSchema } from '@share/schemas/my-ticket/profile';

/**
 * Custom hook for handling profile form business logic
 */
export default function useProfileFormHandler() {
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string>(
        'https://static.ticketbox.vn/avatar.png'
    );

    const profileForm = useProfileForm();
    const schemaProfile = profileSchema();

    // Mock data - trong thực tế sẽ fetch từ API
    const mockProfileData: ProfileInput = {
        address: '123 Đường ABC, Quận 1, TP.HCM',
        avatar: 'https://static.ticketbox.vn/avatar.png',
        dateOfBirth: '1990-01-01',
        email: 'nguyenvana@example.com',
        fullName: 'Nguyễn Văn A',
        gender: 'male',
        phone: '0123456789',
    };

    // Load profile data khi component mount
    useEffect(() => {
        profileForm.reset(mockProfileData);
        setAvatarPreview(
            mockProfileData.avatar || 'https://static.ticketbox.vn/avatar.png'
        );
    }, []);

    const handleAvatarChange = (file: File) => {
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
        setAvatarPreview(imageUrl);
        profileForm.setValue('avatar', imageUrl);
    };

    const handleSubmit = async (data: ProfileInput) => {
        setIsLoading(true);

        try {
            console.log('Cập nhật thông tin profile:', data);
            // TODO: Implement API call to update profile
            // await updateProfileAPI(data);

            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        avatarPreview,
        handleAvatarChange,
        handleSubmit,
        isLoading,
        profileForm,
        schemaProfile,
    };
}
