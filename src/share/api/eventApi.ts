import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import { Event, EventReport } from '@share/types/event';
import {
    CreateEventRequest,
    CreateEventResponse,
} from '@share/models/event/createEvent';

export const eventApi = {
    createEvent: async (
        data: CreateEventRequest
    ): Promise<BaseHttpResponse<CreateEventResponse>> => {
        const response = await httpClient.post<
            BaseHttpResponse<CreateEventResponse>
        >(API_PATH.CREATE_EVENT, data);
        return response.data;
    },

    getEventDetail: async (id: string): Promise<BaseHttpResponse<Event>> => {
        const response = await httpClient.get<BaseHttpResponse<Event>>(
            API_PATH.EVENTS_DETAIL.replace(':id', id)
        );
        return response.data;
    },

    getEventReport: async (
        id: string
    ): Promise<BaseHttpResponse<EventReport>> => {
        const response = await httpClient.get<BaseHttpResponse<EventReport>>(
            API_PATH.EVENT_REPORT.replace(':id', id)
        );
        return response.data;
    },

    getEvents: async (): Promise<BaseHttpResponse<Event[]>> => {
        const response = await httpClient.get<BaseHttpResponse<Event[]>>(
            API_PATH.EVENTS_LIST
        );
        return response.data;
    },

    updateEvent: async (
        id: string,
        data: CreateEventRequest
    ): Promise<BaseHttpResponse<CreateEventResponse>> => {
        const response = await httpClient.patch<
            BaseHttpResponse<CreateEventResponse>
        >(API_PATH.UPDATE_EVENT.replace(':id', id), data);
        return response.data;
    },
};
