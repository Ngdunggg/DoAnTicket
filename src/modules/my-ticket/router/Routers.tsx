import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import MyTicket from '../pages/MyTicket';

const myTicketRouters: RouteObject[] = [
    {
        children: [
            {
                element: <MyTicket />,
                index: true,
            },
            {
                element: <MyTicket />,
                path: SCREEN_PATH.MY_TICKET_PROFILE,
            },
        ],
        path: SCREEN_PATH.MY_TICKET,
    },
];

export default myTicketRouters;
