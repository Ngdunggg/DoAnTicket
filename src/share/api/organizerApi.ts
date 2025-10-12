import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { BaseHttpResponse } from '@share/models/common/response';
import { OrganizerProfile } from '@share/types/organizer';

export const organizerApi = {
    getOrganizerProfile: async (
        id: string
    ): Promise<BaseHttpResponse<OrganizerProfile>> => {
        const response = await httpClient.get<
            BaseHttpResponse<OrganizerProfile>
        >(API_PATH.ORGANIZER_PROFILE.replace(':id', id));
        return response.data;
    },
};
