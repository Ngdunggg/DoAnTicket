import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import EventList from '../pages/EventList';

const eventDetailRouters: RouteObject[] = [
    {
        children: [
            {
                element: <EventList />,
                index: true,
            },
        ],
        path: SCREEN_PATH.EVENT_LIST,
    },
];

export default eventDetailRouters;
