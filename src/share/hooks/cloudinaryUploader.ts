import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getUploadSignature } from '@share/api/uploadApi';

// Create a separate axios instance for Cloudinary uploads (without credentials)
const cloudinaryAxios = axios.create({
    timeout: 30000, // 30 seconds timeout
    withCredentials: false,
});

interface CloudinaryUploadResponse {
    format: string;
    height: number;
    public_id: string;
    resource_type: string;
    secure_url: string;
    width: number;
}

/**
 * Upload single file to Cloudinary using signed URL
 */
export const uploadFile = async (file: File): Promise<string> => {
    try {
        // Get signed upload URL from backend
        const { data } = await getUploadSignature();

        // Upload file directly to signed URL using axios
        const formData = new FormData();
        formData.append('file', file);

        const response = await cloudinaryAxios.post<CloudinaryUploadResponse>(
            data.uploadUrl,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

/**
 * Upload multiple files to Cloudinary
 */
export const uploadFiles = async (files: File[]): Promise<string[]> => {
    try {
        const uploadPromises = files.map(file => uploadFile(file));
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading multiple files to Cloudinary:', error);
        throw new Error('Failed to upload images to Cloudinary');
    }
};

/**
 * React Query hook for uploading single file
 */
export const useUploadFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file }: { file: File }) => uploadFile(file),
        onError: error => {
            console.error('Upload failed:', error);
        },
        onSuccess: () => {
            // Invalidate relevant queries if needed
            queryClient.invalidateQueries({ queryKey: ['uploads'] });
        },
    });
};

/**
 * React Query hook for uploading multiple files
 */
export const useUploadFiles = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ files }: { files: File[] }) => uploadFiles(files),
        onError: error => {
            console.error('Multiple upload failed:', error);
        },
        onSuccess: () => {
            // Invalidate relevant queries if needed
            queryClient.invalidateQueries({ queryKey: ['uploads'] });
        },
    });
};

// Default export for backward compatibility
export default {
    uploadFile,
    uploadFiles,
    useUploadFile,
    useUploadFiles,
};
