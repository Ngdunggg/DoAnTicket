import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import { Event } from '@share/types/event';
import { OrganizerProfileWithPaymentMethod } from '@share/types/organizer';

export const organizerApi = {
    deleteMyEvent: async (id: string): Promise<BaseHttpResponse<void>> => {
        const response = await httpClient.delete<BaseHttpResponse<void>>(
            API_PATH.DELETE_MY_EVENT.replace(':id', id)
        );
        return response.data;
    },

    getEventByOrganizerId: async (
        organizerId: string
    ): Promise<BaseHttpResponse<Event[]>> => {
        const response = await httpClient.get<BaseHttpResponse<Event[]>>(
            API_PATH.EVENTS_BY_ORGANIZER_ID.replace(':userId', organizerId)
        );

        return response.data;
    },

    getOrganizerProfile: async (
        id: string
    ): Promise<BaseHttpResponse<OrganizerProfileWithPaymentMethod>> => {
        const response = await httpClient.get<
            BaseHttpResponse<OrganizerProfileWithPaymentMethod>
        >(API_PATH.ORGANIZER_PROFILE.replace(':id', id));
        return response.data;
    },
};
