import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import EventDetail from '../pages/EventDetail';
import TicketPurchase from '../pages/TicketPurchase';

const eventDetailRouters: RouteObject[] = [
    {
        children: [
            {
                element: <EventDetail />,
                index: true,
            },
            {
                element: <TicketPurchase />,
                path: SCREEN_PATH.EVENT_TICKET_SELECTION,
            },
        ],
        path: SCREEN_PATH.EVENT_DETAIL,
    },
];

export default eventDetailRouters;
