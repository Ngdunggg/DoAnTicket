import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';

export interface Category {
    id: string;
    name: string;
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    id: string;
    name: string;
}

export const categoriesApi = {
    createCategory: async (
        data: CreateCategoryRequest
    ): Promise<BaseHttpResponse<Category>> => {
        const response = await httpClient.post<BaseHttpResponse<Category>>(
            API_PATH.ALL_EVENT_TYPES,
            data
        );
        return response.data;
    },

    deleteCategory: async (id: string): Promise<BaseHttpResponse<void>> => {
        const response = await httpClient.delete<BaseHttpResponse<void>>(
            `${API_PATH.ALL_EVENT_TYPES}/${id}`
        );
        return response.data;
    },

    getAllEventTypes: async (): Promise<BaseHttpResponse<Category[]>> => {
        const response = await httpClient.get<BaseHttpResponse<Category[]>>(
            API_PATH.ALL_EVENT_TYPES
        );
        return response.data;
    },

    updateCategory: async (
        data: UpdateCategoryRequest
    ): Promise<BaseHttpResponse<Category>> => {
        const response = await httpClient.put<BaseHttpResponse<Category>>(
            `${API_PATH.ALL_EVENT_TYPES}/${data.id}`,
            { name: data.name }
        );
        return response.data;
    },
};
