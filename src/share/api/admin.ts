import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import { Event } from '@share/types/event';
import { EventStatus } from '@share/constants/commons';
import { ListData } from '@share/types/admin';

export const adminApi = {
    getEventData: async (): Promise<BaseHttpResponse<ListData>> => {
        const response = await httpClient.get<BaseHttpResponse<ListData>>(
            API_PATH.GET_EVENT_DATA
        );
        return response.data;
    },

    updateEventStatus: async (
        id: string,
        status: EventStatus
    ): Promise<BaseHttpResponse<Event>> => {
        const response = await httpClient.patch<BaseHttpResponse<Event>>(
            API_PATH.UPDATE_EVENT_STATUS.replace(':id', id),
            { status }
        );
        return response.data;
    },
};
