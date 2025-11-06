import httpClient from '@share/clients/httpClient';
import { API_PATH } from '@share/constants/api';
import { MyTicketResponse } from '@share/models/event/myTicket';

export const myTicketApi = {
    getMyTickets: async (): Promise<MyTicketResponse> => {
        const response = await httpClient.get<MyTicketResponse>(
            API_PATH.MY_TICKETS
        );
        return response.data;
    },
};
