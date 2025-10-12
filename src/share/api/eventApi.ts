import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import { Event } from '@share/types/event';

export const eventApi = {
    getEventDetail: async (id: string): Promise<BaseHttpResponse<Event>> => {
        const response = await httpClient.get<BaseHttpResponse<Event>>(
            API_PATH.EVENTS_DETAIL.replace(':id', id)
        );
        return response.data;
    },

    getEvents: async (): Promise<BaseHttpResponse<Event[]>> => {
        const response = await httpClient.get<BaseHttpResponse<Event[]>>(
            API_PATH.EVENTS_LIST
        );
        return response.data;
    },
};
