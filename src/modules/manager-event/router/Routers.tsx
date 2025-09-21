import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import MyEvent from '../pages/MyEvent';
import DetailEvent from '../pages/DetailEvent';

const myEventRouters: RouteObject[] = [
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_EVENT,
    },
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_REPORT,
    },
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_LEGAL,
    },
    {
        children: [
            {
                element: <MyEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.CREATE_EVENT,
    },
    {
        children: [
            {
                element: <DetailEvent />,
                index: true,
            },
        ],
        path: SCREEN_PATH.MANAGER_EVENT_DETAIL,
    },
];

export default myEventRouters;
