import { useState, useEffect } from 'react';
import useProfileForm from './useProfileForm';
import { ProfileInput } from '@share/schemas/my-ticket/profile';
import { profileSchema } from '@share/schemas/my-ticket/profile';
import { DEFAULT_AVATAR_IMAGE } from '@share/constants/image';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { RESULT_CODE } from '@share/constants/commons';
import { setUserInfo } from '@share/auth/stores/userSlice';
import { uploadFile } from '@share/hooks/cloudinaryUploader';
import { userApi } from '@share/api/userApi';
import { toast } from 'react-toastify';

/**
 * Custom hook for handling profile form business logic
 */
export default function useProfileFormHandler() {
    const userInfo = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] =
        useState<string>(DEFAULT_AVATAR_IMAGE);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const profileForm = useProfileForm();
    const schemaProfile = profileSchema();

    // Load profile data khi component mount
    useEffect(() => {
        const formatDateForInput = (dateString?: string) => {
            if (!dateString) return '';
            try {
                const date = new Date(dateString);
                const formatted = date.toISOString().split('T')[0];
                return formatted;
            } catch {
                return '';
            }
        };

        profileForm.reset({
            address: userInfo?.address || '',
            avatar: userInfo?.avatar_url || DEFAULT_AVATAR_IMAGE,
            dateOfBirth: formatDateForInput(userInfo?.date_of_birth),
            email: userInfo?.email || '',
            fullName: userInfo?.full_name || '',
            gender: userInfo?.gender || true,
            phone: userInfo?.phone || '',
        });
        setAvatarPreview(userInfo?.avatar_url || DEFAULT_AVATAR_IMAGE);
    }, [userInfo]);

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
        setSelectedFile(file);
        // Lưu tạm URL preview vào form; sẽ thay bằng URL Cloudinary khi submit
        profileForm.setValue('avatar', imageUrl);
    };

    const handleSubmit = async (data: ProfileInput) => {
        setIsLoading(true);

        try {
            if (!userInfo?.id) {
                throw new Error('Thiếu thông tin người dùng');
            }

            let avatarUrl = data.avatar;

            // Upload avatar to Cloudinary if new file is selected
            if (selectedFile) {
                try {
                    avatarUrl = await uploadFile(selectedFile);
                } catch (error) {
                    console.error('Error uploading avatar:', error);
                    throw new Error(
                        'Không thể upload ảnh đại diện. Vui lòng thử lại.'
                    );
                }
            }

            // Prepare data for API call
            const updateData = {
                address: data.address,
                avatar_url: avatarUrl,
                date_of_birth: new Date(data.dateOfBirth).toISOString(),
                full_name: data.fullName,
                gender: data.gender,
                id: userInfo?.id || '',
                phone: data.phone,
            };

            const response = await userApi.updateUserInfo(updateData);

            if (response.result.code !== RESULT_CODE.SUCCESS) {
                throw new Error(
                    response.result.error_msg_id || 'Cập nhật thất bại'
                );
            }

            dispatch(setUserInfo(response.data));
            toast.success('Cập nhật thông tin thành công!');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(
                'Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.'
            );
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

