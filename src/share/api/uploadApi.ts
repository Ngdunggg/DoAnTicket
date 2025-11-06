import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';

interface UploadSignatureResponse {
    data: {
        uploadUrl: string;
    };
}

/**
 * Get signed upload URL from backend
 */
export const getUploadSignature =
    async (): Promise<UploadSignatureResponse> => {
        const response = await httpClient.post<UploadSignatureResponse>(
            API_PATH.UPLOAD_SIGNATURE
        );
        return response.data;
    };
