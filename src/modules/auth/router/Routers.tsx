import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';

const authRouters: RouteObject[] = [
    {
        children: [
            {
                element: <Login />,
                index: true,
            },
        ],
        path: SCREEN_PATH.AUTH_LOGIN,
    },
];

export default authRouters;
